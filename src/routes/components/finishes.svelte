<script>
	// List of finishes
	const finishes = [
		{
			name: 'Polished',
			image: 'https://www.kajariaceramics.com/assets/images/polished.jpg',
			desc: 'A spectacular mirror like effect is what you get in this superior finish. The highly polished look is achieved with a thicker coat of glaze, enhancing image sharpness and giving you a rich and true color experience.'
		},
		{
			name: 'Gloss Matt',
			image: 'https://www.kajariaceramics.com/assets/images/rustic.jpg',
			desc: 'With a unique gloss and matt finish, Glossmatt is amongst the first technical body slabs to carry a dual effect. Some areas appear rough, while others look shiny and smooth, which can not only be seen, but also be touched and felt by hand.'
		},
		{
			name: 'Carving',
			image: 'https://www.kajariaceramics.com/assets/images/carving.jpg',
			desc: 'Carving finish gives crevices and grains across the surface of the slab, which can only be found in natural marbles and wood. You can touch and feel each grain by hand and witness the technologically advanced creation of ultimate beauty.'
		},
		{
			name: 'Superwhite',
			image: 'https://www.kajariaceramics.com/assets/images/superwhite.jpg',
			desc: 'Superwhite finish stands at an impressive 93% on the L Value Scale, lending it the purest of white hues. Its superior white colour adds sophistication to any living space, while creating an illusion of a white space, brightened with natural light.'
		},
		{
			name: 'Matt',
			image: 'https://www.kajariaceramics.com/assets/images/matt.jpg',
			desc: 'Durable and slip resistant, these tiles are a perfect choice for indoors as well as outdoors. The matt finish complements perfectly with your vision of creating spaces that look traditional and rustic.'
		},
		{
			name: 'Metallic',
			image: 'https://www.kajariaceramics.com/assets/images/mettalic.jpg',
			desc: 'A Metallic finish tiles is unlike anything you have seen before. A special technique is employed to give an authentic metallic look and feel. Stylish streaks enhance the aesthetic appeal and render a unique fusion.'
		},
		{
			name: 'Marbletech',
			image: 'https://www.kajariaceramics.com/assets/images/marbletech.jpg',
			desc: 'Marbletech finish is the closest thing to natural marble. The marble-look is achieved with a special glaze coated on top of the design. Along with that, an elaborate polishing process gives the slab a marble-like smooth feel and shine.'
		},
		{
			name: 'Rotomatt',
			image: 'https://www.kajariaceramics.com/assets/images/rotomatt.jpg',
			desc: 'Rotomatt is the perfect choice to achieve a timeless, classic look. The elegant, traditional hues of the finish render a relaxing character to your spaces. Slabs of the finish give you the creative flexibility to style your rooms, the way you like.'
		}
	];
	let selected = 6;
</script>

<section class="mx-auto max-w-7xl px-6 py-12">
	<div class="grid grid-cols-1 items-start gap-8 md:grid-cols-2">
		<!-- Left: Finishes List & Description -->
		<div class="flex w-full flex-col gap-8">
			<div class="flex min-w-[160px] flex-col gap-2">
				<h2 class="mb-4 font-serif text-2xl font-semibold">Know About Finishes</h2>
				<div class="grid grid-cols-2 gap-x-8 gap-y-2">
					{#each finishes as finish, idx}
						<button
							class="border-none px-0 py-1 text-left font-medium transition-all outline-none focus:outline-none {selected ===
							idx
								? 'font-bold text-[#204e44]'
								: 'text-gray-400'}"
							on:click={() => (selected = idx)}
						>
							{finish.name}
							{#if selected === idx}
								<span class="mt-1 block h-0.5 w-6 bg-[#204e44]"></span>
							{/if}
						</button>
					{/each}
				</div>
			</div>
			<div class="flex-1 border-l border-gray-300 pl-8">
				<p class="mb-4 line-clamp-3 text-base text-gray-700">{finishes[selected].desc}</p>
			</div>
		</div>
		<!-- Right: Finish Image -->
		<div class="flex items-center justify-end">
			<img
				src={finishes[selected].image}
				alt={finishes[selected].name}
				class="w-full max-w-lg rounded-xl object-cover shadow-lg"
			/>
		</div>
	</div>
</section>
