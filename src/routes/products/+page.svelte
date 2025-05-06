<script>
	import Product from './components/product.svelte';

	export let data;
	const { extractedData } = data;
	// console.log(extractedData);
	import { fetchProducts } from '../../utils/fetchProducts.js';

	let products = extractedData;
	let error = null;
	var i = 1;
	var loadMore = true;
	const loadProducts = async (i) => {
		try {
			const response = await fetchProducts(i, fetch);
			// console.log(`response is ${response}`);
			if (response == '') {
				loadMore = false;
			}
			products = [...products, ...response];
			console.log(products);
		} catch (err) {
			error = err.message;
		}
	};
</script>

<div class="mx-auto flex max-w-[100rem] flex-col items-center p-6">
	<div
		class="products-grid mx-auto grid items-center gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
	>
		{#each products as product}
			<Product {product} />
		{/each}
	</div>
	{#if loadMore}
		<button
			on:click={() => {
				loadProducts(i++);
			}}
			type="button"
			class="mt-8 max-w-[150px] cursor-pointer rounded-md bg-zinc-200 px-4 py-2 text-xl font-semibold"
			>Load More</button
		>
	{/if}
</div>
