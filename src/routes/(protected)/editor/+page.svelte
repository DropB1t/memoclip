<script lang="ts">
	import { memo } from '$lib/schemas'
	import type { MemoExtractor } from '$lib/schemas'
	import type { PageData } from './$types'
	import { superForm } from 'sveltekit-superforms/client'
	import { scale } from 'svelte/transition'
	import { flip } from 'svelte/animate'
	import { XCircle, CornerDownLeft } from 'lucide-svelte'
	import logo from '$lib/assets/logo.png'

	export let data: PageData

	const { form, errors, constraints, message, enhance, capture, restore } = superForm(data.form, {
		taintedMessage: null,
		validators: memo,
		dataType: 'json'
	})

	export const snapshot = { capture, restore }

	let err: string | null = null
	let link_input: HTMLInputElement
	let tags_input: HTMLInputElement
	let exported: boolean = false
	let exporting: boolean = false

	let img_err: boolean = false

	$: exported = $form.link != '' ? true : false

	async function fetchExtractor() {
		const response = await fetch('/editor', {
			method: 'POST',
			body: link_input.value
		})

		const data = await response.json()

		if (response.ok && data) {
			return data
		} else {
			throw new Error('Impossibile to retrieve information form the link')
		}
	}

	function submitExtractor() {
		exporting = true
		fetchExtractor()
			.then((data) => {
				form.set({ ...data })
				exported = true
				err = null
			})
			.catch((error) => {
				err = error.message
				form.set({} as MemoExtractor)
			})
			.finally(() => {
				exporting = false
			})
	}
</script>

