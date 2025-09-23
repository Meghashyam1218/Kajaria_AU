<!-- src/lib/components/Product.svelte -->
<script>
	import { createEventDispatcher } from 'svelte';

	/**
	 * @type {import('./types').Product}
	 * // Define your product type in a types.js or similar for better type safety
	 */
	export let product;

	const dispatch = createEventDispatcher();

	function handleOpenModal() {
		dispatch('openModal', product);
	}
</script>

<button
	on:click={handleOpenModal}
	class="group relative cursor-pointer overflow-hidden rounded-lg border border-gray-200 bg-white text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#204e44]/10"
	aria-label="View details for {product.name}"
>
	{#if product.isNew === 'New'}
		<span
			class="absolute top-3 right-3 z-10 rounded-full bg-[#ffd400] px-3 py-1 text-xs font-bold text-[#204e44] uppercase"
		>
			New!
		</span>
	{/if}
	<div class="h-56 w-full overflow-hidden">
		<img
			src={product.imageUrl}
			alt={product.name}
			class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
			loading="lazy"
		/>
	</div>
	<div class="border-t-[3px] border-[#00c298] p-4">
		<h2 class="truncate text-lg font-bold text-[#204e44]" title={product.name}>
			{product.name}
		</h2>
		<!-- <p class="text-md mt-1 font-semibold text-[#204e44]">{product.price}</p> -->
	</div>
</button>
