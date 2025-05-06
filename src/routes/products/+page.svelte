<script>
	import Product from './components/product.svelte';

	export let data;
	const { extractedData } = data;
	console.log(extractedData);
</script>

<div class="products-grid mx-auto grid max-w-[100rem] grid-cols-4 items-center gap-4 p-6">
	{#each extractedData as product}
		<Product {product} />
	{/each}
</div>
