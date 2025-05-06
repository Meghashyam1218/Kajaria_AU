<script>
	import '../app.css';
	import Menu from './components/menu.svelte';

	let { children } = $props();
</script>

<div class="app">
	<main>
		<Menu />
		{@render children()}
	</main>
</div>
