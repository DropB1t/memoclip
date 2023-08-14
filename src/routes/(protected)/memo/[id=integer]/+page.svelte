<script lang="ts">
	import { AtSign, Boxes, Check, ExternalLink, Plus } from 'lucide-svelte'
	import type { PageData } from './$types'
	import { enhance } from '$app/forms'
	import type { SubmitFunction } from '@sveltejs/kit'

	export let data: PageData

	$: ({ memo } = data)

	let loading = false

	const toggleFav: SubmitFunction = () => {
		loading = true

		return async ({ update, result }) => {
			console.log(result)
			if (result.type === 'success') {
				memo.is_favorite = !memo.is_favorite
				memo.is_favorite ? memo.pins++ : memo.pins--
			}
			if (result.type === 'failure') {
				console.log(result.data)
			}
			loading = false
			await update()
		}
	}
</script>

<div
	class="w-full max-w-4xl border-2 bg-base-100 text-base-content border-secondary shadow-md rounded-lg p-5 mx-auto"
>
	<div class="flex flex-col lg:flex-row">
		<div class="w-full flex flex-col items-start justify-start">
			<h1 class="text-2xl text-base-content font-bold mb-5">
				{memo.title}
			</h1>
			<h2 class="text-lg text-info font-semibold">TLDR</h2>
			<p class="lg:w-3/4 text-base border-l-2 border-info px-5 mb-1">{memo.description}</p>
			<div class="block mb-5">
				{#each memo.tags as tag}
					<a
						href="/tag/{tag}"
						class="font-bold badge badge-secondary badge-outline hover:text-accent-focus mr-1 mt-2 py-2"
					>
						#{tag}
					</a>
				{/each}
			</div>
			{#if memo.image_url}
				<img
					loading="lazy"
					class="rounded-lg w-full max-w-xl self-center lg:self-start"
					src={memo.image_url}
					alt={memo.title}
				/>
			{/if}
		</div>
		<div
			class="divider before:bg-secondary/40 after:bg-secondary/40 divider-vertical lg:divider-horizontal my-0.5"
		/>
		<div
			class="lg:w-1/4 flex flex-row-reverse flex-wrap-reverse lg:flex-nowrap lg:flex-col justify-between items-center"
		>
			<a
				class="w-72 lg:w-full bg-primary text-primary-content text-md lg:text-xl font-bold link-hover inline-flex justify-center items-center rounded-lg p-2 mt-5 lg:mt-0 mx-auto"
				href="/profile/{memo.profile_username}"
			>
				<AtSign size="18" />
				<span class="text-base font-bold ml-0.5">{memo.profile_username}</span>
			</a>
			<div class="w-fit lg:w-full flex flex-row-reverse lg:flex-col items-center lg:mt-auto">
				<form action="/?/toggleFav" method="post" use:enhance={toggleFav}>
					<input type="hidden" name="id" value={memo.id} />
					<button
						aria-label={memo.is_favorite ? 'pinned' : 'unpinned'}
						type="submit"
						name="pinned"
						value={memo.is_favorite ? 'false' : 'true'}
						class="btn btn-sm md:btn-md btn-outline btn-success text-center rounded-s-none md:rounded-lg"
					>
						{#if loading}
							<span class="loading loading-spinner w-[18px]" />
						{:else if memo.is_favorite}
							<Check size="18" />
						{:else}
							<Plus size="18" />
						{/if}
					</button>
				</form>
				<div
					class="w-fit lg:w-full p-2 font-bold border-[1px] border-success rounded-lg inline-flex justify-center items-center mx-2 lg:mx-0 lg:my-2"
				>
					<span class="p-1">{memo.pins}</span>
					<Boxes size="24" />
				</div>
			</div>
			<a
				class="w-fit lg:w-full bg-accent link-hover text-accent-content text-md lg:text-lg font-medium inline-flex justify-evenly items-center rounded-lg p-2"
				href={memo.link}
				target="_blank"
			>
				<ExternalLink size="18" /> Read Post
			</a>
		</div>
	</div>
</div>
