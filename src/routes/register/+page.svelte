<div class="flex items-center justify-center [&amp;>div]:w-full">
	<div class="w-80 md:w-96 border-2 bg-base-100 text-base-content shadow-md rounded-lg">
		<div class="flex flex-col p-6 space-y-1">
			<h3 class="font-semibold tracking-tight text-2xl">Create an account</h3>
			<p class="text-sm text-base-content">Enter your email below to create your account</p>
		</div>
		<form action="?/register" method="POST">
			<div class="p-6 pt-0 grid gap-4">
				<!-- <div class="grid grid-cols-2 gap-6">
					<button
						class="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none border border-input hover:bg-accent hover:text-accent-focus h-10 py-2 px-4"
						>Github</button
					><button
						class="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none border border-input hover:bg-accent hover:text-accent-focus h-10 py-2 px-4"
						>Google</button
					>
				</div>
				<div class="relative">
					<div class="absolute inset-0 flex items-center"><span class="w-full border-t" /></div>
					<div class="relative flex justify-center text-xs uppercase">
						<span class="bg-background px-2 text-muted-foreground">Or continue with</span>
					</div>
				</div> -->
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
			<div class="flex items-center p-6 pt-0">
				<button class="btn btn-primary">Create account</button>
			</div>
		</form>
	</div>
</div>
