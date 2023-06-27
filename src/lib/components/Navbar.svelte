<script lang="ts">
	import { Search, LayoutDashboard, Star, Plus, Compass } from 'lucide-svelte'
	import { page } from '$app/stores'
	let screenSize: number
</script>

<svelte:window bind:innerWidth={screenSize} />

{#if screenSize < 768}
	<nav class="z-40">
		<div class="btm-nav btm-nav-sm">
			<a href="/" class:active={$page.url.pathname === '/'} data-sveltekit-preload-data="tap">
				<Compass />
			</a>
			<a
				href="/dashboard"
				class:active={$page.url.pathname === '/dashboard'}
				data-sveltekit-preload-data="tap"><LayoutDashboard /></a
			>
			<a href="/editor" class:active={$page.url.pathname === '/editor'}>
				<Plus />
			</a>
			<a href="/search" class:active={$page.url.pathname === '/search'}>
				<Search />
			</a>
			<a
				href="/favourite"
				class:active={$page.url.pathname === '/favourite'}
				data-sveltekit-preload-data="tap"
			>
				<Star />
			</a>
		</div>
	</nav>
{/if}
{#if screenSize >= 768}
	<div class="fixed h-fit left-0 inset-y-0 my-auto">
		<div class="divider px-4 my-0.5 max-w-[72px]" />
		<ul class="menu font-semibold">
			<li class="navbar-li group">
				<a href="/" class="navbar-link hover:!active" class:active={$page.url.pathname === '/'}>
					<div class="p-4"><Compass /></div>
					Explore
				</a>
			</li>
			<li class="navbar-li group">
				<a
					href="/dashboard"
					class="navbar-link hover:!active"
					class:active={$page.url.pathname === '/dashboard'}
					><div class="p-4"><LayoutDashboard /></div>
					Dashboard</a
				>
			</li>
			<li class="navbar-li group">
				<a
					href="/editor"
					class="navbar-link hover:!active"
					class:active={$page.url.pathname === '/editor'}
				>
					<div class="p-4"><Plus /></div>
					Add Memo
				</a>
			</li>
			<li class="navbar-li group">
				<a
					href="/favorites"
					class="navbar-link hover:!active"
					class:active={$page.url.pathname === '/favorites'}
				>
					<div class="p-4"><Star /></div>
					Favorites
				</a>
			</li>
		</ul>
		<div class="divider px-4 my-0.5 max-w-[72px]" />
	</div>
{/if}

<style global lang="postcss">
	.navbar-li {
		@apply py-1 hover:translate-x-1 transition-all;
	}
	.navbar-link {
		@apply w-[56px] group-hover:w-fit overflow-hidden pl-0 py-0 pr-4 transition-[width];
	}
</style>
