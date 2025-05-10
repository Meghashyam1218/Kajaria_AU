<script>
	import Product from '../products/components/product.svelte';

	let products = [
		{
			imgLink: 'https://www.kajariaceramics.com/product-picture/small/GP03869_b.jpg',
			title: 'Neppo Grey',
			description: 'Polish',
			size: '80x160 cm'
		},
		{
			imgLink: 'https://www.kajariaceramics.com/product-picture/small/GP03874_b.jpg',
			title: 'Satuario Alfa',
			description: 'Polish',
			size: '80x160 cm'
		},

		{
			imgLink: 'https://www.kajariaceramics.com/product-picture/small/GP03871_b.jpg',
			title: 'Onyx Carmo',
			description: 'Polish',
			size: '80x160 cm'
		},

		{
			imgLink: 'https://www.kajariaceramics.com/product-picture/small/GP03872_b.jpg',
			title: 'Pulpis Gris',
			description: 'Polish',
			size: '80x160 cm'
		}
	];
</script>

<div class="hero m-4">
	<div class="hero-content mx-auto max-w-[100rem] overflow-hidden">
		<img
			src="./sale.jpg"
			alt="sale of the year"
			class="max-h-[600px] w-full rounded-2xl object-cover"
		/>
		<div class="products flex min-w-md justify-between overflow-x-auto overflow-y-hidden">
			{#each products as product}
				<Product {product} />
			{/each}
		</div>
		<a
			href="/products"
			class="my-4 flex cursor-pointer items-center justify-center rounded-2xl bg-zinc-100 p-4 font-semibold text-zinc-700 hover:font-bold"
		>
			<p class="mr-2 text-xl md:text-2xl">Explore All Products</p>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				height="24px"
				viewBox="0 -960 960 960"
				width="24px"
				fill="#3f3f46"
				><path d="M592-417H126v-126h466L390-745l90-89 354 354-354 354-90-89 202-202Z" /></svg
			>
		</a>
	</div>
</div>
