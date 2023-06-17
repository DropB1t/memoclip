<script lang="ts">
	import '@splidejs/svelte-splide/css/core';
	import { Splide, SplideSlide, SplideTrack } from '@splidejs/svelte-splide';
	import { ChevronLeft, ChevronRight } from 'lucide-svelte';
	import Memo from '$lib/components/Memo.svelte';

	const options = {
		type: 'slide',
		wheel: true,
		releaseWheel: true,
		pagination: false,
		perPage: 1,
		width: '30rem',
		padding: '3rem',
		gap: '4rem'
	};
</script>

<div
	class="flex flex-col items-center bg-base-100 border-2 border-neutral text-primary-content p-3 rounded-lg shadow-sm shadow-neutral-focus/40"
>
	<h1 class="bg-primary w-fit text-3xl font-bold font-mono p-2 rounded-lg">#docker</h1>
	<Splide aria-label="crate" hasTrack={false} {options}>
		<SplideTrack>
			<SplideSlide>
				<Memo />
			</SplideSlide>
			<SplideSlide>
				<Memo />
			</SplideSlide>
		</SplideTrack>

		<div class="splide__arrows flex justify-between mt-2">
			<button class="splide__arrow--prev btn btn-neutral disabled:btn-disabled p-3 m-1"
				><ChevronLeft /></button
			>
			<button class="splide__arrow--next btn btn-neutral disabled:btn-disabled p-3 m-1"
				><ChevronRight /></button
			>
		</div>
	</Splide>
</div>

<!-- <div
	class="m-x-5 flex flex-col justify-center items-start p-4 bg-base-300 border-2 border-primary rounded-lg"
>
	<div class="w-fit text-center text-xl bg-base-100 font-mono px-2 py-1 rounded-lg">
		<h2><span class="text-secondary font-bold">#</span>Docker</h2>
	</div>

	<div class="max-w-[26rem] carousel carousel-center p-4 space-x-5">
		<div class="carousel-item">
			<MemoCard />
		</div>
		<div class="carousel-item">
			<MemoCard />
		</div>
		<div class="carousel-item">
			<MemoCard />
		</div>
		<div class="carousel-item">
			<MemoCard />
		</div>
		<div class="carousel-item">
			<MemoCard />
		</div>
		<div class="carousel-item">
			<MemoCard />
		</div>
	</div>
</div> -->
