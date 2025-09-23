<!-- src/lib/components/ProductModal.svelte -->
<script>
	import { createEventDispatcher, onMount } from 'svelte';
	import { quintOut } from 'svelte/easing';
	import { fade, fly } from 'svelte/transition';

	/**
	 * @type {import('./types').Product}
	 */
	export let product;

	const dispatch = createEventDispatcher();

	function closeModal() {
		dispatch('close');
	}

	// Close modal on 'Escape' key press
	onMount(() => {
		const handleKeydown = (e) => {
			if (e.key === 'Escape') {
				closeModal();
			}
		};

		window.addEventListener('keydown', handleKeydown);

		return () => {
			window.removeEventListener('keydown', handleKeydown);
		};
	});

	/**
	 * Svelte action to detect clicks outside of a node.
	 */
	function clickOutside(node) {
		const handleClick = (event) => {
			if (node && !node.contains(event.target)) {
				// We need to check if the click target still exists in the DOM.
				// This prevents the modal from closing when the element that opened it is removed.
				if (document.body.contains(event.target)) {
					closeModal();
				}
			}
		};
		document.addEventListener('click', handleClick, true);
		return {
			destroy() {
				document.removeEventListener('click', handleClick, true);
			}
		};
	}
</script>

<div
	role="dialog"
	aria-modal="true"
	aria-labelledby="modal-title"
	class="fixed inset-0 z-50 flex items-center justify-center p-4"
>
	<!-- Backdrop -->
	<div
		on:click={closeModal}
		class="absolute inset-0 bg-black/60 backdrop-blur-sm"
		transition:fade={{ duration: 200 }}
	></div>

	<!-- Modal Panel -->
	<div
		class="relative w-full max-w-4xl rounded-lg bg-white shadow-xl"
		use:clickOutside
		transition:fly={{ y: 50, duration: 300, easing: quintOut }}
	>
		<div class="grid md:grid-cols-2">
			<!-- Image -->
			<div
				class="h-64 w-full overflow-hidden rounded-t-lg md:h-full md:rounded-t-none md:rounded-l-lg"
			>
				<img src={product.imageUrl} alt={product.name} class="h-full w-full object-cover" />
			</div>

			<!-- Details -->
			<div class="flex flex-col p-6">
				<div class="flex-1">
					<h2 id="modal-title" class="text-2xl font-bold text-[#204e44]">
						{product.name}
					</h2>
					{#if product.isNew === 'New'}
						<span
							class="mt-2 inline-block rounded-full bg-[#ffd400] px-3 py-1 text-xs font-bold text-[#204e44] uppercase"
						>
							New Arrival
						</span>
					{/if}

					<!-- Dynamic Details -->
					<div class="mt-4 border-t border-gray-200 pt-4">
						<dl class="space-y-2 text-sm">
							{#if product.availability}
								<div class="flex justify-between">
									<dt class="font-medium text-gray-600">Availability</dt>
									<dd class="text-gray-800">{product.availability}</dd>
								</div>
							{/if}
							{#if product.Size}
								<div class="flex justify-between">
									<dt class="font-medium text-gray-600">Size</dt>
									<dd class="text-gray-800">{product.Size}</dd>
								</div>
							{/if}
							{#if product['Product Type']}
								<div class="flex justify-between">
									<dt class="font-medium text-gray-600">Product Type</dt>
									<dd class="text-gray-800">{product['Product Type']}</dd>
								</div>
							{/if}
							{#if product.Finish}
								<div class="flex justify-between">
									<dt class="font-medium text-gray-600">Finish</dt>
									<dd class="text-gray-800">{product.Finish}</dd>
								</div>
							{/if}
							{#if product['Per Carton']}
								<div class="flex justify-between">
									<dt class="font-medium text-gray-600">Coverage</dt>
									<dd class="text-gray-800">{product['Per Carton']}</dd>
								</div>
							{/if}
						</dl>
					</div>
				</div>
				<div class="mt-6">
					<a
						href="/tiles/#"
						class="block w-full rounded-md bg-[#204e44] px-4 py-2 text-center font-semibold text-white shadow-md transition-colors duration-200 hover:bg-[#1a3e36] focus:ring-2 focus:ring-[#ffd400] focus:ring-offset-2 focus:outline-none"
					>
						Contact Sales
					</a>
				</div>
			</div>
		</div>

		<!-- Close Button -->
		<button
			on:click={closeModal}
			class="absolute -top-3 -right-3 flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#204e44] shadow-lg transition-transform hover:scale-110"
			aria-label="Close modal"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-5 w-5"
				viewBox="0 0 20 20"
				fill="currentColor"
			>
				<path
					fill-rule="evenodd"
					d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
					clip-rule="evenodd"
				/>
			</svg>
		</button>
	</div>
</div>
