<script>
	import '../app.css';
	import Footer from './components/footer.svelte';
	import Menu from './components/menu.svelte';

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