<div class="flex flex-col md:flex-row items-start justify-center mt-5">
	<div class="flex flex-col gap-2 max-w-lg w-full">
		<div class="w-full border-2 border-base-300 bg-base-100 text-base-content shadow-md rounded-lg">
			<div class="flex flex-col p-6 space-y-1">
				<h3 class=" tracking-tight text-2xl">Extractor</h3>
				<p class="text-sm text-base-content">Copy paste the link of your material</p>
			</div>
			<div class="p-6 pt-0 grid gap-4">
				<form>
					<div class="form-control w-full">
						<label class="label" for="link">
							<span class="label-text font-medium leading-none">Link</span>
						</label>
						<input
							bind:this={link_input}
							class="input input-bordered input-md input-primary w-full focus:ring-0"
							class:input-error={$errors.link}
							name="link"
							id="link"
							placeholder="https://css-tricks.com/empathetic-animation/"
							type="url"
							bind:value={$form.link}
							required
						/>
						{#if $errors.link}
							<label class="label" for="link">
								<small class="label-text-alt text-error">{$errors.link}</small>
							</label>
						{/if}
					</div>
				</form>
			</div>
			<div class="flex items-center justify-between p-6 pt-0">
				<button class="btn btn-success" on:click={submitExtractor} disabled={exporting}
					>Extract</button
				>
				{#if exported}
					<button
						class="btn btn-secondary"
						on:click|preventDefault={() => {
							exported = false
							form.update((fields) => ({ ...fields, link: '' }))
							link_input.focus()
						}}><CornerDownLeft /></button
					>
				{/if}
			</div>
		</div>
		{#if err}
			<div class="alert alert-error rounded-lg shadow-md mt-2">
				<XCircle />
				<span>{err}</span>
			</div>
		{/if}
		{#if $message}
			<div class="alert alert-error rounded-lg shadow-md mt-2">
				<XCircle />
				<span>{$message}</span>
			</div>
		{/if}
	</div>

	<div
		class="flex flex-col items-stretch justify-stretch max-w-lg w-full min-h-[590px] border-2 border-base-300 bg-base-100 text-base-content shadow-md rounded-lg md:ml-5 mt-5 md:mt-0"
	>
		{#if exporting}
			<div class="my-auto text-center">
				<span class="loading loading-dots text-secondary loading-lg" />
			</div>
		{:else}
			<div class="flex flex-col p-6 space-y-1">
				<h3 class=" tracking-tight text-2xl">Create new Memo</h3>
				<p class="text-sm text-base-content">
					Fill remaining fields or modify them if not satisfied
				</p>
			</div>
			<form method="POST" action="?/createMemo" use:enhance>
				<div class="p-6 pt-0 grid gap-4">
					{#if $form.image_url}
						<img
							class="rounded-lg w-full border-2 border-primary"
							style="aspect-ratio: 2"
							src={$form.image_url}
							alt="Preview"
							width="340"
							height="170"
							on:error={() => {
								form.set({ ...$form, image_url: null })
								img_err = true
							}}
						/>
					{:else}
						<div
							class="artboard-demo artboard-horizontal w-full max-w-[340px] h-[170px] bg-base-200/25 border-2 border-primary rounded-lg mx-auto"
						>
							<img src={logo} alt="MemoClip Logo" width="48" height="48" />
						</div>
						{#if img_err}
							<p class="text-sm text-info">Could not fetch the image from the source</p>
						{/if}
					{/if}
					<div class="form-control w-full">
						<label class="label" for="title">
							<span class="label-text font-medium leading-none">Title</span>
						</label>
						<input
							class="input input-bordered input-md input-primary w-full focus:ring-0"
							class:input-error={$errors.title}
							name="title"
							id="title"
							placeholder="Title..."
							type="text"
							bind:value={$form.title}
							{...$constraints.title}
						/>
						{#if $errors.title}
							<label class="label" for="title">
								<small class="label-text-alt text-error">{$errors.title}</small>
							</label>
						{/if}
					</div>
					<div class="form-control w-full">
						<label class="label" for="description">
							<span class="label-text font-medium leading-none">Description</span>
						</label>
						<textarea
							class="textarea textarea-bordered textarea-md textarea-primary w-full h-40 focus:ring-0"
							class:input-error={$errors.description}
							name="description"
							id="description"
							placeholder="Description..."
							bind:value={$form.description}
							{...$constraints.description}
						/>
						{#if $errors.description}
							<label class="label" for="description">
								<small class="label-text-alt text-error">{$errors.description}</small>
							</label>
						{/if}
					</div>
					<div class="form-control w-full">
						<label class="label" for="description">
							<span class="label-text font-medium leading-none">Tags</span>
						</label>
						<input
							bind:this={tags_input}
							class="input input-bordered input-md input-primary w-full focus:ring-0"
							placeholder="Enter tags"
							on:keydown={(event) => {
								if (event.key === 'Enter') {
									event.preventDefault()

									if (!$form.tags.includes(tags_input.value)) {
										$form.tags = [...$form.tags, tags_input.value.toLowerCase()]
									}

									tags_input.value = ''
								}
							}}
						/>
						{#if $errors.tags && $errors.tags._errors}
							<label class="label" for="description">
								<small class="label-text-alt text-error">{$errors.tags._errors}</small>
							</label>
						{/if}
						<div class="mt-2 inline-flex flex-wrap min-h-8 w-full">
							{#if !err}
								{#each $form.tags as tag, i (tag)}
									<div
										class={$errors.tags?.[i]
											? 'tooltip tooltip-open tooltip-error tooltip-bottom'
											: ''}
										data-tip={$errors.tags?.[i] ? $errors.tags[i] : ''}
										transition:scale|local={{ duration: 200 }}
										animate:flip={{ duration: 200 }}
									>
										<button
											class="badge {$errors.tags?.[i]
												? 'badge-error'
												: 'badge-secondary'}  badge-outline badge-md hover:text-accent-focus hover: m-1"
											on:click|preventDefault={() => {
												$form.tags = [...$form.tags.slice(0, i), ...$form.tags.slice(i + 1)]
											}}
											aria-label="Remove {tag} tag"
										>
											#{tag}
										</button>
									</div>
								{/each}
							{/if}
						</div>
					</div>
				</div>
				<div class="flex items-center p-6 pt-0">
					<button type="submit" class="btn btn-success" disabled={!exported}>Create</button>
				</div>
			</form>
		{/if}
	</div>
</div>
