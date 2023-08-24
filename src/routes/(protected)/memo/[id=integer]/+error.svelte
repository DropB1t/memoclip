<script lang="ts">
	import { page } from '$app/stores'
</script>

<div class="flex flex-col gap-5 justify-center items-center text-center text-lg font-semibold">
	<h1>{$page.error?.message}</h1>
	<a href="/" class="btn btn-primary rounded-lg">Go to Explore</a>
</div>
