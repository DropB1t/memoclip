<script lang="ts">
	import { createEventDispatcher, onMount, tick } from 'svelte'
	import type { Memo } from '$lib/db_types'
	import GoTop from './GoTop.svelte'

	export let items: Memo[]

	export function capture() {
		const scroll = scroller.scrollTop
		return { a, b, scroll }
	}

	export async function restore(state: { a: number; b: number; scroll: number }) {
		a = state.a
		b = state.b

		await tick()
		scroller.scrollTo(0, state.scroll)
	}

	const dispatch = createEventDispatcher()

	let viewport: HTMLDivElement
	let scroller: HTMLDivElement
	let content: HTMLDivElement

	let a = 0
	let b = items.length
	let offset = 0

	$: b = items.length

	function handle_resize() {
		offset = content.offsetTop
		handle_scroll()
	}

	function handle_scroll() {
		const remaining = scroller.scrollHeight - scroller.scrollTop - scroller.clientHeight
		if (remaining < 250) {
			dispatch('more')
		}
	}

	onMount(handle_resize)
</script>

<svelte:window on:resize={handle_resize} />

<GoTop />

<div bind:this={viewport} class="w-full h-full">
	<div
		bind:this={scroller}
		class="w-full h-full overflow-y-scroll"
		style="overflow-anchor: none"
		on:scroll={handle_scroll}
	>
		<slot name="header" />

		<div
			bind:this={content}
			class="flex flex-col md:flex-row md:flex-wrap gap-5 justify-center items-center px-2 md:px-20"
		>
			{#each items as item (item.id)}
				<div data-item-id={item.id} class="w-fit">
					<slot name="item" {item} />
				</div>
			{:else}
				<slot name="empty" />
			{/each}
		</div>

		<slot name="footer" />
	</div>
</div>
