<script lang="ts">
	import { navigating, page } from '$app/stores'
	import MemoCard from '$lib/components/MemoCard.svelte'
	import type { Memo } from '$lib/db_types.js'
	import { tick } from 'svelte'
	import InfiniteScroll from 'svelte-infinite-scroll'

	export let data

	let scrollPos: number
	let loading = false
	let can_restore = false

	let next = data.next as string
	let memos = data.memos as Memo[]

	$: if ($navigating) {
		can_restore = $navigating.type === 'popstate'
	}

	export const snapshot = {
		capture: () => ({
			memos,
			next,
			scrollPos
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

	async function restorePos(scrollPos: number) {
		await tick()
		window.scrollTo({ top: scrollPos, behavior: 'instant' })
	}

	async function fetchMemos() {
		if (loading || !next) return
		loading = true

		const response = await fetch(`/api/created?start=${next}`)
		const result = await response.json()

		if (response.ok) {
			const fetched_memo: Memo[] = result.memos
			const new_next: string = result.next
			memos = [...memos, ...fetched_memo]
			next = new_next
		} else {
			// TODO Handle error better
			/* throw new Error('Impossibile to retrieve information form the link') */
		}

		loading = false
	}
</script>

<svelte:window bind:scrollY={scrollPos} />

<h1 class="text-2xl my-5 mt-12 text-center">Your Memos</h1>

<div class="flex flex-col md:flex-row md:flex-wrap gap-5 justify-center items-center px-2">
	{#each memos as memo (memo.id)}
		<div data-memo-id={memo.id} class="w-fit">
			<MemoCard {memo} />
		</div>
	{:else}
		<p class="text-center">No memos yet :c</p>
	{/each}
	<InfiniteScroll
		window={true}
		threshold={500}
		hasMore={next != null}
		on:loadMore={() => {
			fetchMemos()
		}}
	/>
</div>

<div class="mt-5 mx-auto text-center">
	{#if loading}
		<div class="my-auto text-center">
			<span class="loading loading-dots text-secondary loading-lg" />
		</div>
	{:else if next}
		<a class="link text-base-content" href="{$page.url.pathname}?start={next}">next page</a>
	{/if}
</div>
