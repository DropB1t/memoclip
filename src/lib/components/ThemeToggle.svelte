<script lang="ts">
	import type { SubmitFunction } from '../../routes/$types'
	import { enhance } from '$app/forms'
	import { page } from '$app/stores'

	import { Palette, Sun, MoonStar } from 'lucide-svelte'

	const submitUpdateTheme: SubmitFunction = ({ action }) => {
		const theme = action.searchParams.get('theme')

		if (theme) {
			document.documentElement.setAttribute('data-theme', theme)
		}
	}
</script>

<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
<!-- svelte-ignore a11y-label-has-associated-control -->
<div class="dropdown dropdown-hover">
	<label tabindex="0" class="btn btn-ghost p-3 m-1"><Palette /></label>
	<ul tabindex="0" class="dropdown-content menu shadow bg-base-100 rounded-lg">
		<form method="POST" use:enhance={submitUpdateTheme}>
			<li>
				<button
					class="p-3"
					formaction="/?/setTheme&theme=bumblebee&redirectTo={$page.url.pathname +
						$page.url.search}"
				>
					<Sun />
				</button>
			</li>
			<li>
				<button
					class="p-3 mt-1"
					formaction="/?/setTheme&theme=night&redirectTo={$page.url.pathname + $page.url.search}"
				>
					<MoonStar />
				</button>
			</li>
		</form>
	</ul>
</div>
