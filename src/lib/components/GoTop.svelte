<script>
	import { ChevronUp } from 'lucide-svelte';

	export let showAtPixel = 800;

	let scrollHeight = 0;

	const gotoTop = () => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};

	$: showGotoTop = scrollHeight > showAtPixel;
</script>

{#if showGotoTop}
	<button
		on:click={gotoTop}
		class="btn btn-secondary duration-300 hover:-translate-y-1 hover:btn-accent fixed right-2 bottom-14 md:right-4 md:bottom-4 px-3 py-1 z-50"
		title="Go to top"><ChevronUp size="18" /></button
	>
{/if}

<svelte:window bind:scrollY={scrollHeight} />
