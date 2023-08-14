<script lang="ts">
	import { Search } from 'lucide-svelte'
	import type { PageData } from './$types'

	/* export let data: PageData */
</script>

<div class="flex justify-center items-center">
	<div
		class=" w-full max-w-2xl inline-flex justify-center items-center rounded-lg input input-bordered border-2 focus-within:input-primary"
	>
		<Search />
		<input
			type="search"
			name="search"
			placeholder="Search on Memo"
			class="w-full bg-base-100 text-base-content border-none focus:ring-0"
		/>
	</div>
</div>
