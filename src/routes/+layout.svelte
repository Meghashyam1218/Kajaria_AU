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
		{@render children()}
		<Footer />
	</main>
</div>

<style>
</style>
