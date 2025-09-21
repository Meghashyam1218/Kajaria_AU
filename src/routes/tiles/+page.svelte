<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	export let data;
	export let { products } = data;
	export let error = data.error ?? null;

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

	let category = $page.url.searchParams.get('category') ?? '26';
	let finish = $page.url.searchParams.get('finish')?.split(',').filter(Boolean) ?? [];
	let subcategory = $page.url.searchParams.get('subcategory')?.split(',').filter(Boolean) ?? [];

	const handleFilterChange = () => {
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

		window.location = query;
		// goto(query, { keepFocus: true, noScroll: true });
	};

	function toggleArray(arr, value) {
		if (arr.includes(value)) {
			return arr.filter((v) => v !== value);
		} else {
			return [...arr, value];
		}
	}

	/**
	 * Svelte action to detect clicks outside of a node.
	 * Closes the node if it has an 'open' property.
	 */
	function clickOutside(node) {
		const handleClick = (event) => {
			if (node && !node.contains(event.target) && node.open) {
				node.open = false;
			}
		};

		document.addEventListener('click', handleClick, true);

		return {
			destroy() {
				document.removeEventListener('click', handleClick, true);
			}
		};
	}

	// A reference to the category <details> element to close it on selection
	let categoryDetails;
</script>

<main class="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">
	<div class="mb-8 text-center">
		<h1 class="text-4xl font-extrabold tracking-tight text-[#204e44] sm:text-5xl">
			Our Tile Collection
		</h1>
		<p class="mt-4 text-xl text-[#204e44]/80">Find the perfect tile for your next project.</p>
	</div>

	<!-- Filtering Form Section -->
	<section
		aria-labelledby="filter-heading"
		class="mb-8 rounded-lg border border-gray-200 bg-[#204e44]/5 p-6 shadow-sm"
	>
		<h2 id="filter-heading" class="mb-4 text-2xl font-bold text-[#204e44]">Filter Tiles</h2>
		<form
			on:submit|preventDefault={handleFilterChange}
			class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 lg:items-start"
		>
			<!-- Category Dropdown -->
			<div>
				<!-- svelte-ignore a11y_label_has_associated_control -->
				<label class="mb-1 block text-sm font-medium text-[#204e44]">Size (Category)</label>
				<details
					bind:this={categoryDetails}
					use:clickOutside
					class="group relative rounded-md border border-gray-300 bg-white"
				>
					<summary
						class="flex cursor-pointer list-none items-center justify-between p-2 text-sm font-medium text-[#204e44] hover:bg-[#ffd400]/20"
					>
						<span>{categories.label[categories.value.indexOf(category)] ?? 'Select Size'}</span>
						<svg
							class="h-5 w-5 transform text-[#204e44] transition-transform duration-200 group-open:rotate-180"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 20 20"
							fill="currentColor"
						>
							<path
								fill-rule="evenodd"
								d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
								clip-rule="evenodd"
							/>
						</svg>
					</summary>
					<div
						class="absolute z-10 mt-1 w-full rounded-b-md border border-gray-200 bg-white p-4 shadow-lg"
					>
						<div
							class="flex flex-col gap-2"
							on:change={() => {
								if (categoryDetails) categoryDetails.open = false;
							}}
						>
							{#each categories.label as categoryOption, i}
								<label class="flex items-center gap-2">
									<input
										type="radio"
										name="category"
										value={categories.value[i]}
										bind:group={category}
										class="accent-[#204e44]"
									/>
									<span>{categoryOption}</span>
								</label>
							{/each}
						</div>
					</div>
				</details>
			</div>

			<!-- Finish Dropdown -->
			<div>
				<!-- svelte-ignore a11y_label_has_associated_control -->
				<label class="mb-1 block text-sm font-medium text-[#204e44]">Finish</label>
				<details use:clickOutside class="group relative rounded-md border border-gray-300 bg-white">
					<summary
						class="flex cursor-pointer list-none items-center justify-between p-2 text-sm font-medium text-[#204e44] hover:bg-[#ffd400]/20"
					>
						<span>{finish.length > 0 ? `${finish.length} selected` : 'Any Finish'}</span>
						<svg
							class="h-5 w-5 transform text-[#204e44] transition-transform duration-200 group-open:rotate-180"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 20 20"
							fill="currentColor"
						>
							<path
								fill-rule="evenodd"
								d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
								clip-rule="evenodd"
							/>
						</svg>
					</summary>
					<div
						class="absolute z-10 mt-1 w-full rounded-b-md border border-gray-200 bg-white p-4 shadow-lg"
					>
						<div class="flex flex-col gap-2">
							{#each finishings.label as finishOption, i}
								<label class="flex items-center gap-2">
									<input
										type="checkbox"
										value={finishings.value[i]}
										checked={finish.includes(finishings.value[i])}
										on:change={() => (finish = toggleArray(finish, finishings.value[i]))}
										class="accent-[#204e44]"
									/>
									<span>{finishOption}</span>
								</label>
							{/each}
						</div>
					</div>
				</details>
			</div>

			<!-- Subcategories Dropdown -->
			<div>
				<!-- svelte-ignore a11y_label_has_associated_control -->
				<label class="mb-1 block text-sm font-medium text-[#204e44]">Application</label>
				<details use:clickOutside class="group relative rounded-md border border-gray-300 bg-white">
					<summary
						class="flex cursor-pointer list-none items-center justify-between p-2 text-sm font-medium text-[#204e44] hover:bg-[#ffd400]/20"
					>
						<span
							>{subcategory.length > 0 ? `${subcategory.length} selected` : 'Any Application'}</span
						>
						<svg
							class="h-5 w-5 transform text-[#204e44] transition-transform duration-200 group-open:rotate-180"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 20 20"
							fill="currentColor"
						>
							<path
								fill-rule="evenodd"
								d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
								clip-rule="evenodd"
							/>
						</svg>
					</summary>
					<div
						class="absolute z-10 mt-1 w-full rounded-b-md border border-gray-200 bg-white p-4 shadow-lg"
					>
						<div class="flex flex-col gap-2">
							{#each subcategories.label as subcategoryOption, i}
								<label class="flex items-center gap-2">
									<input
										type="checkbox"
										value={subcategories.value[i]}
										checked={subcategory.includes(subcategories.value[i])}
										on:change={() =>
											(subcategory = toggleArray(subcategory, subcategories.value[i]))}
										class="accent-[#204e44]"
									/>
									<span>{subcategoryOption}</span>
								</label>
							{/each}
						</div>
					</div>
				</details>
			</div>

			<!-- Submit Button -->
			<button
				type="submit"
				class="mt-auto w-full rounded-md bg-[#204e44] px-4 py-2 text-base font-semibold text-white shadow-md transition-colors duration-200 hover:bg-[#1a3e36] focus:ring-2 focus:ring-[#ffd400] focus:ring-offset-2 focus:outline-none lg:h-10"
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
					class="h-12 w-12 text-[#204e44]/50"
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
				<p class="mt-4 text-lg font-medium text-[#204e44]">No products match your criteria.</p>
				<p class="text-sm text-[#204e44]/80">Try adjusting your filters.</p>
			</div>
		{:else}
			<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
				{#each products as product (product.name)}
					<div
						class="group relative overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#204e44]/10"
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
							/>
						</div>
						<div class="p-4">
							<h2 class="truncate text-lg font-bold text-[#204e44]" title={product.name}>
								{product.name}
							</h2>
							<p class="text-md mt-1 font-semibold text-[#204e44]">{product.price}</p>
						</div>
					</div>
				{/each}
			</div>
		{/if}
	</section>
</main>
