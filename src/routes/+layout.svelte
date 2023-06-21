<script lang="ts">
	import '../app.postcss'
	import Header from '$lib/components/Header.svelte'
	import Navbar from '$lib/components/Navbar.svelte'
	import GoTop from '$lib/components/GoTop.svelte'

	import { invalidate } from '$app/navigation'
	import { onMount } from 'svelte'
	import type { LayoutData } from './$types'

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

<GoTop />
<Header />

<main
	class="flex flex-col md:flex-row md:flex-wrap gap-5 px-2 md:px-20 pt-8 mb-16 justify-center items-center z-0"
>
	<slot />
</main>

{#if data.session}
	<Navbar />
{/if}

{#if data.session}
	<div
		class="alert alert-info fixed inline-flex bottom-2 inset-x-0 mx-auto w-fit rounded-lg shadow-md py-2"
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			class="stroke-current shrink-0 w-6 h-6"
			><path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
			/></svg
		>
		<span>Welcome, {data.session.user.email}</span>
	</div>
{/if}
