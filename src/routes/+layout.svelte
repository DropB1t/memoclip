<script lang="ts">
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';
	import '../app.postcss';
</script>

<div class="h-full p-10">
	<ThemeToggle />
	<main class="prose prose-base md:prose-xl mx-auto">
		<slot />
	</main>
</div>
