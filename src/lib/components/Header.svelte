<script lang="ts">
	import { enhance } from '$app/forms'
	import type { SubmitFunction } from '../../routes/$types'
	import ThemeToggle from './ThemeToggle.svelte'
	import { User, Bell, Search } from 'lucide-svelte'
	import { convertNameToInitials } from '$lib/utils'

	import { page } from '$app/stores'
	import { goto } from '$app/navigation'

	const userInitials = $page.data.user
		? convertNameToInitials($page.data.user.first_name, $page.data.user.last_name)
		: null

	export let duration = '300ms'
	export let offset = 80
	export let tolerance = 5

	let headerClass = 'hdr-show'
	let y = 0
	let lastY = 0
	let screenSize: number

	function setTransitionDuration(node: HTMLDivElement) {
		node.style.transitionDuration = duration
	}

	function deriveClass(y: number, dy: number) {
		if (y < offset) {
			return 'hdr-show'
		}

		if (Math.abs(dy) <= tolerance) {
			return headerClass
		}

		if (dy < 0) {
			return 'hdr-hide'
		}

		return 'hdr-show'
	}

	function updateClass(y: number) {
		const dy = lastY - y
		lastY = y
		return deriveClass(y, dy)
	}

	const submitLogout: SubmitFunction = async ({ cancel }) => {
		const { error: err } = await $page.data.supabase.auth.signOut()
		if (err) {
			//Add Toast notification
		}
		cancel()
		await goto('/')
	}

	$: headerClass = screenSize < 768 ? updateClass(y) : ''
</script>

<svelte:window bind:innerWidth={screenSize} bind:scrollY={y} />

<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
<!-- svelte-ignore a11y-label-has-associated-control -->
<!-- svelte-ignore a11y-missing-attribute -->
<div
	use:setTransitionDuration
	class={headerClass + ' sticky top-0 w-full bg-base-200 z-50 md:pt-5'}
	id="header"
>
	<div
		class="navbar md:w-11/12 bg-base-100 border-b-2 md:border-2 border-base-300 md:shadow-md md:rounded-lg mx-auto"
	>
		<div class="navbar-start">
			<a class="text-xl normal-case font-bold link-hover hover:text-secondary m-1" href="/"
				>Memo<span class="text-secondary">Clip</span></a
			>
		</div>
		<div class="navbar-center">
			{#if $page.url.pathname !== '/search'}
				<div
					class="hidden md:inline-flex justify-end items-center rounded-lg input input-bordered border-2 focus-within:input-primary w-full max-w-xs px-1 m-1"
				>
					<Search />
					<input
						type="search"
						name="search"
						placeholder="Search on Memo"
						class="w-full bg-base-100 text-base-content border-none focus:ring-0"
					/>
				</div>
			{/if}
		</div>
		<div class="navbar-end">
			<div class="inline-flex justify-end items-center">
				<ThemeToggle />
				<div class="hidden md:flex divider divider-horizontal py-1 mx-1" />
				{#if $page.data.session}
					<!-- <button class="btn btn-ghost p-3 m-1">
						<div class="indicator">
							<Bell />
							<span class="badge badge-xs badge-primary indicator-item" />
						</div>
					</button> -->
					<div class="dropdown dropdown-end">
						<label tabindex="0" class="btn btn-ghost border-2 border-secondary avatar p-3 m-1">
							{#if userInitials}
								<span class="text-md">{userInitials}</span>
							{:else}
								<User size="18" />
							{/if}
						</label>
						<ul
							tabindex="0"
							class="mt-3 p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
						>
							<li class="menu-title text-base-content">{$page.data.user.username}</li>
							<li><a href="/profile">Profile</a></li>
							<li><a href="/settings">Settings</a></li>
							<li>
								<form
									action="/api/logout"
									method="POST"
									class="w-full flex justify-stretch items-start"
									use:enhance={submitLogout}
								>
									<button type="submit" class="w-full text-left">Logout</button>
								</form>
							</li>
						</ul>
					</div>
				{:else}
					<a
						href="/register"
						class="link link-hover link-secondary whitespace-nowrap font-bold p-2 m-1">Sign Up</a
					>
					<a href="/login" class="btn btn-primary font-bold p-3 m-1">Login</a>
				{/if}
			</div>
		</div>
	</div>
</div>

<style>
	#header {
		transition: transform 300ms linear;
	}
	.hdr-show {
		transform: translateY(0%);
	}
	.hdr-hide {
		transform: translateY(-100%);
	}
</style>
