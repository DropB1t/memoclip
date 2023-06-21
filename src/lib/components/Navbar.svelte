<script lang="ts">
	import { Search, LayoutDashboard, Star, Plus, Compass } from 'lucide-svelte'
	let screenSize: number
</script>

<svelte:window bind:innerWidth={screenSize} />

{#if screenSize < 768}
	<nav class="z-40">
		<div class="btm-nav btm-nav-sm">
			<a href="/">
				<Compass />
			</a>
			<a href="/dashboard" class="active"><LayoutDashboard /></a>
			<a href="/memo/create">
				<Plus />
			</a>
			<a href="/search">
				<Search />
			</a>
			<a href="/favourite">
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
				<a href="/" class="navbar-link hover:!active">
					<div class="p-4"><Compass /></div>
					Explore
				</a>
			</li>
			<li class="navbar-li group">
				<a href="/dashboard" class="active navbar-link hover:!active"
					><div class="p-4"><LayoutDashboard /></div>
					Dashboard</a
				>
			</li>
			<li class="navbar-li group">
				<a href="/memo/create" class="navbar-link hover:!active">
					<div class="p-4"><Plus /></div>
					Add Memo
				</a>
			</li>
			<li class="navbar-li group">
				<a href="/favourite" class="navbar-link hover:!active">
					<div class="p-4"><Star /></div>
					Favourite
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
