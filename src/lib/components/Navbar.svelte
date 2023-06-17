<script lang="ts">
	import { Search, Settings2, LayoutDashboard, LineChart, Star } from 'lucide-svelte';
	let screenSize: number;
</script>

<svelte:window bind:innerWidth={screenSize} />

{#if screenSize < 768}
	<nav class="z-40">
		<div class="btm-nav btm-nav-sm">
			<a href="/" class="active"><LayoutDashboard /></a>
			<a href="/search">
				<Search />
			</a>
			<a href="/stats">
				<LineChart />
			</a>
		</div>
	</nav>
{/if}
{#if screenSize >= 768}
	<div class="fixed h-fit left-0 inset-y-0 my-auto">
		<div class="divider px-4 my-0.5 max-w-[72px]" />
		<ul class="menu font-semibold">
			<li class="group py-1 hover:translate-x-1 transition-all">
				<a
					href="/"
					class="active w-[56px] group-hover:w-fit overflow-hidden pl-0 py-0 pr-4 transition-[width]"
					><div class="p-4"><LayoutDashboard /></div>
					Explore</a
				>
			</li>
			<li class="group py-1 hover:translate-x-1 transition-all">
				<a
					href="/stats"
					class="w-[56px] group-hover:w-fit overflow-hidden pl-0 py-0 pr-4 transition-[width]"
				>
					<div class="p-4"><Star /></div>
					Favourite
				</a>
			</li>
			<li class="group py-1 hover:translate-x-1 transition-all">
				<a
					href="/stats"
					class="w-[56px] group-hover:w-fit overflow-hidden pl-0 py-0 pr-4 transition-[width]"
				>
					<div class="p-4"><LineChart /></div>
					Statistics
				</a>
			</li>
			<li class="group py-1 hover:translate-x-1 transition-all">
				<a
					href="/settings"
					class="w-[56px] group-hover:w-fit overflow-hidden pl-0 py-0 pr-4 transition-[width]"
				>
					<div class="p-4"><Settings2 /></div>
					Settings
				</a>
			</li>
		</ul>
		<div class="divider px-4 my-0.5 max-w-[72px]" />
	</div>
{/if}
