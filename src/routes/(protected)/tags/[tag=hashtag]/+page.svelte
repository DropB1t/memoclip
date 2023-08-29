<script lang="ts">
	import { navigating } from '$app/stores'
	import FollowTagToggle from '$lib/components/FollowTagToggle.svelte'
	import MemoList from '$lib/components/MemoList.svelte'
	import type { Memo } from '$lib/db_types.js'
	import { Hash } from 'lucide-svelte'
	import { tick } from 'svelte'

	export let data

	let tag = data.tag
	let titleTag = tag.charAt(0).toUpperCase() + tag.slice(1)

	let memos: Memo[] = []
	let next: string | null = null

	data.streamed.data
		.then(({ memos: s_memos, next: s_next }) => {
			if (can_restore) return
			memos = s_memos
			next = s_next
		})
		.finally(() => {
			loading = false
		})

	let loading = true
	let list: MemoList
	let can_restore = false
	let endpoint = `/api/memos/tags/${tag}`

	$: if ($navigating) {
		can_restore = $navigating.type === 'popstate'
	}

	export const snapshot = {
		capture: () => ({
			memos,
			next,
			scroll_pos: list.capture()
		}),
		restore: async (values) => {
			if (!can_restore) return

			memos = values.memos
			next = values.next
			loading = false
			await tick()
			if (values.scroll_pos) {
				list.restore(values.scroll_pos)
			}
		}
	}
</script>

<svelte:head>
	<title>{titleTag} • MemoClip</title>
	<meta name="description" content="#{titleTag} - MemoClip" />
</svelte:head>

{#if loading}
	<div class="w-fit mx-auto my-40">
		<span class="loading loading-spinner w-[24px]" />
	</div>
{:else}
	<MemoList
		bind:this={list}
		{endpoint}
		{memos}
		{next}
		on:loaded={(e) => {
			memos = [...memos, ...e.detail.fetched_memo]
			next = e.detail.new_next
		}}
	>
		<div
			slot="header"
			class="w-full flex place-content-center my-5 mt-12 px-3 md:px-5 text-start md:text-center"
		>
			<h1 class="text-2xl inline-flex justify-center font-medium items-center">
				<Hash size="24" />{tag}
			</h1>
			<FollowTagToggle {tag} />
		</div>
	</MemoList>
{/if}
