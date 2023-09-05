<script lang="ts">
	import { navigating, page } from '$app/stores'
	import { createEventDispatcher } from 'svelte'
	import type { Memo } from '$lib/db_types'
	import MemoCard from '$lib/components/MemoCard.svelte'
	import InfiniteScroll from 'svelte-infinite-scroll'
	import { init_memos } from '$lib/memo_state.js'
	import toast from 'svelte-french-toast'
	import { state } from '$lib/memo_state'
	import { toast_opt } from '$lib/utils'

	const dispatch = createEventDispatcher()

	export let memos: Memo[]
	export let next: string | null
	export let endpoint: string
	export let hasMore: boolean = next != null

	export let query: string = ''

	$: init_memos(memos)

	let loading = false

	$: if (
		$page.data.user &&
		$page.url.pathname === `/profile/${$page.data.user.username}/favorites`
	) {
		memos = memos.filter((memo) => {
			return $state[memo.id] ? $state[memo.id].is_favorite : memo.is_favorite
		})
	}

	let scroll_pos: number
	let animate: boolean = true && !$navigating

	export function capture() {
		return scroll_pos
	}

	export function restore(scroll_pos: number) {
		animate = false
		restorePos(scroll_pos)
	}

	async function restorePos(scroll_pos: number) {
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

			dispatch('loaded', { fetched_memo, new_next })
		} else {
			toast.error('Failed to load memos :c', toast_opt)
		}

		loading = false
	}
</script>

<svelte:window bind:scrollY={scroll_pos} />

<slot name="header" />

<div
	id="memo-list"
	class="flex flex-col md:flex-row md:flex-wrap gap-5 justify-center items-center md:px-2"
>
	{#each memos as memo (memo.id)}
		<MemoCard {memo} {animate} />
	{:else}
		<slot name="empy"><p class="text-center">No memos yet :c</p></slot>
	{/each}
	<InfiniteScroll
		window={true}
		threshold={400}
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
