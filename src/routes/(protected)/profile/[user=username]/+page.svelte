<script lang="ts">
	import { navigating, page } from '$app/stores'
	import MemoList from '$lib/components/MemoList.svelte'
	import type { Memo } from '$lib/db_types.js'
	import { tick } from 'svelte'

	export let data

	let memos: Memo[] = []
	let next: string | null = null

	data.streamed.data
		.then(({ memos: s_memos, next: s_next }) => {
			if (can_restore) return
			memos = s_memos
			next = s_next
		})
		.finally(() => {
			loading = false
		})

	let loading = true
	let list: MemoList
	let can_restore = false
	let endpoint = `/api/memos/${$page.params.user}/feed`

	$: if ($navigating) {
		can_restore = $navigating.type === 'popstate'
	}

	export const snapshot = {
		capture: () => ({
			memos,
			next,
			scroll_pos: list.capture()
		}),
		restore: async (values) => {
			if (!can_restore) return

			memos = values.memos
			next = values.next
			loading = false
			await tick()
			if (values.scroll_pos) {
				list.restore(values.scroll_pos)
			}
		}
	}
</script>

{#if loading}
	<div class="w-fit mx-auto my-40">
		<span class="loading loading-spinner w-[24px]" />
	</div>
{:else}
	<MemoList
		bind:this={list}
		{endpoint}
		{memos}
		{next}
		on:loaded={(e) => {
			memos = [...memos, ...e.detail.fetched_memo]
			next = e.detail.new_next
		}}
	>
		<h1 slot="header" class="text-2xl my-5 mt-12 px-2 text-start md:text-center">
			{$page.data.profile.username}'s Memos
		</h1>
	</MemoList>
{/if}
