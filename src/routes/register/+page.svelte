<script lang="ts">
	import type { PageData } from './$types'
	import { superForm } from 'sveltekit-superforms/client'
	import { XCircle } from 'lucide-svelte'
	import { user } from '$lib/schemas'

	export let data: PageData

	const { form, errors, constraints, message, enhance, capture, restore } = superForm(data.form, {
		taintedMessage: null,
		validators: user
	})

	export const snapshot = { capture, restore }
</script>

<div class="flex flex-col items-center justify-center [&amp;>div]:w-full">
	<div class="w-80 md:w-96 border-2 bg-base-100 text-base-content shadow-md rounded-lg">
		<div class="flex flex-col p-6 space-y-1">
			<h3 class="font-semibold tracking-tight text-2xl">Create an account</h3>
			<p class="text-sm text-base-content">Enter your email below to create your account</p>
		</div>
		<form method="POST" use:enhance>
			<div class="p-6 pt-0 grid gap-4">
				<div class="form-control w-full max-w-xs">
					<label class="label" for="email">
						<span class="label-text font-medium leading-none">Email</span>
					</label>
					<input
						class="input input-bordered input-md input-primary w-full max-w-xs focus:ring-0"
						name="email"
						id="email"
						placeholder="m@example.com"
						type="email"
						bind:value={$form.email}
						{...$constraints.email}
					/>
					{#if $errors.email}
						<label class="label" for="email">
							<small class="label-text-alt text-error">{$errors.email}</small>
						</label>
					{/if}
				</div>
				<div class="form-control w-full max-w-xs">
					<label class="label" for="username">
						<span class="label-text font-medium leading-none">Username</span>
					</label>
					<input
						class="input input-bordered input-md input-primary w-full max-w-xs focus:ring-0"
						name="username"
						id="username"
						type="text"
						bind:value={$form.username}
						{...$constraints.username}
					/>
					{#if $errors.username}
						<label class="label" for="username">
							<small class="label-text-alt text-error">{$errors.username}</small>
						</label>
					{/if}
				</div>
				<div class="inline-flex gap-2">
					<div class="form-control w-full max-w-xs">
						<label class="label" for="firstName">
							<span class="label-text font-medium leading-none">First name</span>
						</label>
						<input
							class="input input-bordered input-md input-primary w-full max-w-xs focus:ring-0"
							name="firstName"
							id="firstName"
							type="text"
							bind:value={$form.firstName}
							{...$constraints.firstName}
						/>
						{#if $errors.firstName}
							<label class="label" for="firstName">
								<small class="label-text-alt text-error">{$errors.firstName}</small>
							</label>
						{/if}
					</div>
					<div class="form-control w-full max-w-xs">
						<label class="label" for="lastName">
							<span class="label-text font-medium leading-none">Last name</span>
						</label>
						<input
							class="input input-bordered input-md input-primary w-full max-w-xs focus:ring-0"
							name="lastName"
							id="lastName"
							type="text"
							bind:value={$form.lastName}
							{...$constraints.lastName}
						/>
						{#if $errors.lastName}
							<label class="label" for="lastName">
								<small class="label-text-alt text-error">{$errors.lastName}</small>
							</label>
						{/if}
					</div>
				</div>

				<div class="form-control w-full max-w-xs">
					<label class="label" for="password">
						<span class="label-text font-medium leading-none">Password</span>
					</label>
					<input
						class="input input-bordered input-md input-primary w-full max-w-xs focus:ring-0"
						name="password"
						id="password"
						type="password"
						bind:value={$form.password}
						{...$constraints.password}
					/>
					{#if $errors.password}
						<label class="label" for="lastName">
							<small class="label-text-alt text-error">{$errors.password}</small>
						</label>
					{/if}
				</div>
			</div>
			<div class="flex items-center p-6 pt-0">
				<button class="btn btn-primary">Create account</button>
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
