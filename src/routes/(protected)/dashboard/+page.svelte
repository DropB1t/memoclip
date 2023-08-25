<script lang="ts">
	import { navigating, page } from '$app/stores'
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
	<title>Dashboard</title>
	<meta name="description" content="Explore all new memos of your followed tags" />
</svelte:head>

<MemoList
	bind:this={list}
	endpoint="/api/memos/{$page.data.user.username}/dashboard_feed"
	{memos}
	{next}
	on:loaded={(e) => {
		memos = [...memos, ...e.detail.fetched_memo]
		next = e.detail.new_next
	}}
>
	<div slot="header" class="my-5 mt-12 px-2 text-start md:text-center">
		<h1 class="text-2xl">Dashboard</h1>
		<h3 class="text-md">All memos from your followed topics are here</h3>
	</div>
</MemoList>
