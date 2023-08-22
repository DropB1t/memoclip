<script lang="ts">
	import { navigating } from '$app/stores'
	import MemoList from '$lib/components/MemoList.svelte'

	export let data

	let list: MemoList
	let can_restore = false

	$: if ($navigating) {
		can_restore = $navigating.type === 'popstate'
	}

	export const snapshot = {
		capture: () => ({
			data,
			scroll_pos: list.capture()
		}),
		restore: async (values) => {
			if (!can_restore) return

			data.memos = values.data.memos
			data.next = values.data.next
			if (values.scroll_pos) {
				list.restore(values.scroll_pos)
			}
		}
	}
</script>

<MemoList
	bind:this={list}
	endpoint="/api/memos/feed"
	memos={data.memos}
	next={data.next}
	{can_restore}
	on:loaded={(e) => {
		data.memos = [...data.memos, ...e.detail.fetched_memo]
		data.next = e.detail.new_next
	}}
>
	<h1 slot="header" class="text-2xl my-5 px-2 text-start md:text-center">Explore</h1>
</MemoList>
