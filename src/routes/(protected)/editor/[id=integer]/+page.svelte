<script lang="ts">
	import { memo_to_edit } from '$lib/schemas'
	import type { PageData } from './$types'
	import { superForm } from 'sveltekit-superforms/client'
	import { scale } from 'svelte/transition'
	import { flip } from 'svelte/animate'
	import { XCircle } from 'lucide-svelte'

	export let data: PageData

	const { form, errors, constraints, message, enhance, capture, restore } = superForm(data.form, {
		taintedMessage: null,
		validators: memo_to_edit,
		dataType: 'json'
	})

	export const snapshot = { capture, restore }

	let err: string | null = null
	let tags_input: HTMLInputElement
	let src_img: string | null = null

	$: src_img = $form.image_url ?? null
</script>

<div class="flex flex-col items-center justify-center mt-5">
	<div
		class="flex flex-col items-stretch justify-stretch max-w-lg w-full min-h-[590px] border-2 border-base-300 bg-base-100 text-base-content shadow-md rounded-lg md:ml-5 mt-5 md:mt-0"
	>
		<div class="flex flex-col p-6 space-y-1">
			<h3 class=" tracking-tight text-2xl">Update Memo</h3>
			<p class="text-sm text-base-content">
				You can modify all the present fields if not satisfied
			</p>
		</div>
		<form method="POST" action="?/updateMemo" use:enhance>
			<input type="hidden" name="id" bind:value={$form.id} />
			<input type="hidden" name="link" bind:value={$form.link} required />
			<div class="p-6 pt-0 grid gap-4">
				{#if src_img}
					<img
						class="rounded-lg w-full"
						style="aspect-ratio: 2"
						src={src_img}
						alt="Preview"
						width="340"
						height="170"
					/>
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
				<button type="submit" class="btn btn-success">Update</button>
			</div>
		</form>
	</div>
	{#if $message}
		<div class="alert alert-error rounded-lg shadow-md mt-2">
			<XCircle />
			<span>{$message}</span>
		</div>
	{/if}
</div>
