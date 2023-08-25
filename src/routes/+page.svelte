<script lang="ts">
	import { navigating } from '$app/stores'
	import MemoList from '$lib/components/MemoList.svelte'

	export let data
	$: ({ memos, next } = data)

	let list: MemoList
	let can_restore = false

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
			if (values.scroll_pos) {
				list.restore(values.scroll_pos)
			}
		}
	}
</script>

<svelte:head>
	<title>Explore</title>
	<meta name="description" content="Explore Memos" />
</svelte:head>

<MemoList
	bind:this={list}
	endpoint="/api/memos/feed"
	{memos}
	{next}
	on:loaded={(e) => {
		memos = [...memos, ...e.detail.fetched_memo]
		next = e.detail.new_next
	}}
>
	<h1 slot="header" class="text-2xl my-5 px-2 text-start md:text-center">Explore</h1>
</MemoList>
