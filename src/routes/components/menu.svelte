<script>
	let isOpen = false;
</script>

<nav class="sticky top-0 z-10 bg-white/80 backdrop-blur-md">
	<div class="mx-auto max-w-[100rem] px-4 sm:px-6">
		<div class="flex h-18 items-center justify-between">
			<!-- Logo -->
			<div class="">
				<a href="/"><img class="max-h-14" src="./logo.png" alt="Logo" /></a>
			</div>

			<!-- Desktop Menu -->
			<div class="hidden space-x-8 font-semibold md:flex">
				<a
					data-sveltekit-preload-data="hover"
					href="/about-us"
					class="text-gray-950 hover:text-gray-800">About Us</a
				>
				<a
					data-sveltekit-preload-data="hover"
					href="/products"
					class="text-gray-950 hover:text-gray-800">Products</a
				>
				<a
					data-sveltekit-preload-data="hover"
					href="/e-catalogue"
					class="text-gray-950 hover:text-gray-800">E-Catalogue</a
				>
				<a
					data-sveltekit-preload-data="hover"
					href="/contact-us"
					class="text-gray-950 hover:text-gray-800">Contact Us</a
				>
			</div>

			<!-- Mobile Menu Button -->
			<div class="md:hidden">
				<button
					aria-label="menu-toggle"
					class="text-gray-950 hover:text-gray-800 focus:outline-none"
					on:click={() => (isOpen = !isOpen)}
				>
					<svg
						class="h-6 w-6"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
						/>
					</svg>
				</button>
			</div>
		</div>
	</div>

	<!-- Mobile Menu -->
	{#if isOpen}
		<div class="bg-white shadow-md md:hidden">
			<a
				data-sveltekit-preload-data="tap"
				href="/about-us"
				class="block px-4 py-2 text-gray-950 hover:bg-gray-100">About Us</a
			>
			<a
				data-sveltekit-preload-data="tap"
				href="/products"
				class="block px-4 py-2 text-gray-950 hover:bg-gray-100">Products</a
			>
			<a
				data-sveltekit-preload-data="tap"
				href="/e-catalogue"
				class="block px-4 py-2 text-gray-950 hover:bg-gray-100">E-Catalogue</a
			>
			<a
				data-sveltekit-preload-data="tap"
				href="/contact-us"
				class="block px-4 py-2 text-gray-950 hover:bg-gray-100">Contact Us</a
			>
		</div>
	{/if}
</nav>
