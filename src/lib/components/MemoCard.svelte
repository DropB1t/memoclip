<script lang="ts">
	import { Flame, ExternalLink, Plus, Boxes, Check, AtSign } from 'lucide-svelte'
	import type { Memo } from '$lib/db_types'

	export let memo: Memo

	let tags_len = 0
	let tags: string[]

	let five_hours = Date.now() - 1000 * 60 * 60 * 5
	let created = new Date(memo.created_at).getTime()

	if (memo.tags) {
		tags_len = memo.tags.length
		tags = tags_len > 2 ? memo.tags.slice(0, 2) : memo.tags
	}
	/* w-96 md:h-[450px] */
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
	data-memo-id={memo.id}
	class="memo group card indicator bg-base-100 rounded-lg w-96 h-[510px] md:h-[560px] border-2 border-secondary not-prose my-2"
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
				class="rounded-lg w-full"
				style="aspect-ratio: 2"
				src={memo.image_url}
				alt={memo.title}
				width="340"
				height="170"
			/>
		{:else}
			<div class="artboard-demo artboard-horizontal w-[340px] h-[170px] bg-secondary">
				<span class="text-secondary-content text-lg">Memo</span>
				<!-- 340x170 -->
			</div>
		{/if}
	</div>

	<div class="card-body text-base-content p-5">
		<a
			href="/memo/{memo.id}"
			class="card-title h-full max-h-[56px] cursor-pointer select-text hover:text-secondary"
		>
			{memo.title}
		</a>
		<p class="text-md select-text my-0.5">
			{memo.description}
		</p>
		<div class="py-0.5 h-full max-h-12">
			{#if tags_len > 0}
				{#each tags as tag}
					<a
						href="/tag/{tag}"
						class="badge badge-secondary badge-outline hover:text-accent-focus hover: mr-1 mt-2"
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
					<span class="pl-1">{memo.pins}</span>
				</div>

				<button class="btn btn-sm md:btn-md btn-outline btn-success rounded-s-none md:rounded-lg">
					{#if memo.is_favorite}
						<Check size="18" />
					{:else}
						<Plus size="18" />
					{/if}
				</button>
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
	p {
		width: 100%;
		overflow: hidden;
		max-height: 7rem;
		-webkit-box-orient: vertical;
		display: block;
		display: -webkit-box;
		text-overflow: ellipsis;
		-webkit-line-clamp: 4;
	}
</style>
