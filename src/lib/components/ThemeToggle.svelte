<script lang="ts">
	import { enhance, type SubmitFunction } from '$app/forms';
	import { page } from '$app/stores';
	import Icon from './Icon.svelte';

	const submitUpdateTheme: SubmitFunction = ({ action }) => {
		const theme = action.searchParams.get('theme');

		if (theme) {
			document.documentElement.setAttribute('data-theme', theme);
		}
	};
</script>

<ul class="menu menu-horizontal px-1 z-50">
	<li>
		<button class="p-4 justify-center">
			<Icon name="Palette" />
		</button>
		<ul class="mt-1 sm:mt-0">
			<form method="POST" use:enhance={submitUpdateTheme}>
				<li>
					<button
						class="p-4 bg-secodary justify-center hover:text-secondary-focus"
						formaction="/?/setTheme&theme=bumblebee&redirectTo={$page.url.pathname}"
					>
						<Icon name="Sun" />
					</button>
					<button
						class="p-4 bg-secodary justify-center hover:text-secondary-focus"
						formaction="/?/setTheme&theme=night&redirectTo={$page.url.pathname}"
					>
						<Icon name="MoonStar" />
					</button>
				</li>
			</form>
		</ul>
	</li>
</ul>
