<script>
	import '../app.css';
	import Footer from './components/footer.svelte';
	import Menu from './components/menu.svelte';
	import AOS from 'aos';
	import 'aos/dist/aos.css'; // You can also use <link> for styles
	import { onMount } from 'svelte';
	// ..
	onMount(() => {
		AOS.init();
	});
	let { children } = $props();
</script>

<div class="app">
	<main>
		<Menu />
		<div class="md:mt-22">
			{@render children()}
			<Footer />
		</div>
	</main>
</div>

<style>
</style>
