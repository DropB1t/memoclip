<script lang="ts">
	import { enhance } from '$app/forms'
	import { page } from '$app/stores'
	import { toast_opt } from '$lib/utils'
	import type { SubmitFunction } from '@sveltejs/kit'
	import { Plus, X } from 'lucide-svelte'
	import toast from 'svelte-french-toast'

	export let tag: string
	let following = false

	$: if (tag) fetchFollow()

	async function fetchFollow() {
		if (!$page.data.user) return

		loading = true
		const { data, error: err } = await $page.data.supabase
			.from('profiles')
			.select('username')
			.eq('id', $page.data.user.id)
			.contains('followed_tags', `{"${tag}"}`)

		if (err) console.dir(err)

		if (data && data.length > 0) following = true
		else following = false
		loading = false
	}

	let loading = true

	const toggleFollow: SubmitFunction = () => {
		loading = true

		return async ({ result }) => {
			if (result.type === 'success') {
				following = !following
				toast.success('Successfully followed the tag', toast_opt)
			}
			if (result.type === 'failure') {
				toast.error('Failed to follow the tag', toast_opt)
			}
			loading = false
		}
	}
</script>

<div class="ml-auto">
	<form action="/?/toggleFollow" method="post" use:enhance={toggleFollow}>
		<input type="hidden" name="tag" value={tag} />
		<button
			aria-label={following ? 'following' : 'unfollowing'}
			type="submit"
			name="followed"
			value={following ? 'false' : 'true'}
			class="min-w-[127px] btn btn-sm btn-neutral btn-outline text-center rounded-lg"
		>
			{#if loading}
				<span class="loading loading-dots w-[18px]" />
			{:else if following}
				<X size="18" /> Unfollow
			{:else}
				<Plus size="18" /> Follow
			{/if}
		</button>
	</form>
</div>
