<script lang="ts">
	import '../app.postcss';
	import Header from '$lib/components/Header.svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import GoTop from '$lib/components/GoTop.svelte';
</script>

<Header />
<main
	class="flex flex-col md:flex-row md:flex-wrap gap-5 px-2 md:px-20 pt-8 mb-16 justify-center items-center z-0"
>
	<slot />
</main>
<Navbar />

<GoTop />
