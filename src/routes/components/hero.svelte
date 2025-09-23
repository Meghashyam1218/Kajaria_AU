<script>
	import { onMount } from 'svelte';
	import Product from './product.svelte';
	import ProductModal from './productModal.svelte';

	// This data will be fetched from the /tiles endpoint
	let products = [];
	onMount(async () => {
		try {
			// Fetching from the /tiles endpoint which should be a server route
			const response = await fetch('/tiles?category=29');
			if (!response.ok) {
				throw new Error('Failed to fetch products');
			}
			const data = await response.json();
			// Assuming the endpoint returns an object with a 'products' key
			// and we only want to show a few featured products.
			products = data.products;
			// console.log('Fetching products from /tiles', products);
		} catch (error) {
			console.error('Error fetching featured products:', error);
			// Optionally handle the error in the UI
		}
	});
	let selectedProduct = null;
</script>

<section class="relative mx-auto max-w-[100rem] overflow-hidden p-4" data-aos="fade-up">
	<!-- Hero Background Image -->
	<div class="absolute inset-0 z-0 m-4 rounded-2xl">
		<img
			src="https://images.unsplash.com/photo-1551554781-c46200ea959d?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dGlsZSUyMHRleHR1cmV8ZW58MHx8MHx8fDA%3D"
			alt="Luxury tiles collection"
			class="h-full w-full rounded-2xl object-cover"
		/>
		<div class="absolute inset-0 rounded-2xl bg-black/50"></div>
		<!-- Dark overlay for text contrast -->
	</div>

	<!-- Hero Content -->
	<div
		class="relative z-10 flex h-[500px] flex-col items-center justify-center text-center text-white"
	>
		<h1 class="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
			Elegance in Every Tile
		</h1>
		<p class="mt-4 max-w-2xl text-lg text-white/90 md:text-xl">
			Discover our exclusive collection of premium tiles, crafted for timeless beauty and
			durability.
		</p>
		<a
			href="/tiles"
			class="mt-8 rounded-full bg-[#D1A134] px-8 py-3 font-semibold text-[#204e44] transition-transform duration-300 hover:scale-105 hover:bg-yellow-500 focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-gray-900 focus:outline-none"
		>
			Explore Collection
		</a>
	</div>
</section>

<!-- Featured Products Section -->
<section class="mx-auto -mt-24 max-w-[100rem] px-8 pb-16">
	<div class="relative z-20 rounded-2xl bg-white/80 p-6 shadow-2xl backdrop-blur-lg">
		<h2 class="mb-6 text-center text-3xl font-bold text-[#204e44]">Featured Products</h2>
		<!-- Wrapper to center the scrolling container -->
		<div class="flex justify-center">
			<!-- Container for horizontal scrolling -->
			<div class="inline-flex max-w-full gap-2 overflow-x-auto pb-4">
				{#if products.length > 0}
					{#each products as product (product.name)}
						<div class="w-64 flex-shrink-0">
							<Product {product} on:openModal={(event) => (selectedProduct = event.detail)} />
						</div>
					{/each}
				{:else}
					<p class="w-full text-center text-gray-500">Loading featured products...</p>
				{/if}
			</div>
		</div>

		<!-- View All Button -->
		<div class="mt-8 flex justify-center">
			<a
				href="/tiles"
				class="rounded-full bg-[#204e44] px-8 py-3 font-semibold text-white transition-transform duration-300 hover:scale-105 hover:bg-[#1a3e36] focus:ring-2 focus:ring-[#D1A134] focus:ring-offset-2 focus:outline-none"
			>
				View All Products
			</a>
		</div>
	</div>
</section>
<!-- Product Detail Modal -->
{#if selectedProduct}
	<ProductModal product={selectedProduct} on:close={() => (selectedProduct = null)} />
{/if}
