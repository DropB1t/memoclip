<script lang="ts">
	import '../app.postcss'
	import '@fontsource/zen-kaku-gothic-new/400.css'
	import '@fontsource/zen-kaku-gothic-new/500.css'
	import '@fontsource/zen-kaku-gothic-new/700.css'
	import Header from '$lib/components/Header.svelte'
	import Navbar from '$lib/components/Navbar.svelte'
	import GoTop from '$lib/components/GoTop.svelte'
	import { Toaster, toast } from 'svelte-french-toast'

	import type { LayoutData } from './$types'
	import { invalidate } from '$app/navigation'
	import { onMount } from 'svelte'
	import { page } from '$app/stores'
	import { toast_opt } from '$lib/utils'
	import { pwaInfo } from 'virtual:pwa-info'

	$: webManifestLink = pwaInfo ? pwaInfo.webManifest.linkTag : ''

	export let data: LayoutData

	if ($page.form?.err) {
		toast.error($page.form!.err_msg, toast_opt)
	}

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

<svelte:head>
	{@html webManifestLink}
</svelte:head>

<Toaster />
<Header />
<div class="px-2 md:px-20 pt-8 pb-16 z-0">
	<slot />
</div>
<GoTop />

{#if session}
	<Navbar />
{/if}

<style>
	:global(body) {
		font-family: 'Open Sans Variable', sans-serif, system-ui;
	}
</style>
