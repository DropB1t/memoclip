<script lang="ts">
	import ThemeToggle from './ThemeToggle.svelte';
	import { User, Bell, Search } from 'lucide-svelte';
</script>

<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
<!-- svelte-ignore a11y-label-has-associated-control -->
<!-- svelte-ignore a11y-missing-attribute -->
<div class="sticky top-0 bg-base-200 z-50 pt-5">
	<div class="navbar w-11/12 bg-base-100 border-2 border-base-300 shadow-md rounded-lg mx-auto">
		<div class="navbar-start">
			<a class="text-xl normal-case font-medium link-hover hover:text-secondary m-1" href="/"
				>Memo<span class="text-secondary">Clip</span></a
			>
		</div>
		<div class="navbar-center" />
		<div class="navbar-end">
			<div class="inline-flex justify-end items-center">
				<div
					class="hidden md:inline-flex font-semibold justify-end items-center rounded-lg input input-bordered border-1 focus-within:input-accent w-full max-w-xs px-1 m-1"
				>
					<Search />
					<input
						type="search"
						placeholder="Search on Memo"
						class="bg-base-100 text-base-content border-none focus:ring-0"
					/>
				</div>
				<div class="hidden md:flex divider divider-horizontal py-1 mx-1" />
				<ThemeToggle />
				<button class="btn btn-ghost p-3 m-1">
					<div class="indicator">
						<Bell />
						<span class="badge badge-xs badge-primary indicator-item" />
					</div>
				</button>
				<div class="dropdown dropdown-end">
					<label tabindex="0" class="btn btn-ghost avatar p-3 m-1">
						<div class="rounded-full ring ring-primary ring-offset-base-100 ring-offset-4">
							<User />
						</div>
					</label>
					<ul
						tabindex="0"
						class="mt-3 p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
					>
						<li><a>Profile</a></li>
						<li><a>Settings</a></li>
						<li><a>Logout</a></li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</div>
