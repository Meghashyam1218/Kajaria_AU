<script>
	import { onMount, onDestroy } from 'svelte';
	import Product from './product.svelte';
	import ProductModal from './productModal.svelte';

	// Carousel slides data
	const slides = [
		{
			image:
				'https://images.unsplash.com/photo-1532901074349-dc9d1505589c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
			headline: 'Elegance in Every Tile',
			subtext:
				'Discover our exclusive collection of premium tiles, crafted for timeless beauty and durability.',
			button: { text: 'Explore Collection', href: '/tiles' }
		},
		{
			image:
				'https://plus.unsplash.com/premium_photo-1670914333285-3ee458dce314?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
			headline: 'Luxury Meets Durability',
			subtext:
				'Transform your space with tiles that blend style and strength for lasting impressions.',
			button: { text: 'View Tiles', href: '/tiles' }
		},
		{
			image:
				'https://images.unsplash.com/photo-1548967199-79324abbe7dc?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
			headline: 'Inspired by Nature',
			subtext:
				'Choose from a range of textures and colors inspired by the world’s finest materials.',
			button: { text: 'See Inspiration', href: '/about-us' }
		}
	];

	let current = 0;
	let timer;
	const interval = 10000;

	function next() {
		current = (current + 1) % slides.length;
	}
	function prev() {
		current = (current - 1 + slides.length) % slides.length;
	}
	function goTo(idx) {
		current = idx;
	}

	function startTimer() {
		timer = setInterval(next, interval);
	}
	function stopTimer() {
		clearInterval(timer);
	}

	onMount(() => {
		startTimer();
		return stopTimer;
	});
	onDestroy(stopTimer);

	// Featured products logic (unchanged)
	let products = [];
	let isLoading = true;
	onMount(async () => {
		try {
			const response = await fetch('/tiles?category=29');
			if (!response.ok) throw new Error('Failed to fetch products');
			const data = await response.json();
			products = data.products;
		} catch (error) {
			console.error('Error fetching featured products:', error);
		} finally {
			isLoading = false;
		}
	});
	let selectedProduct = null;
</script>

<section class="relative overflow-hidden" data-aos="fade-up">
	<!-- Carousel Slide -->
	{#each slides as slide, idx}
		{#if idx === current}
			<div class="absolute inset-0 z-0 transition-all duration-700">
				<img src={slide.image} alt={slide.headline} class="h-full w-full object-cover" />
				<div class="absolute inset-0 bg-black/50"></div>
			</div>
			<div
				class="relative z-10 flex min-h-[90vh] flex-col items-center justify-center p-4 text-center text-white"
			>
				<div class="mb-20">
					<h1 class="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
						{slide.headline}
					</h1>
					<p class="mt-4 max-w-2xl text-lg text-white/90 md:text-xl">{slide.subtext}</p>
					<a
						href={slide.button.href}
						class="mt-8 inline-block rounded-full bg-[#D1A134] px-8 py-3 font-semibold text-[#204e44] transition-transform duration-300 hover:scale-105 hover:bg-yellow-500 focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-gray-900 focus:outline-none"
					>
						{slide.button.text}
					</a>
				</div>
				<!-- Carousel Controls -->
				<div class="absolute right-0 bottom-10 left-0 flex items-center justify-between px-8">
					<button
						aria-label="Previous slide"
						class="rounded-full bg-[#204e44]/80 p-3 text-white shadow-lg hover:bg-[#204e44]"
						on:click={() => {
							stopTimer();
							prev();
							startTimer();
						}}
					>
						<svg
							class="h-6 w-6"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							viewBox="0 0 24 24"
							><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" /></svg
						>
					</button>
					<button
						aria-label="Next slide"
						class="rounded-full bg-[#204e44]/80 p-3 text-white shadow-lg hover:bg-[#204e44]"
						on:click={() => {
							stopTimer();
							next();
							startTimer();
						}}
					>
						<svg
							class="h-6 w-6"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							viewBox="0 0 24 24"
							><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" /></svg
						>
					</button>
				</div>
				<!-- Slide Indicators -->
				<div class="absolute right-0 bottom-4 left-0 flex justify-center gap-2">
					{#each slides as _, i}
						<button
							aria-label={`Go to slide ${i + 1}`}
							class="h-3 w-3 rounded-full border-2 border-[#D1A134] transition-all duration-300"
							style="background:{i === current ? '#D1A134' : 'transparent'}"
							on:click={() => {
								stopTimer();
								goTo(i);
								startTimer();
							}}
						></button>
					{/each}
				</div>
			</div>
		{/if}
	{/each}
</section>

<!-- Featured Products Section -->
<section class="relative z-20 border-b-3 border-green-700 bg-yellow-50/10 px-8 py-16">
	<div class="mx-auto max-w-[100rem] rounded-2xl bg-white/80 p-6 shadow-2xl backdrop-blur-lg">
		<h2 class="mb-6 text-center text-3xl font-bold text-[#204e44]">Featured Products</h2>
		<!-- Wrapper to center the scrolling container -->
		<div class="flex justify-center">
			<!-- Container for horizontal scrolling -->
			<div class="inline-flex max-w-full gap-2 overflow-x-auto pb-4">
				{#if isLoading}
					<!-- PENDING STATE: Show skeleton loaders -->
					{#each Array(5) as _}
						<div class="w-64 flex-shrink-0">
							<div
								class="group relative overflow-hidden rounded-lg border border-gray-200 bg-white"
							>
								<div class="h-56 w-full animate-pulse bg-gray-200"></div>
								<div class="p-4">
									<div class="h-6 w-3/4 animate-pulse rounded bg-gray-200"></div>
									<div class="mt-2 h-4 w-1/2 animate-pulse rounded bg-gray-200"></div>
								</div>
							</div>
						</div>
					{/each}
				{:else if products.length > 0}
					<!-- RESOLVED STATE: Show the actual products -->
					{#each products as product (product.name)}
						<div class="w-64 flex-shrink-0">
							<Product {product} on:openModal={(event) => (selectedProduct = event.detail)} />
						</div>
					{/each}
				{:else}
					<!-- EMPTY STATE: If fetch completes but finds no products -->
					<p class="w-full text-center text-gray-500">No featured products available.</p>
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
