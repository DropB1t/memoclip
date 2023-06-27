<script lang="ts">
	import '../app.postcss'
	import Header from '$lib/components/Header.svelte'
	import Navbar from '$lib/components/Navbar.svelte'
	import GoTop from '$lib/components/GoTop.svelte'

	import type { LayoutData } from './$types'
	import { invalidate } from '$app/navigation'
	import { onMount } from 'svelte'

	export let data: LayoutData
	$: ({ supabase, session } = data)

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

<Header />
<div class="px-2 md:px-20 pt-8 pb-16 z-0">
	<slot />
</div>

{#if session}
	<Navbar />
	<!-- <div
		class="alert alert-info fixed inline-flex bottom-2 inset-x-0 mx-auto w-fit rounded-lg shadow-md py-2"
	>
		<span>Welcome, {user?.username} !</span>
	</div> -->
{/if}
