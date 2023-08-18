<script lang="ts">
	import { page } from '$app/stores'
	import type { PageData } from './$types'
</script>

<h1 class="text-2xl my-5 mt-12 px-2 text-start md:text-center">
	{$page.data.profile.username}'s Followed Tags
</h1>

<div
	class="w-full max-w-4xl border-2 bg-base-100 text-base-content border-secondary shadow-md rounded-lg flex items-center justify-center p-5 mx-auto"
>
	{#each $page.data.profile.followed_tags as tag}
		<a
			href="/tags/{tag}"
			class="font-bold badge badge-secondary badge-outline hover:text-accent-focus mr-1 mt-2 py-2"
		>
			#{tag}
		</a>
	{/each}
</div>
