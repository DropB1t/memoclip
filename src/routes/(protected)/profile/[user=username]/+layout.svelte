<script lang="ts">
	import { page } from '$app/stores'
	import type { LayoutData } from './$types'
	import { PackagePlus, Star } from 'lucide-svelte'

	export let data: LayoutData

	$: ({ profile, user } = data)

	let num_tags = 15
	let more_tags: boolean
	let tags: string[] = data.profile.followed_tags

	more_tags = data.profile.followed_tags.length > num_tags
	tags = more_tags ? tags.slice(0, num_tags) : tags
</script>

<svelte:head>
	<title>{profile.username} • MemoClip</title>
</svelte:head>

<div
	class="w-full max-w-4xl border-2 bg-base-100 text-base-content border-secondary shadow-md rounded-lg flex flex-col items-center md:items-start justify-center p-5 mx-auto"
>
	<div class="inline-flex items-center gap-1">
		<h1 class="w-fit bg-primary text-primary-content text-md md:text-xl font-bold p-2 rounded-lg">
			{profile.username}
		</h1>
		<h2 class="w-fit text-sm md:text-lg p-1 rounded-lg">
			• {profile.first_name}
			{profile.last_name}
		</h2>
	</div>

	<div class="divider my-0.5" />
	<div class="flex flex-col md:flex-row w-full items-center md:items-start mt-2">
		<div
			class="stats min-w-fit w-full shadow bg-primary text-primary-content stats-vertical md:stats-horizontal"
		>
			<div class="stat place-items-center md:place-items-start">
				<div class="stat-figure">
					<PackagePlus />
				</div>
				<div class="stat-title text-primary-content">Memos Creted</div>
				{#await data.streamed.posts_created}
					<span class="loading loading-spinner w-[18px]" />
				{:then posts_created}
					<div class="stat-value">{posts_created}</div>
				{/await}

				{#if profile.id === user?.id}
					<div class="stat-desc text-primary-content">Keep going ! :D</div>
				{/if}
			</div>
			<div class="stat place-items-center md:place-items-start">
				<div class="stat-figure">
					<Star />
				</div>
				<div class="stat-title text-primary-content">Favorite Memos</div>
				{#await data.streamed.posts_fav}
					<span class="loading loading-spinner w-[18px]" />
				{:then posts_fav}
					<div class="stat-value">{posts_fav}</div>
				{/await}
				{#if profile.id === user?.id}
					<div class="stat-desc text-primary-content">Keep it strictly useful ;D</div>
				{/if}
			</div>
		</div>
		<div class="w-full mx-4 mt-2 md:mt-0 block text-center md:text-justify">
			<h3 class="text-lg">Followed Tags</h3>
			{#each tags as tag}
				<a
					href="/tags/{tag}"
					class="font-bold badge badge-secondary badge-outline hover:text-accent-focus mr-1 mt-2 py-2"
				>
					#{tag}
				</a>
			{/each}
			{#if more_tags && $page.url.pathname !== `/profile/${data.profile.username}/tags`}
				<a href="/profile/{data.profile.username}/tags" class="link text-secondary self-end">more</a
				>
			{/if}
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
