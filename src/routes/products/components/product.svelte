<script>
	let { product } = $props();
</script>

<div
	class="product-card flex cursor-pointer flex-col rounded-xl p-4 transition-all ease-in hover:scale-110"
>
	<img
		class="h-[200px] w-[350px] rounded-2xl object-cover"
		src={product.imgLink}
		alt={product.title}
	/>
	<h2 class="product-name mt-1 text-xl font-bold text-emerald-800">{product.title}</h2>
	<p class="product-price mt-1 font-medium text-zinc-700">Finish : {product.description}</p>
	<p class="product-price text-zinc-500">{product.size}</p>
</div>
