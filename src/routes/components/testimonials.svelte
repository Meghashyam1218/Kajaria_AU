<script>
	import { register } from 'swiper/element/bundle';
	// register Swiper custom elements
	register();
	let testimonials = [
		{
			name: 'Powel Joseph',
			designation: '⭐⭐⭐⭐⭐',
			testimonial:
				'We had a great experience with WA Kajaria Ceramics. The quality of the tiles is excellent, and the team was professional and easy to work with. The installation was clean and precise, and the final result looks great. Would definitely recommend them.'
		},
		{
			name: 'Shams Baqai',
			designation: '⭐⭐⭐⭐⭐',
			testimonial:
				'I recently had the pleasure of working with WA Kajaria Ceramics, and I must say, they did an outstanding job! The quality of workmanship was truly exceptional, and the tiles they provided were of the highest quality. Not only were the prices very reasonable, but they also offered a decent range to choose from. What impressed me even more was their ability to import tiles from a wide range of designs if you have the time to wait.'
		},
		{
			name: 'Ravi Gaurav',
			designation: '⭐⭐⭐⭐⭐',
			testimonial:
				'Excellent products, professional services, they are very friendly to deal with, I am so satisfied. Highly recommended. WA Kajaria ceramics Have done tiling throughout our house and turned out to exceed our expectations, The work is very clean and perfect the work was exceptional. Appreciate the skills and experience they have. We highly recommend them to our friends and family.'
		}
	];
</script>

<section class="mx-auto mt-8 w-[90vw] max-w-[1440px] md:p-8">
	<div class=" mb-5 text-2xl font-black text-emerald-600 max-md:text-center md:mb-10 md:text-4xl">
		What Our Customers Say
	</div>
	<swiper-container navigation="true" loop="true">
		{#each testimonials as testimonial, i}
			<swiper-slide class="p-8">
				<div
					class="testimonial mx-auto flex max-w-[1000px] flex-col items-center justify-center gap-6 rounded-2xl p-8"
				>
					<img
						alt="avatar"
						src="./Sample-1.png"
						class=" h-[100px] w-[100px] md:h-[150px] md:w-[150px]"
					/>
					<p class="p-4 text-center text-gray-800 max-md:text-sm">
						{testimonial.testimonial}
					</p>
					<div class="flex flex-col items-center justify-center gap-6">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="40"
							height="40"
							viewBox="0 0 24 24"
							class="fill-emerald-500"
							><path
								d="M6.5 10c-.223 0-.437.034-.65.065.069-.232.14-.468.254-.68.114-.308.292-.575.469-.844.148-.291.409-.488.601-.737.201-.242.475-.403.692-.604.213-.21.492-.315.714-.463.232-.133.434-.28.65-.35l.539-.222.474-.197-.485-1.938-.597.144c-.191.048-.424.104-.689.171-.271.05-.56.187-.882.312-.318.142-.686.238-1.028.466-.344.218-.741.4-1.091.692-.339.301-.748.562-1.05.945-.33.358-.656.734-.909 1.162-.293.408-.492.856-.702 1.299-.19.443-.343.896-.468 1.336-.237.882-.343 1.72-.384 2.437-.034.718-.014 1.315.028 1.747.015.204.043.402.063.539l.025.168.026-.006A4.5 4.5 0 1 0 6.5 10zm11 0c-.223 0-.437.034-.65.065.069-.232.14-.468.254-.68.114-.308.292-.575.469-.844.148-.291.409-.488.601-.737.201-.242.475-.403.692-.604.213-.21.492-.315.714-.463.232-.133.434-.28.65-.35l.539-.222.474-.197-.485-1.938-.597.144c-.191.048-.424.104-.689.171-.271.05-.56.187-.882.312-.317.143-.686.238-1.028.467-.344.218-.741.4-1.091.692-.339.301-.748.562-1.05.944-.33.358-.656.734-.909 1.162-.293.408-.492.856-.702 1.299-.19.443-.343.896-.468 1.336-.237.882-.343 1.72-.384 2.437-.034.718-.014 1.315.028 1.747.015.204.043.402.063.539l.025.168.026-.006A4.5 4.5 0 1 0 17.5 10z"
							/></svg
						>
						<div class="flex flex-col justify-center gap-1">
							<h1 class="text-center text-xl font-bold text-emerald-600">{testimonial.name}</h1>
							<h1 class="text-center text-sm font-medium text-neutral-600">
								{testimonial.designation}
							</h1>
						</div>
					</div>
				</div>
			</swiper-slide>
		{/each}
	</swiper-container>
</section>

<style>
	* {
		--swiper-navigation-size: 30px;
		--swiper-navigation-top-offset: 50%;
		--swiper-navigation-sides-offset: 10px;
		--swiper-navigation-color: var(--swiper-theme-color);
	}
</style>
