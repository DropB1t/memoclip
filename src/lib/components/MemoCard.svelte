<script lang="ts">
	import { Flame, ExternalLink, Plus, Boxes, Check, AtSign } from 'lucide-svelte'
	import type { SubmitFunction } from '@sveltejs/kit'
	import type { Memo } from '$lib/db_types'
	import { enhance } from '$app/forms'
	import toast from 'svelte-french-toast'
	import { toast_opt } from '$lib/utils'
	import { beforeUpdate } from 'svelte'
	import { state, update_memo } from '$lib/memo_state'
	import logo from '$lib/assets/logo.png'

	export let memo: Memo

	let tags_len = 0
	let tags: string[]

	let five_hours = Date.now() - 1000 * 60 * 60 * 5
	let created = new Date(memo.created_at).getTime()

	let loading = false

	$: is_favorite = memo.is_favorite
	$: pins = memo.pins

	if (memo.tags) {
		tags_len = memo.tags.length
		tags = tags_len > 2 ? memo.tags.slice(0, 2) : memo.tags
	}

	const sync = () => {
		if ($state[memo.id] && memo.is_favorite != $state[memo.id].is_favorite)
			memo.is_favorite = $state[memo.id].is_favorite

		if ($state[memo.id] && memo.pins != $state[memo.id].pins) {
			memo.pins = $state[memo.id].pins
		}
	}

	beforeUpdate(() => {
		sync()
	})

	const toggleFav: SubmitFunction = () => {
		loading = true
		return async ({ result }) => {
			if (result.type === 'success') {
				if (result.data!.action === 'pinned') {
					memo.is_favorite = true
					memo.pins = $state[memo.id].pins + 1
				} else if (result.data!.action === 'unpinned') {
					memo.is_favorite = false
					memo.pins = $state[memo.id].pins - 1
				}
				update_memo(memo.id, memo.pins, memo.is_favorite)
				toast.success(memo.is_favorite ? 'Successfully pinned' : 'Successfully unpinned', toast_opt)
			}
			if (result.type === 'failure') {
				toast.error('Failed to pin the memo', toast_opt)
			}
			loading = false
		}
	}

	/* w-96 md:h-[450px] */
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
	data-memo-id={memo.id}
	class="memo group card indicator bg-base-100 rounded-lg w-[22rem] h-[560px] border-2 border-secondary not-prose my-2"
>
	{#if created > five_hours}
		<div class="indicator-item indicator-center badge badge-lg border-2 border-secondary p-1 py-3">
			<Flame size="18" color="#f87272" />
		</div>
	{/if}
	<div class="px-5 pt-5">
		<a
			class="mb-1 link link-hover link-info inline-flex justify-start items-center"
			href="/profile/{memo.profile_username}"
		>
			<AtSign size="15" />
			<span class="text-base font-bold ml-0.5">{memo.profile_username}</span>
		</a>
		{#if memo.image_url}
			<img
				loading="lazy"
				class="rounded-lg w-full border-2 border-primary"
				style="aspect-ratio: 2"
				src={memo.image_url}
				alt={memo.title}
				width="340"
				height="170"
			/>
		{:else}
			<div
				class="artboard-demo artboard-horizontal w-full h-[154px] bg-base-200/25 border-2 border-primary rounded-lg"
			>
				<img src={logo} alt="MemoClip Logo" width="48" height="48" />
			</div>
		{/if}
	</div>

	<div class="card-body text-base-content p-5">
		<a
			href="/memo/{memo.id}"
			class="card-title h-full max-h-[56px] line-clamp-2 cursor-pointer select-text hover:text-secondary"
		>
			{memo.title}
		</a>
		<p class="text-md h-full max-h-[95px] select-text line-clamp-4 my-1">
			{memo.description}
		</p>
		<div class="my-1 h-full max-h-12">
			{#if tags_len > 0}
				{#each tags as tag}
					<a
						href="/tags/{tag}"
						class="font-bold text-base badge badge-secondary badge-outline hover:text-accent-focus mr-1"
					>
						#{tag}
					</a>
				{/each}
				{#if tags_len > 2}
					<span class="text-secondary ml-0.5 self-end">...</span>
				{/if}
			{/if}
		</div>

		<div class="divider my-0.5" />
		<div class="card-actions flex justify-start items-center">
			<a class="btn btn-sm md:btn-md btn-outline btn-accent" href={memo.link} target="_blank">
				<ExternalLink size="18" />
			</a>

			<div class="ml-auto inline-flex items-center">
				<div
					class="px-2 font-bold border-l-[1px] border-y-[1px] border-success rounded-s-lg inline-flex justify-around items-center"
				>
					<Boxes size="24" />
					<span class="pl-1">{pins}</span>
				</div>

				<form action="/?/toggleFav" method="post" use:enhance={toggleFav}>
					<input type="hidden" name="id" value={memo.id} />
					<button
						aria-label={is_favorite ? 'pinned' : 'unpinned'}
						type="submit"
						name="pinned"
						value={is_favorite ? 'false' : 'true'}
						class="btn btn-sm md:btn-md btn-outline btn-success text-center rounded-s-none md:rounded-lg"
					>
						{#if loading}
							<span class="loading loading-spinner w-[18px]" />
						{:else if is_favorite}
							<Check size="18" />
						{:else}
							<Plus size="18" />
						{/if}
					</button>
				</form>
			</div>
		</div>
	</div>
</div>

<style>
	.memo {
		transition: all 0.1s ease-in;
	}
	.memo:hover {
		transform: scale(1.01);
	}
</style>
