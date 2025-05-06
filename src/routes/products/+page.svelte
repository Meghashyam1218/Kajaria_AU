<script>
	import Product from './components/product.svelte';

	export let data;
	const { extractedData } = data;
	console.log(extractedData);
</script>

<div
	class="products-grid mx-auto grid max-w-[100rem] items-center gap-4 p-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
>
	{#each extractedData as product}
		<Product {product} />
	{/each}
</div>
