<script lang="ts">
	import { page } from '$app/stores'
	import { createEventDispatcher } from 'svelte'
	import type { Memo } from '$lib/db_types'
	import Scroller from '$lib/components/Scroller.svelte'
	import MemoCard from '$lib/components/MemoCard.svelte'

	export let memos: Memo[]
	export let next: string | null
	export let endpoint: string

	export function capture() {
		return scroller.capture()
	}

	export function restore(values: any) {
		scroller.restore(values)
	}

	const dispatch = createEventDispatcher()

	let scroller: Scroller
	let loading = false
</script>

<Scroller
	bind:this={scroller}
	items={memos}
	on:more={async () => {
		if (loading || !next) return
		loading = true

		const response = await fetch(`${endpoint}?start=${next}`)
		const result = await response.json()

		if (response.ok && result) {
			dispatch('loaded', result)
		} else {
			// TODO Handle error better
			/* throw new Error('Impossibile to retrieve information form the link') */
		}

		loading = false
	}}
>
	<div slot="header" class="max-w-2xl px-4 mx-auto">
		<slot name="header" />
	</div>

	<div slot="item" let:item>
		<MemoCard memo={item} />
	</div>
	<div slot="empty">
		<slot name="empty" />
	</div>

	<div slot="footer" class="px-2 mb-8 mx-auto text-center">
		{#if next}
			<a class="link text-base-content" href="{$page.url.pathname}?start={next}">next page</a>
		{/if}
	</div>
</Scroller>
