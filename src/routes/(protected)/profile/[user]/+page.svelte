<script lang="ts">
	import { navigating } from '$app/stores'
	import MemoCard from '$lib/components/MemoCard.svelte'
	import type { Memo } from '$lib/db_types.js'
	import { tick } from 'svelte'
	import InfiniteScroll from 'svelte-infinite-scroll'

	export let data

	let scroller: HTMLDivElement

	let next = data.next
	let memos = data.memos
	let newBatch: Memo[] = []

	$: memos = [...memos, ...newBatch]

	const fetchMemos = async () => {
		if (!next) return

		const response = await fetch(`/api/feed?start=${next}`)
		const result = await response.json()

		if (response.ok) {
			newBatch = result.memos
			next = result.next
		} else {
			// TODO Handle error better
			/* throw new Error('Impossibile to retrieve information form the link') */
		}
	}

	let can_restore = false

	$: if ($navigating) {
		can_restore = $navigating.type === 'popstate'
	}

	export const snapshot = {
		capture: () => ({
			memos,
			next,
			scrollPos: scroller.scrollTop
		}),
		restore: async (values) => {
			if (!can_restore) return

			memos = values.memos
			next = values.next

			if (values.scrollPos) {
				restorePos(values.scrollPos)
			}
		}
	}

	async function restorePos(scrollRestored: number) {
		await tick()
		console.log('[restored] ' + scrollRestored)
		scroller.scrollTo(0, scrollRestored)
	}
</script>

<h1 class="text-2xl my-5 mt-12 text-center font-semibold">Your Memos</h1>

<div
	bind:this={scroller}
	class="flex flex-col md:flex-row md:flex-wrap gap-5 justify-center items-center px-2"
>
	{#each memos as memo (memo.id)}
		<div data-memo-id={memo.id} class="w-fit">
			<MemoCard {memo} />
		</div>
	{:else}
		<p class="text-center">No memos yet :c</p>
	{/each}
	<InfiniteScroll
		window={true}
		threshold={2 * 500}
		hasMore={next != null}
		on:loadMore={() => {
			fetchMemos()
		}}
	/>
</div>

<!-- <MemoList
		bind:this={list}
		endpoint="/api/created"
		memos={data.memos}
		next={data.next}
		on:loaded={(e) => {
			data.memos = [...data.memos, ...e.detail.memos]
			data.next = e.detail.next
			/* console.log(data.memos) */
		}}
	>
		<h1 slot="header" class="text-2xl my-5 text-center font-semibold">Your Memos</h1>
		<p slot="empty" class="text-center">No memos yet :c</p>
	</MemoList> -->
