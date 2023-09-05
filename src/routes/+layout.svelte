<script lang="ts">
	import '../app.postcss'
	import '@fontsource/zen-kaku-gothic-new'

	import type { LayoutData } from './$types'

	import Header from '$lib/components/Header.svelte'
	import Navbar from '$lib/components/Navbar.svelte'
	import GoTop from '$lib/components/GoTop.svelte'
	import Preloading from '$lib/components/Preloading.svelte'
	import { Toaster, toast } from 'svelte-french-toast'
	import { toast_opt } from '$lib/utils'

	import { invalidate } from '$app/navigation'
	import { onMount } from 'svelte'
	import { navigating, page } from '$app/stores'

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

{#if $navigating}
	<Preloading />
{/if}

<Header />
<Toaster />
<GoTop />

<div class="px-2 md:px-20 pt-8 pb-16 z-0">
	<slot />
</div>

{#if session}
	<Navbar />
{/if}

<style>
	:global(body) {
		font-family: 'Zen Kaku Gothic New', sans-serif;
	}
</style>
