<script>
	// Define the tile options
	const tileOptions = [
		{
			id: 'outdoor',
			name: 'Outdoor Wall Tiles',
			beforeImage: './award-2.jpg',
			afterImage: './award-2.jpg',
			description:
				'Transform your outdoor spaces with our durable and weather-resistant wall tiles. Perfect for patios and garden walls.'
		},
		{
			id: 'living',
			name: 'Living Room Wall Tiles',
			beforeImage: './award-2.jpg',
			afterImage: './award-2.jpg',
			description:
				'Add elegance to your living room with our stylish wall tiles. Create a focal point that impresses your guests.'
		},
		{
			id: 'bedroom',
			name: 'Bedroom Wall Tiles',
			beforeImage: './award-2.jpg',
			afterImage: './award-2.jpg',
			description:
				'Create a peaceful sanctuary with our bedroom wall tiles. Perfect for accent walls and headboard backgrounds.'
		},
		{
			id: 'bathroom',
			name: 'Bathroom Floor Tiles',
			beforeImage: './award-2.jpg',
			afterImage: './about.jpg',
			description:
				"Discover Kajaria's extravagant matt finish bathroom tiles. Their stunning designs add spaciousness and sophistication, while the matt surface ensures superior grip for both stylish and safe walls and floors."
		}
	];

	// Set default selected option
	let selectedOption = tileOptions[3]; // Default to bathroom tiles

	// Function to handle option selection
	function selectOption(option) {
		selectedOption = option;
		// Reset to showing "after" image when changing options
		showAfterImage = true;
	}

	// Toggle state for before/after
	let showAfterImage = true;

	// Function to toggle between before and after images
	function toggleImage() {
		showAfterImage = !showAfterImage;
	}
</script>

<section id="services" class="mx-auto w-[90vw] max-w-[1440px] scroll-m-20 md:scroll-m-14 md:p-8">
	<div class=" mb-5 text-2xl font-black text-emerald-600 max-md:text-center md:mb-10 md:text-4xl">
		Services We Provide
	</div>
	<div class="tile-comparison-container">
		<div class="options-container grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-4">
			{#each tileOptions as option}
				<button
					data-aos="zoom-in"
					class="option-button p-2 text-lg {selectedOption.id === option.id ? 'selected' : ''}"
					on:click={() => selectOption(option)}
				>
					{option.name}
				</button>
			{/each}
		</div>

		<div class="content-container">
			<div class="image-toggle-container border-2">
				<div data-aos="zoom-in" class="image-wrapper">
					{#if showAfterImage}
						<img
							src={selectedOption.afterImage || '/placeholder.svg'}
							alt="After {selectedOption.name}"
							class="comparison-image"
						/>
						<div class="image-label">After</div>
					{:else}
						<img
							src={selectedOption.beforeImage || '/placeholder.svg'}
							alt="Before {selectedOption.name}"
							class="comparison-image"
						/>
						<div class="image-label">Before</div>
					{/if}
				</div>

				<button class="toggle-button p-2 text-sm md:p-3 md:text-base" on:click={toggleImage}>
					Show {showAfterImage ? 'Before' : 'After'}
				</button>
			</div>

			<div class="description-container mt-2 flex max-h-[300px] flex-col p-4">
				<h2 class="text-lg font-bold">{selectedOption.name}</h2>
				<p class="mb-4 overflow-auto">{selectedOption.description}</p>
			</div>
		</div>
	</div>
</section>

<style>
	.tile-comparison-container {
		font-family:
			'Inter',
			-apple-system,
			BlinkMacSystemFont,
			'Segoe UI',
			Roboto,
			sans-serif;
		max-width: 1200px;
		margin: 0 auto;
		padding: 20px;
	}

	.options-container {
		display: grid;

		margin-bottom: 20px;
	}

	.option-button {
		/* padding: 16px; */
		border: 3px solid #e2e8f0;
		background-color: white;
		border-radius: 8px;
		/* font-size: 16px; */
		font-weight: 500;
		cursor: pointer;
		transition: all 0.2s ease;
		text-align: center;
	}

	.option-button:hover {
		border-color: #10b981;
	}

	.option-button.selected {
		background-color: #10b981;
		color: white;
		border-color: #10b981;
	}

	.content-container {
		display: grid;
		grid-template-columns: 1fr;
		gap: 20px;
	}

	@media (min-width: 768px) {
		.content-container {
			grid-template-columns: 3fr 2fr;
		}
	}

	.image-toggle-container {
		position: relative;
		width: 100%;
		border-radius: 8px;
		box-shadow:
			0 4px 6px -1px rgba(0, 0, 0, 0.1),
			0 2px 4px -1px rgba(0, 0, 0, 0.06);
		overflow: hidden;
	}

	.image-wrapper {
		position: relative;
		width: 100%;
		height: 0;
		padding-bottom: 66.67%; /* 3:2 aspect ratio, adjust as needed */
		overflow: hidden;
	}

	.comparison-image {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		object-fit: contain;
		object-position: center;
		transition: opacity 0.3s ease;
	}

	.image-label {
		position: absolute;
		top: 20px;
		left: 20px;
		background-color: rgba(0, 0, 0, 0.7);
		color: white;
		padding: 5px 10px;
		border-radius: 4px;
		font-size: 14px;
		z-index: 5;
	}

	.toggle-button {
		position: absolute;
		bottom: 20px;
		right: 20px;
		background-color: #10b981;
		color: white;
		border: none;
		/* padding: 8px 16px; */
		border-radius: 6px;
		font-weight: 500;
		cursor: pointer;
		transition: background-color 0.2s ease;
		z-index: 5;
	}

	.toggle-button:hover {
		background-color: #059669;
	}

	.description-container {
		/* padding: 20px; */
		background-color: white;
		border-radius: 8px;
		box-shadow:
			0 1px 3px 0 rgba(0, 0, 0, 0.1),
			0 1px 2px 0 rgba(0, 0, 0, 0.06);
	}

	h2 {
		margin-bottom: 16px;
		color: #111827;
	}

	p {
		line-height: 1.6;
		color: #4b5563;
	}
	/* 
	.toggle-controls {
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 20px;
	}

	.toggle-label {
		font-size: 14px;
		font-weight: 500;
		color: #6b7280;
		margin: 0 10px;
	}

	.toggle-label.active {
		color: #10b981;
		font-weight: 600;
	}

	.toggle-switch {
		position: relative;
		display: inline-block;
		width: 60px;
		height: 30px;
	}

	.toggle-switch input {
		opacity: 0;
		width: 0;
		height: 0;
	}

	.toggle-slider {
		position: absolute;
		cursor: pointer;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: #e5e7eb;
		transition: 0.4s;
		border-radius: 34px;
	}

	.toggle-slider:before {
		position: absolute;
		content: '';
		height: 22px;
		width: 22px;
		left: 4px;
		bottom: 4px;
		background-color: white;
		transition: 0.4s;
		border-radius: 50%;
	}

	input:checked + .toggle-slider {
		background-color: #10b981;
	}

	input:checked + .toggle-slider:before {
		transform: translateX(30px);
	} */

	.learn-more-button {
		background-color: #10b981;
		color: white;
		border: none;
		padding: 10px 20px;
		border-radius: 6px;
		font-weight: 500;
		cursor: pointer;
		transition: background-color 0.2s ease;
		width: 100%;
	}

	.learn-more-button:hover {
		background-color: #059669;
	}
</style>
