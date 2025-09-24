<script>
	import '../app.css';
	import Footer from './components/footer.svelte';
	import Menu from './components/menu.svelte';
	import AOS from 'aos';
	import 'aos/dist/aos.css'; // You can also use <link> for styles
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	// ..
	onMount(() => {
		AOS.init();
	});
	let { children } = $props();
	// State for the floating button
	let showGoToTopButton = $state(false);
	function goToTop() {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}
	function handleScroll() {
		if (window.scrollY > 400) {
			showGoToTopButton = true;
		} else {
			showGoToTopButton = false;
		}
	}
</script>

<svelte:window on:scroll={handleScroll} />

<div class="app">
	<main>
		<Menu />
		<div class="">
			{@render children()}
			<Footer />
		</div>
	</main>
</div>
<!-- Floating "Go to Top" Button -->
{#if showGoToTopButton}
	<button
		onclick={goToTop}
		transition:fade={{ duration: 200 }}
		class="fixed right-8 bottom-8 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#204e44] text-white shadow-lg transition-transform duration-300 hover:scale-110 hover:bg-[#1a3e36] focus:ring-2 focus:ring-[#D1A134] focus:ring-offset-2 focus:outline-none"
		aria-label="Go to top"
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			class="h-6 w-6"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
			stroke-width="2"
		>
			<path stroke-linecap="round" stroke-linejoin="round" d="M5 15l7-7 7 7" />
		</svg>
	</button>
{/if}

<style>
</style>
