<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	export let data;
	export let { products } = data;
	export let error = data.error ?? null; // Get error from load function data if it exists

	// --- Filter options ---
	const categories = {
		label: ['300x600', '600x600', '600x1200', '800x1600', '200x1200'],
		value: ['26', '27', '28', '29', '30']
	};

	const finishings = {
		label: [
			'Premium Polished',
			'Marbletech',
			'Polished',
			'Super White',
			'Premium Matt',
			'Matt',
			'Elevation'
		],
		value: ['56', '57', '58', '59', '60', '61', '62']
	};
	const subcategories = { label: ['Floor Tiles', 'Wall Tiles'], value: ['49', '50'] };

	// --- Component State ---
	// Get initial values from URL search params. This is the correct SvelteKit way.
	let category = $page.url.searchParams.get('category') ?? '26';
	let finish = $page.url.searchParams.get('finish')?.split(',').filter(Boolean) ?? [];
	let subcategory = $page.url.searchParams.get('subcategory')?.split(',').filter(Boolean) ?? [];

	// --- Functions ---
	const handleFilterChange = () => {
		// Construct the search parameters
		const params = new URLSearchParams();

		if (category) {
			params.set('category', category);
		}
		if (finish.length > 0) {
			params.set('finish', finish.join(','));
		}
		if (subcategory.length > 0) {
			params.set('subcategory', subcategory.join(','));
		}

		const query = `/tiles?${params.toString()}`;
		console.log('Navigating to: ' + query);

		// Use SvelteKit's goto for client-side navigation.
		// It's much faster than a full page reload.
		window.location = query;
		// goto(query, { keepFocus: true, noScroll: true });
	};
</script>

<main class="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">
	<div class="mb-8 text-center">
		<h1 class="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
			Our Tile Collection
		</h1>
		<p class="mt-4 text-xl text-gray-600">Find the perfect tile for your next project.</p>
	</div>

	<!-- Filtering Form Section -->
	<section
		aria-labelledby="filter-heading"
		class="mb-8 rounded-lg border border-gray-200 bg-gray-50 p-6 shadow-sm"
	>
		<h2 id="filter-heading" class="mb-4 text-2xl font-bold text-gray-800">Filter Tiles</h2>
		<form
			on:submit|preventDefault={handleFilterChange}
			class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 lg:items-end"
		>
			<!-- Category Select -->
			<div class="flex flex-col">
				<label for="category-select" class="mb-1 text-sm font-medium text-gray-700"
					>Size (Category)</label
				>
				<select
					id="category-select"
					bind:value={category}
					class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
				>
					{#each categories.label as categoryOption, i}
						<option value={categories.value[i]}>{categoryOption}</option>
					{/each}
				</select>
			</div>

			<!-- Finish Select -->
			<div class="flex flex-col">
				<label for="finish-select" class="mb-1 text-sm font-medium text-gray-700">Finish</label>
				<select
					id="finish-select"
					bind:value={finish}
					multiple
					class="h-24 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
				>
					{#each finishings.label as finishOption, i}
						<option value={finishings.value[i]}>{finishOption}</option>
					{/each}
				</select>
			</div>

			<!-- Subcategories Select -->
			<div class="flex flex-col">
				<label for="subcategory-select" class="mb-1 text-sm font-medium text-gray-700"
					>Application</label
				>
				<select
					id="subcategory-select"
					bind:value={subcategory}
					multiple
					class="h-24 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
				>
					{#each subcategories.label as subcategoryOption, i}
						<option value={subcategories.value[i]}>{subcategoryOption}</option>
					{/each}
				</select>
			</div>

			<!-- Submit Button -->
			<button
				type="submit"
				class="w-full rounded-md bg-blue-600 px-4 py-2 text-base font-semibold text-white shadow-md transition-colors duration-200 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none lg:h-10"
			>
				Apply Filters
			</button>
		</form>
	</section>

	<!-- Products Grid Section -->
	<section>
		{#if error}
			<div class="rounded-md border border-red-400 bg-red-100 p-6 text-center text-red-700">
				<p class="font-semibold">An error occurred:</p>
				<p>{error}</p>
			</div>
		{:else if products.length === 0}
			<div
				class="flex h-64 flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-12 w-12 text-gray-400"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					stroke-width="2"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
					/>
				</svg>
				<p class="mt-4 text-lg font-medium text-gray-600">No products match your criteria.</p>
				<p class="text-sm text-gray-500">Try adjusting your filters.</p>
			</div>
		{:else}
			<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
				{#each products as product (product.name)}
					<!-- Using a key is good practice for lists -->
					<div
						class="group relative overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
					>
						{#if product.isNew}
							<span
								class="absolute top-3 right-3 z-10 rounded-full bg-green-500 px-3 py-1 text-xs font-bold text-white uppercase"
							>
								New!
							</span>
						{/if}
						<div class="h-56 w-full overflow-hidden">
							<img
								src={product.imageUrl}
								alt={product.name}
								class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
							/>
						</div>
						<div class="p-4">
							<h2 class="truncate text-lg font-bold text-gray-800" title={product.name}>
								{product.name}
							</h2>
							<p class="text-md mt-1 font-semibold text-gray-600">{product.price}</p>
						</div>
					</div>
				{/each}
			</div>
		{/if}
	</section>
</main>
