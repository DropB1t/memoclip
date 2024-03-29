<script lang="ts">
	import { goto } from '$app/navigation'
	import { page } from '$app/stores'
	import type { Memo } from '$lib/db_types'
	import { Search } from 'lucide-svelte'
	import { createEventDispatcher } from 'svelte'

	const dispatch = createEventDispatcher()

	let focused: boolean = false
	export let value = ''

	let previews: {
		title: string
	}[] = []

	$: if (value.trim() == '') {
		previews = []
		hiLiteIndex = 0
	}

	let timer: NodeJS.Timeout
	const debouncedSearch = () => {
		if (value.trim() != '') {
			clearTimeout(timer)
			previews = [{ title: value }]
			timer = setTimeout(() => {
				search(value)
			}, 200)
		}
	}

	const search = async (q: string) => {
		const { data, error: err } = await $page.data.supabase
			.from('memos')
			.select('title')
			.textSearch('fts', `'${q.trim()}'`)

		if (err) console.dir(err)

		if (data.length > 0) {
			previews = [...previews, ...data]
		}
	}

	let hiLiteIndex = 0

	const setInputVal = (memoTitle: string) => {
		value = memoTitle
		previews = []
		hiLiteIndex = 0
	}

	/* const submitValue = async () => {
		if (value) {
			if ($page.url.pathname !== '/search') {
				goto(`/search/?query=${value}`)
			} else {
				const response = await fetch(`/api/memos/search?query=${value}`)
				const result = await response.json()

				if (response.ok) {
					const fetched_memo: Memo[] = result.memos
					const new_next: string = result.next
					dispatch('searchPerformed', { fetched_memo, new_next, query: value })
				} else {
					throw new Error('Impossibile to retrieve information from the link')
				}
			}
		}
	} */

	const navigateList = (e: KeyboardEvent) => {
		if (!focused) return
		if (e.key === 'ArrowDown' && hiLiteIndex <= previews.length - 1) {
			if (hiLiteIndex == previews.length - 1) hiLiteIndex = 0
			else hiLiteIndex === null ? (hiLiteIndex = 0) : (hiLiteIndex += 1)
		} else if (e.key === 'ArrowUp' && hiLiteIndex !== null) {
			hiLiteIndex === 0 ? (hiLiteIndex = previews.length - 1) : (hiLiteIndex -= 1)
		} else if (e.key === 'Enter' && previews.length != 0) {
			setInputVal(previews[hiLiteIndex].title)
		} else {
			return
		}
	}
</script>

<svelte:window on:keydown={navigateList} />

<div class="flex flex-col justify-center items-center w-full">
	<form
		action="/search"
		class="w-full max-w-2xl inline-flex justify-center items-center rounded-lg input input-bordered border-2 focus-within:input-primary"
		autocomplete="off"
	>
		<button
			type="submit"
			name="search"
			id="search"
			aria-label="Search Button"
			class="hover:scale-95"
		>
			<Search />
		</button>

		<input
			on:focus={() => {
				focused = true
			}}
			on:blur={() => {
				focused = false
			}}
			bind:value
			on:input={debouncedSearch}
			type="text"
			name="query"
			placeholder="Search on Memo"
			class="w-full bg-base-100 text-base-content border-none focus:ring-0"
		/>
	</form>

	{#if previews.length > 0 && focused}
		<ul
			class="bg-base-100 w-full max-w-2xl mt-2 rounded-lg z-[99] border-2 border-primary"
			class:float-prev={$page.url.pathname !== '/search'}
		>
			{#each previews as preview, i}
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<li
					class="py-2 line-clamp-1 px-4 text-lg border-b-2 last:border-b-0 hover:cursor-pointer hover:text-accent-focus"
					class:active-prev={i === hiLiteIndex}
					on:mousedown={() => {
						goto(`/search/?query=${preview.title}`)
					}}
				>
					{preview.title}
				</li>
			{/each}
		</ul>
	{/if}
</div>

<style lang="postcss">
	.active-prev {
		@apply text-accent-focus bg-base-200/40;
	}
	.float-prev {
		@apply absolute top-20;
	}
</style>
