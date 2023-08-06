<script lang="ts">
	import { page } from '$app/stores'
	import type { LayoutData } from './$types'
	import { PackagePlus, Star } from 'lucide-svelte'

	export let data: LayoutData
</script>

<svelte:head>
	<title>{data.profile.username} • MemoClip</title>
</svelte:head>

<div
	class="w-full max-w-4xl border-2 bg-base-100 text-base-content border-secondary shadow-md rounded-lg flex flex-col items-center md:items-start justify-center p-5 mx-auto"
>
	<div class="inline-flex items-center gap-1">
		<h1
			class=" w-fit bg-primary text-primary-content text-md md:text-2xl font-bold font-mono p-2 rounded-lg"
		>
			{data.profile.username}
		</h1>
		<h3 class="w-fit text-sm md:text-md font-semibold p-1 rounded-lg">
			• {data.profile.first_name}
			{data.profile.last_name}
		</h3>
	</div>

	<div class="divider my-0.5" />

	<div class="stats shadow bg-primary text-primary-content stats-vertical md:stats-horizontal mt-2">
		<div class="stat place-items-center md:place-items-start">
			<div class="stat-figure">
				<PackagePlus />
			</div>
			<div class="stat-title text-primary-content">Memos Creted</div>
			<div class="stat-value">{data.posts_created}</div>
			<div class="stat-desc text-primary-content">Keep going ! :D</div>
		</div>
		<div class="stat place-items-center md:place-items-start">
			<div class="stat-figure">
				<Star />
			</div>
			<div class="stat-title text-primary-content">Favorite Memos</div>
			<div class="stat-value">{data.posts_fav}</div>
			<div class="stat-desc text-primary-content">Keep it strictly useful ;D</div>
		</div>
	</div>
	<div class="inline-flex mx-auto mt-5">
		<div class="tabs tabs-boxed">
			<a
				class="tab"
				href="/profile/{data.profile.username}"
				class:tab-active={$page.url.pathname === `/profile/${data.profile.username}`}
				>Created Memos</a
			>
			<a
				class="tab"
				href="/profile/{data.profile.username}/favorites"
				class:tab-active={$page.url.pathname === `/profile/${data.profile.username}/favorites`}
				>Favorites</a
			>
		</div>
	</div>
</div>

<slot />
