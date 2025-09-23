<script>
	import { page } from '$app/stores';
	import { fly } from 'svelte/transition';
	let isOpen = false;

	// Close the mobile menu on navigation
	$: if ($page.url) {
		isOpen = false;
	}
</script>

<header>
	<!-- Desktop Floating Navbar -->
	<nav
		class="ring-opacity-5 fixed top-4 left-1/2 z-50 hidden w-[95%] max-w-5xl -translate-x-1/2 rounded-full bg-white/80 shadow-lg ring-1 ring-black backdrop-blur-md md:block"
	>
		<div class="mx-auto px-8">
			<div class="flex h-16 items-center justify-between">
				<!-- Logo -->
				<div class="flex-shrink-0">
					<a href="/"><img class="max-h-12" src="./logo.png" alt="Logo" /></a>
				</div>

				<!-- Desktop Menu Links -->
				<div class="flex items-center space-x-6">
					<a
						href="/"
						class="font-semibold transition-colors duration-300 {$page.url.pathname === '/'
							? 'text-[#D1A134]'
							: 'text-[#204e44] hover:text-[#1a3e36]'}"
					>
						Home
					</a>
					<a
						href="/about-us"
						class="font-semibold transition-colors duration-300 {$page.url.pathname === '/about-us'
							? 'text-[#D1A134]'
							: 'text-[#204e44] hover:text-[#1a3e36]'}"
					>
						About Us
					</a>
					<a
						href="/tiles"
						class="font-semibold transition-colors duration-300 {$page.url.pathname.startsWith(
							'/tiles'
						)
							? 'text-[#D1A134]'
							: 'text-[#204e44] hover:text-[#1a3e36]'}"
					>
						Products
					</a>
					<a
						href="/e-catalogue"
						class="font-semibold transition-colors duration-300 {$page.url.pathname ===
						'/e-catalogue'
							? 'text-[#D1A134]'
							: 'text-[#204e44] hover:text-[#1a3e36]'}"
					>
						E-Catalogue
					</a>
					<a
						href="/contact-us"
						class="rounded-full bg-[#204e44] px-4 py-2 font-semibold text-white transition-colors duration-300 hover:bg-[#1a3e36] focus:ring-2 focus:ring-[#D1A134] focus:ring-offset-2 focus:outline-none"
					>
						Contact Us
					</a>
				</div>
			</div>
		</div>
	</nav>

	<!-- Mobile Top Bar -->
	<nav class="sticky top-0 z-40 bg-white/80 shadow-md backdrop-blur-md md:hidden">
		<div class="mx-auto flex h-20 items-center justify-between px-4 sm:px-6">
			<!-- Logo -->
			<div class="flex-shrink-0">
				<a href="/"><img class="max-h-16" src="./logo.png" alt="Logo" /></a>
			</div>
			<!-- Mobile Menu Button -->
			<div>
				<button
					aria-label="menu-toggle"
					class="text-[#204e44] focus:outline-none"
					on:click={() => (isOpen = !isOpen)}
				>
					<svg
						class="h-8 w-8"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 6h16M4 12h16m-7 6h7"
						/>
					</svg>
				</button>
			</div>
		</div>
	</nav>
</header>

<!-- Mobile Slide-out Menu -->
{#if isOpen}
	<!-- Backdrop -->
	<div
		on:click={() => (isOpen = false)}
		class="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
	></div>

	<!-- Menu Panel -->
	<div
		class="fixed top-0 right-0 z-50 h-full w-72 bg-white shadow-2xl md:hidden"
		transition:fly={{ x: '100%', duration: 300 }}
	>
		<div class="flex h-20 items-center justify-between border-b px-4">
			<span class="font-bold text-[#204e44]">Menu</span>
			<button
				aria-label="close-menu"
				class="text-[#204e44] focus:outline-none"
				on:click={() => (isOpen = false)}
			>
				<svg
					class="h-8 w-8"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M6 18L18 6M6 6l12 12"
					/>
				</svg>
			</button>
		</div>
		<div class="flex flex-col space-y-1 p-4">
			<a
				href="/"
				class="block rounded-md px-4 py-3 text-base font-semibold {$page.url.pathname === '/'
					? 'bg-[#D1A134]/50 text-[#1a3e36]'
					: 'text-[#204e44] hover:bg-[#D1A134]/20'}"
			>
				Home
			</a>
			<a
				href="/about-us"
				class="block rounded-md px-4 py-3 text-base font-semibold {$page.url.pathname ===
				'/about-us'
					? 'bg-[#D1A134]/50 text-[#1a3e36]'
					: 'text-[#204e44] hover:bg-[#D1A134]/20'}"
			>
				About Us
			</a>
			<a
				href="/tiles"
				class="block rounded-md px-4 py-3 text-base font-semibold {$page.url.pathname.startsWith(
					'/tiles'
				)
					? 'bg-[#D1A134]/50 text-[#1a3e36]'
					: 'text-[#204e44] hover:bg-[#D1A134]/20'}"
			>
				Products
			</a>
			<a
				href="/e-catalogue"
				class="block rounded-md px-4 py-3 text-base font-semibold {$page.url.pathname ===
				'/e-catalogue'
					? 'bg-[#D1A134]/50 text-[#1a3e36]'
					: 'text-[#204e44] hover:bg-[#D1A134]/20'}"
			>
				E-Catalogue
			</a>
			<a
				href="/contact-us"
				class="block rounded-md px-4 py-3 text-base font-semibold {$page.url.pathname ===
				'/contact-us'
					? 'bg-[#D1A134]/50 text-[#1a3e36]'
					: 'text-[#204e44] hover:bg-[#D1A134]/20'}"
			>
				Contact Us
			</a>
		</div>
	</div>
{/if}
