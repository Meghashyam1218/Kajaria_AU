<script>
	// Carousel images (replace with your own)
	const images = ['https://www.kajariaceramics.com/assets/images/floortiles.jpg'];
	let current = 0;

	// Service cards
	const services = [
		{
			icon: `<svg class="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="#204e44" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-bath-icon lucide-bath"><path d="M10 4 8 6"/><path d="M17 19v2"/><path d="M2 12h20"/><path d="M7 19v2"/><path d="M9 5 7.621 3.621A2.121 2.121 0 0 0 4 5v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5"/></svg>`,
			title: 'Bathroom Floor Tiles',
			link: '/tiles?room=bathroom'
		},
		{
			icon: `<svg class="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="#204e44" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-cooking-pot-icon lucide-cooking-pot"><path d="M2 12h20"/><path d="M20 12v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8"/><path d="m4 8 16-4"/><path d="m8.86 6.78-.45-1.81a2 2 0 0 1 1.45-2.43l1.94-.48a2 2 0 0 1 2.43 1.46l.45 1.8"/></svg>`,
			title: 'Kitchen Floor Tiles',
			link: '/tiles?room=kitchen'
		},
		{
			icon: `<svg class="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="#204e44" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-house-icon lucide-house"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>`,
			title: 'Living Room Floor Tiles',
			link: '/tiles?room=living'
		},
		{
			icon: `<svg class="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="#204e44" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-bed-double-icon lucide-bed-double"><path d="M2 20v-8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v8"/><path d="M4 10V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4"/><path d="M12 4v6"/><path d="M2 18h20"/></svg>`,
			title: 'Bedroom Floor Tiles',
			link: '/tiles?room=bedroom'
		},
		{
			icon: `<svg class="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="#204e44" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-university-icon lucide-university"><path d="M14 21v-3a2 2 0 0 0-4 0v3"/><path d="M18 12h.01"/><path d="M18 16h.01"/><path d="M22 7a1 1 0 0 0-1-1h-2a2 2 0 0 1-1.143-.359L13.143 2.36a2 2 0 0 0-2.286-.001L6.143 5.64A2 2 0 0 1 5 6H3a1 1 0 0 0-1 1v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2z"/><path d="M6 12h.01"/><path d="M6 16h.01"/><circle cx="12" cy="10" r="2"/></svg>`,
			title: 'Comercial Spaces',
			link: '/tiles?room=comercial'
		},
		{
			icon: `<svg class="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="#204e44" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-tent-icon lucide-tent"><path d="M3.5 21 14 3"/><path d="M20.5 21 10 3"/><path d="M15.5 21 12 15l-3.5 6"/><path d="M2 21h20"/></svg>`,
			title: 'Outdoor Floor Tiles',
			link: '/tiles?room=outdoor'
		}
	];
</script>

<section class=" border-y-3 border-green-700 bg-[#f6f6f6] py-24">
	<div class="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 md:grid-cols-2">
		<!-- Left: Service Cards (order-2 on mobile, order-1 on desktop) -->
		<div class="order-2 grid grid-cols-2 gap-6 md:order-1">
			{#each services as service}
				<div
					class="flex flex-col items-center justify-center rounded-2xl border border-gray-100 bg-white p-6 text-center shadow"
				>
					{@html service.icon}
					<h3 class="mb-2 text-lg font-semibold text-[#204e44]">{service.title}</h3>
					<a
						href={service.link}
						class="font-medium text-[#204e44] underline underline-offset-2 hover:text-[#D1A134]"
						>Explore Now</a
					>
				</div>
			{/each}
		</div>

		<!-- Right: Carousel & Info (order-1 on mobile, order-2 on desktop) -->
		<div class="order-1 flex flex-col items-start md:order-2 md:items-end md:text-right">
			<h4 class="mb-2 text-sm font-bold tracking-wide text-[#204e44]">
				Kajaria Brings to You Luxurious Floor Tiles
			</h4>
			<h2 class="mb-3 text-3xl font-extrabold text-[#204e44] md:text-4xl">
				Explore Our Floor Tiles
			</h2>
			<p class="mb-6 max-w-lg text-base text-gray-700">
				Kajaria's range of luxurious floor tiles integrates technological expertise with exquisite
				designs. Each tile is crafted using ultra-modern technology to ensure high quality.
			</p>

			<div class="mb-4 flex justify-end gap-2">
				{#each images as img, idx}
					{#if idx === current}
						<img src={img} alt="Floor tile" class="rounded-lg object-cover shadow" />
					{/if}
				{/each}
			</div>
			<a
				href="/tiles"
				class="mt-2 inline-block rounded bg-[#204e44] px-6 py-3 font-bold text-white shadow transition hover:bg-[#D1A134]"
				>EXPLORE ALL</a
			>
		</div>
	</div>
</section>
