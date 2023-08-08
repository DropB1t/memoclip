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
			scroller: list?.capture()
		}),
		restore: (values) => {
			if (!can_restore) return

			data.memos = values.data.memos
			data.next = values.data.next

			if (values.scroller) {
				list.restore(values.scroller)
			}
		}
	}
</script>

<div class="fixed w-screen h-full left-0 top-0 pb-12 md:pb-0 pt-[72px] md:pt-24">
	<MemoList
		bind:this={list}
		endpoint="/api/feed"
		memos={data.memos}
		next={data.next}
		on:loaded={(e) => {
			data.memos = [...data.memos, ...e.detail.memos]
			data.next = e.detail.next
			/* console.log(data.memos) */
		}}
	>
		<h1 slot="header" class="text-2xl my-5 text-center">Explore</h1>
		<p slot="empty" class="text-center">No memos yet :c</p>
	</MemoList>
</div>
