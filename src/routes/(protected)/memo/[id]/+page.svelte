<script lang="ts">
	import type { PageData } from './$types'

	export let data: PageData
	$: ({ memo } = data)
</script>

<h1>
	{memo.title}
</h1>
