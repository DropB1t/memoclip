<div class="w-80 md:w-96 border-2 bg-base-100 text-base-content shadow-md rounded-lg">
	<div class="p-6 space-y-1">
		<h3 class="font-semibold tracking-tight text-2xl">Login</h3>
	</div>
	<form method="POST">
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
				/>
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
				/>
			</div>
		</div>
		<div class="flex items-center px-6">
			<button class="btn btn-primary">Login</button>
		</div>
	</form>
	<div class="p-6 pt-0 mt-2">
		<h3 class="tracking-tight text-sm text-base-content">
			Don't have an account? <a href="/register" class="link link-hover link-secondary">Sign up</a>
		</h3>
	</div>
</div>
