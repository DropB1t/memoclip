<script lang="ts">
	import { navigating } from '$app/stores'
	import FollowTagToggle from '$lib/components/FollowTagToggle.svelte'
	import MemoList from '$lib/components/MemoList.svelte'
	import { Hash } from 'lucide-svelte'

	export let data
	$: ({ memos, next, tag } = data)

	let titleTag = data.tag.charAt(0).toUpperCase() + data.tag.slice(1)

	let list: MemoList
	let can_restore = false

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
			if (values.scroll_pos) {
				list.restore(values.scroll_pos)
			}
		}
	}
</script>

<svelte:head>
	<title>{titleTag} - MemoClip</title>
	<meta name="description" content="#{titleTag} - MemoClip" />
</svelte:head>

<MemoList
	bind:this={list}
	endpoint="/api/memos/tags/{tag}"
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
