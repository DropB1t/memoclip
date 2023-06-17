<script lang="ts">
	import { Flame, ExternalLink, Plus, Boxes, User } from 'lucide-svelte';
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
	class="memo group card indicator bg-base-100 rounded-lg max-w-sm h-[600px] border-2 border-base-300 hover:border-secondary not-prose my-2"
>
	<!-- <div
			class="indicator-item indicator-center badge badge-lg border-2 border-base-300 group-hover:border-primary p-1 py-3"
		>
			<Flame size="18" color="#f87272" />
		</div> -->
	<div class="px-5 pt-5">
		<div class="mb-0.5 link link-hover link-info inline-flex justify-start items-center">
			<User size="18" />
			<span class="text-sm font-medium ml-1">User_123</span>
		</div>
		<figure class="">
			<img
				class="rounded-lg"
				src="https://res.cloudinary.com/practicaldev/image/fetch/s--qByI1v3K--/c_imagga_scale,f_auto,fl_progressive,h_500,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/i/p4sfysev3s1jhw2ar2bi.png"
				alt="Docker + MongoDB"
			/>
		</figure>
	</div>

	<div class="card-body text-base-content p-5">
		<h2
			class="card-title cursor-pointer hover:text-secondary"
			on:click|stopPropagation|self={() => {}}
		>
			How to make your MongoDB container more secure?
		</h2>
		<p class="text-lg">
			Start it with docker The most simple way to get MongoDB instance in your machine is using
			docker to run mongodb image on docker hub as below ...
		</p>
		<div class="py-0.5 flex flex-wrap items-center">
			<div
				class="badge badge-secondary badge-outline hover:text-accent-focus hover:font-semibold cursor-pointer mr-1 mt-2"
			>
				#docker
			</div>
			<div
				class="badge badge-secondary badge-outline hover:text-accent-focus hover:font-semibold cursor-pointer mr-1 mt-2"
			>
				#mongodb
			</div>
			<div
				class="badge badge-secondary badge-outline hover:text-accent-focus hover:font-semibold cursor-pointer mr-1 mt-2"
			>
				#container
			</div>
			<span class="text-secondary">. . .</span>
		</div>

		<div class="divider my-0.5" />
		<div class="card-actions flex justify-start items-center">
			<a
				class="btn btn-sm md:btn-md btn-outline btn-accent"
				href="https://www.dev.to"
				target="_blank"
			>
				<ExternalLink size="16" />
			</a>
			<div class="ml-auto inline-flex items-center">
				<div
					class="px-2 font-mono font-semibold border-l-[1px] border-y-[1px] border-success rounded-s-lg inline-flex justify-around items-center"
				>
					<Boxes size="24" />
					<span class="pl-1">345</span>
				</div>
				<button class="btn btn-sm md:btn-md btn-outline btn-success rounded-s-none md:rounded-lg"
					><Plus size="16" /></button
				>
			</div>
		</div>
	</div>
</div>

<!-- <dialog class="modal" class:modal-open={isModalOpen}>
	<form method="dialog" class="modal-box w-fit rounded-lg p-0 m-2">
		
	</form>
	<form method="dialog" class="modal-backdrop">
		<button on:click={() => (isModalOpen = false)}>close</button>
	</form>
</dialog> -->

<style>
	.memo {
		transition: all 0.1s ease-in;
	}
	.memo:hover {
		transform: scale(1.01);
	}
</style>
