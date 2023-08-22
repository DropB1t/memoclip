<script lang="ts">
	import { AtSign, Boxes, Check, ExternalLink, Plus, Calendar, Trash, Edit } from 'lucide-svelte'
	import type { PageData } from './$types'
	import { enhance } from '$app/forms'
	import { page } from '$app/stores'
	import type { SubmitFunction } from '@sveltejs/kit'
	import toast from 'svelte-french-toast'
	import { toast_opt } from '$lib/utils'
	import { state, update_memo } from '$lib/memo_state.js'

	export let data: PageData

	let created = ''
	$: created = new Date(data.memo.created_at).toLocaleString()

	let loading = false

	$: is_favorite = data.memo.is_favorite
	$: pins = data.memo.pins

	sync()

	function sync() {
		update_memo(data.memo.id, data.memo.pins, data.memo.is_favorite)
	}

	const toggleFav: SubmitFunction = () => {
		loading = true

		return async ({ update, result }) => {
			if (result.type === 'success') {
				data.memo.is_favorite = !data.memo.is_favorite
				data.memo.is_favorite ? data.memo.pins++ : data.memo.pins--
				sync()
				toast.success(
					data.memo.is_favorite ? 'Successfully pinned' : 'Successfully unpinned',
					toast_opt
				)
			}
			if (result.type === 'failure') {
				toast.error('Failed to pin the memo', toast_opt)
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
				{data.memo.title}
			</h1>
			<h2 class="text-lg text-info font-semibold">TLDR</h2>
			<p class="lg:w-3/4 text-base border-l-2 border-info px-5 mb-1">{data.memo.description}</p>
			<div class="block mb-1">
				{#each data.memo.tags as tag}
					<a
						href="/tags/{tag}"
						class="font-bold badge badge-secondary badge-outline hover:text-accent-focus mr-1 mt-2 py-2"
					>
						#{tag}
					</a>
				{/each}
			</div>
			<div class="inline-flex font-medium justify-center items-center mb-5">
				<Calendar size="18" />
				<span class="ml-1"> {created}</span>
			</div>
			{#if data.memo.image_url}
				<img
					loading="lazy"
					class="rounded-lg w-full max-w-xl self-center lg:self-start"
					src={data.memo.image_url}
					alt={data.memo.title}
				/>
			{/if}
		</div>
		<div
			class="divider before:bg-secondary/40 after:bg-secondary/40 divider-vertical lg:divider-horizontal my-0.5"
		/>
		<div
			class="lg:w-1/4 flex flex-row-reverse flex-wrap-reverse lg:flex-nowrap lg:flex-col justify-between items-center"
		>
			{#if $page.data.session?.user.id === data.memo.user_id}
				<div
					class="inline-flex gap-1 place-content-between ml-auto lg:ml-0 mt-5 lg:mt-0 lg:mb-5 lg:w-full"
				>
					<button class="grow btn btn-md btn-outline btn-neutral rounded-lg"
						><Edit size="18" /> Edit</button
					>
					<form action="?/deleteMemo" method="post">
						<input type="hidden" name="id" value={data.memo.id} />
						<button class="btn btn-md btn-square btn-outline btn-error rounded-lg"
							><Trash size="18" /></button
						>
					</form>
				</div>
			{/if}
			<a
				class="w-full bg-primary text-primary-content text-md lg:text-xl font-bold link-hover inline-flex justify-center items-center rounded-lg p-2 mt-5 lg:mt-0 mx-auto"
				href="/profile/{data.memo.profile_username}"
			>
				<AtSign size="18" />
				<span class="text-base font-bold ml-0.5">{data.memo.profile_username}</span>
			</a>

			<div class="w-fit lg:w-full flex flex-row-reverse lg:flex-col items-center lg:mt-auto">
				<form action="/?/toggleFav" method="post" use:enhance={toggleFav}>
					<input type="hidden" name="id" value={data.memo.id} />
					<button
						aria-label={is_favorite ? 'pinned' : 'unpinned'}
						type="submit"
						name="pinned"
						value={is_favorite ? 'false' : 'true'}
						class="btn btn-md btn-outline btn-success text-center rounded-lg"
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
				<div
					class="w-fit lg:w-full p-2 font-bold border-[1px] border-success rounded-lg inline-flex justify-center items-center mx-2 lg:mx-0 lg:my-2"
				>
					<span class="p-1">{pins}</span>
					<Boxes size="24" />
				</div>
			</div>
			<a
				class="w-fit lg:w-full bg-accent link-hover text-accent-content text-md lg:text-lg font-medium inline-flex justify-evenly items-center rounded-lg p-2"
				href={data.memo.link}
				target="_blank"
			>
				<ExternalLink size="18" /> Read Post
			</a>
		</div>
	</div>
</div>
