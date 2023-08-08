<script lang="ts">
	import '@splidejs/svelte-splide/css/core'
	import { Splide, SplideSlide, SplideTrack } from '@splidejs/svelte-splide'
	import { URLHash } from '@splidejs/splide-extension-url-hash'
	import { ChevronLeft, ChevronRight, CornerDownLeft } from 'lucide-svelte'
	import Memo from '$lib/components/MemoCard.svelte'

	let crateSlider: Splide
	let toStart = false

	const options = {
		type: 'slide',
		wheel: true,
		releaseWheel: true,
		drag: false,
		pagination: false,
		perPage: 1,
		lazyLoad: true,
		width: '30rem',
		padding: '3rem',
		gap: '4rem',
		breakpoints: {
			768: {
				width: '21rem',
				height: '550px',
				padding: '.5rem',
				gap: '2rem'
			},
			640: {
				drag: true
			}
		}
	}

	function goToStart(): void {
		if (crateSlider) {
			crateSlider.go(0)
		}
	}
</script>

<div
	class="flex flex-col items-center w-full sm:w-fit max-w-xl bg-base-100 border-2 border-base-300 text-primary-content p-3 rounded-lg shadow-md overflow-hidden"
>
	<h1 class="bg-primary w-fit text-md md:text-2xl font-bold p-2 rounded-lg">#docker</h1>
	<Splide
		aria-label="crate"
		hasTrack={false}
		{options}
		extensions={{ URLHash }}
		bind:this={crateSlider}
		on:moved={(e) => (toStart = e != undefined && e.detail.index >= 1 ? true : false)}
		on:visible={(e) => (toStart = e != undefined && e.detail.Slide.index >= 1 ? true : false)}
	>
		<SplideTrack>
			{#each Array(10) as _, i}
				<SplideSlide data-splide-hash="docker{i}">
					<!-- <MemoCard /> -->
				</SplideSlide>
			{/each}
		</SplideTrack>

		<div class="splide__arrows flex justify-between mt-2">
			<button
				class="splide__arrow--prev btn btn-sm md:btn-md btn-neutral disabled:btn-disabled md:p-3 m-1"
				><ChevronLeft /></button
			>
			{#if toStart}
				<button
					class="splide__arrow--prev btn btn-sm md:btn-md btn-neutral disabled:btn-disabled md:p-3 m-1"
					on:click={goToStart}><CornerDownLeft /></button
				>
			{/if}

			<button
				class="splide__arrow--next btn btn-sm md:btn-md btn-neutral disabled:btn-disabled md:p-3 m-1"
				><ChevronRight /></button
			>
		</div>
	</Splide>
</div>
