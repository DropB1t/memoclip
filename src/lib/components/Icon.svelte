<script>
	// @ts-nocheck
	import * as icons from 'lucide-svelte';
	export let name;
</script>

<svelte:component this={icons[name]} {...$$props} />
