<script lang="ts">
	import { page } from '$app/stores'
	import { createEventDispatcher, tick } from 'svelte'
	import type { Memo } from '$lib/db_types'
	import MemoCard from '$lib/components/MemoCard.svelte'
	import InfiniteScroll from 'svelte-infinite-scroll'

	const dispatch = createEventDispatcher()

	export let memos: Memo[]
	export let next: string | null
	export let endpoint: string
	export let hasMore: boolean = next != null
	export let query: string = ''

	let loading = false

	let scroll_pos: number

	export function capture() {
		return scroll_pos
	}

	export function restore(scroll_pos: number) {
		restorePos(scroll_pos)
	}

	async function restorePos(scroll_pos: number) {
		await tick()
		window.scrollTo({ top: scroll_pos, behavior: 'instant' })
	}

	async function fetchMemos() {
		if (loading || !next) return
		loading = true

		query = query != '' ? '&query=' + query : ''

		const response = await fetch(`${endpoint}?start=${next}${query}`)
		const result = await response.json()

		if (response.ok) {
			const fetched_memo: Memo[] = result.memos
			const new_next: string = result.next
			/* memos = [...memos, ...fetched_memo]
			next = new_next */
			dispatch('loaded', { fetched_memo, new_next })
		} else {
			// TODO Handle error better
			/* throw new Error('Impossibile to retrieve information form the link') */
		}

		loading = false
	}
</script>

<svelte:window bind:scrollY={scroll_pos} />

<slot name="header" />

<div class="flex flex-col md:flex-row md:flex-wrap gap-5 justify-center items-center md:px-2">
	{#each memos as memo (memo.id)}
		<MemoCard {memo} />
	{:else}
		<slot name="empy"><p class="text-center">No memos yet :c</p></slot>
	{/each}
	<InfiniteScroll
		window={true}
		threshold={500}
		{hasMore}
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
