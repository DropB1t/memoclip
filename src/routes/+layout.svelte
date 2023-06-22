<script lang="ts">
	import '../app.postcss'
	import Header from '$lib/components/Header.svelte'
	import Navbar from '$lib/components/Navbar.svelte'
	import GoTop from '$lib/components/GoTop.svelte'

	import { invalidate } from '$app/navigation'
	import { onMount } from 'svelte'
	import type { LayoutData } from './$types'

	export let data: LayoutData

	$: ({ supabase, session, profile } = data)

	onMount(() => {
		const {
			data: { subscription }
		} = supabase.auth.onAuthStateChange((_event, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth')
			}
		})

		return () => subscription.unsubscribe()
	})
</script>

<GoTop />
<Header />

<main
	class="flex flex-col md:flex-row md:flex-wrap gap-5 px-2 md:px-32 pt-8 mb-16 justify-center items-center z-0"
>
	<slot />
</main>

{#if session}
	<Navbar />
	<div
		class="alert alert-info fixed inline-flex bottom-2 inset-x-0 mx-auto w-fit rounded-lg shadow-md py-2"
	>
		<span>Welcome, {profile?.username} !</span>
	</div>
{/if}
