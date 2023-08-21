<script lang="ts">
	import { navigating, page } from '$app/stores'
	import MemoList from '$lib/components/MemoList.svelte'
	import Search from '$lib/components/Search.svelte'
	import { tick } from 'svelte'
	import type { PageData } from './$types.js'

	export let data: PageData

	$: ({ query, memos, next } = data)

	let list: MemoList
	let can_restore = false

	$: if ($navigating) {
		can_restore = $navigating.type === 'popstate'
	}

	export const snapshot = {
		capture: () => ({
			memos,
			next,
			query,
			scroll_pos: list?.capture()
		}),
		restore: async (values) => {
			if (!can_restore) return

			memos = values.memos
			next = values.next
			query = values.query
			if (values.scroll_pos) {
				await tick()
				list.restore(values.scroll_pos)
			}
		}
	}
</script>

<Search
	value={query}
	on:searchPerformed={(e) => {
		memos = e.detail.fetched_memo
		next = e.detail.new_next
		query = e.detail.query
	}}
/>

{#if query}
	<MemoList
		bind:this={list}
		endpoint="/api/memos/search"
		{memos}
		{next}
		{query}
		hasMore={false}
		on:loaded={(e) => {
			memos = [...memos, ...e.detail.fetched_memo]
			next = e.detail.new_next
		}}
	>
		<h1 slot="header" class="text-2xl my-5 mt-12 px-2 text-start md:text-center">Results</h1>
	</MemoList>
{/if}
