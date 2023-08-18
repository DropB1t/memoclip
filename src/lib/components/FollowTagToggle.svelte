<script lang="ts">
	import { enhance } from '$app/forms'
	import { page } from '$app/stores'
	import type { SubmitFunction } from '@sveltejs/kit'
	import { Plus, X } from 'lucide-svelte'
	import { onMount } from 'svelte'

	export let tag: string
	let following = false

	$: if (tag) fetchFollow()

	async function fetchFollow() {
		const { data, error: err } = await $page.data.supabase
			.from('profiles')
			.select('username')
			.eq('id', $page.data.user.id)
			.contains('followed_tags', `{"${tag}"}`)

		if (err) console.dir(err)

		if (data && data.length > 0) following = true
		else following = false
	}

	let loading = false

	const toggleFollow: SubmitFunction = () => {
		loading = true

		return async ({ update, result }) => {
			//console.log(result)
			if (result.type === 'success') {
				following = !following
			}
			if (result.type === 'failure') {
				console.log(result.data)
			}
			loading = false
			await update()
		}
	}

	//onMount(async () => fetchFollow())
</script>

<div class="ml-auto">
	<form action="/?/toggleFollow" method="post" use:enhance={toggleFollow}>
		<input type="hidden" name="tag" value={tag} />
		<button
			aria-label={following ? 'following' : 'unfollowing'}
			type="submit"
			name="followed"
			value={following ? 'false' : 'true'}
			class="btn btn-sm btn-neutral btn-outline text-center rounded-s-none md:rounded-lg"
		>
			{#if loading}
				<span class="loading loading-spinner w-[18px]" />
			{:else if following}
				<X size="18" /> Unfollow
			{:else}
				<Plus size="18" /> Follow
			{/if}
		</button>
	</form>
</div>
