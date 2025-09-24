<!--
	Contact page
	- Client-side form with validation and simulated submit (no server-side endpoint).
	- Replace `handleSubmit` to POST to your API endpoint when ready.
	Color scheme: dark green #204e44 and gold #D1A134
-->

<script>
	import { tick } from 'svelte';
	let name = '';
	let email = '';
	let subject = '';
	let message = '';
	let submitting = false;
	let success = false;
	let errors = {};

	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

	function validate() {
		const e = {};
		if (!name.trim()) e.name = 'Please enter your name.';
		if (!email.trim()) e.email = 'Please enter your email.';
		else if (!emailRegex.test(email)) e.email = 'Please enter a valid email.';
		if (!subject.trim()) e.subject = 'Please add a subject.';
		if (!message.trim() || message.trim().length < 10)
			e.message = 'Message should be at least 10 characters.';
		errors = e;
		return Object.keys(e).length === 0;
	}

	async function handleSubmit(e) {
		e.preventDefault();
		success = false;
		if (!validate()) return;
		submitting = true;
		// Simulate network latency
		await new Promise((r) => setTimeout(r, 900));

		// TODO: Replace this simulation with a real POST to your server API.
		// Example:
		// await fetch('/api/contact', { method: 'POST', body: JSON.stringify({ name, email, subject, message }) })

		submitting = false;
		success = true;
		// reset form after a short tick so success state is visible
		await tick();
		name = email = subject = message = '';
		errors = {};
	}
</script>

<section class="bg-gradient-to-b from-[#204e44] to-[#13372f] py-12 pt-28 text-white">
	<div class="mx-auto max-w-6xl px-6">
		<div class="mb-8 text-center">
			<h1 class="text-4xl font-extrabold md:text-5xl">Contact Us</h1>
			<p class="mx-auto mt-3 max-w-2xl text-lg text-green-100">
				Have a question, want a quote, or need technical support? Send us a message and our team
				will get back to you promptly.
			</p>
		</div>
		<div class="grid grid-cols-1 gap-6 md:grid-cols-3">
			<div class="md:col-span-2">
				<div class="rounded-lg bg-white p-6 text-gray-900 shadow-lg">
					<h2 class="mb-2 text-2xl font-semibold">Send a message</h2>
					<p class="mb-4 text-sm text-gray-600">We usually respond within 1 business day.</p>

					{#if success}
						<div class="mb-4 rounded-md border border-green-100 bg-green-50 p-4 text-green-800">
							Your message was sent successfully. We'll be in touch soon.
						</div>
					{/if}

					<form on:submit|preventDefault={handleSubmit} class="space-y-4">
						<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
							<div>
								<label for="contact-name" class="mb-1 block text-sm font-medium">Name</label>
								<input
									id="contact-name"
									class="w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-[#D1A134] focus:outline-none"
									bind:value={name}
									placeholder="Your full name"
								/>
								{#if errors.name}<p class="mt-1 text-sm text-red-600">{errors.name}</p>{/if}
							</div>
							<div>
								<label for="contact-email" class="mb-1 block text-sm font-medium">Email</label>
								<input
									id="contact-email"
									type="email"
									class="w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-[#D1A134] focus:outline-none"
									bind:value={email}
									placeholder="you@company.com"
								/>
								{#if errors.email}<p class="mt-1 text-sm text-red-600">{errors.email}</p>{/if}
							</div>
						</div>

						<div>
							<label for="contact-subject" class="mb-1 block text-sm font-medium">Subject</label>
							<input
								id="contact-subject"
								class="w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-[#D1A134] focus:outline-none"
								bind:value={subject}
								placeholder="Subject"
							/>
							{#if errors.subject}<p class="mt-1 text-sm text-red-600">{errors.subject}</p>{/if}
						</div>

						<div>
							<label for="contact-message" class="mb-1 block text-sm font-medium">Message</label>
							<textarea
								id="contact-message"
								rows="6"
								class="w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-[#D1A134] focus:outline-none"
								bind:value={message}
								placeholder="Tell us about your project or question..."
							></textarea>
							{#if errors.message}<p class="mt-1 text-sm text-red-600">{errors.message}</p>{/if}
						</div>

						<div class="flex items-center gap-4">
							<button
								type="submit"
								class="inline-flex items-center gap-2 rounded-md bg-[#D1A134] px-5 py-2 font-semibold text-[#073627] shadow-md hover:bg-[#c7962e]"
								disabled={submitting}
							>
								{#if submitting}
									<svg class="h-4 w-4 animate-spin" viewBox="0 0 24 24"
										><circle
											class="opacity-25"
											cx="12"
											cy="12"
											r="10"
											stroke="currentColor"
											stroke-width="4"
											fill="none"
										></circle><path
											class="opacity-75"
											fill="currentColor"
											d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
										></path></svg
									>
									Sending...
								{:else}
									Send message
								{/if}
							</button>
							<button
								type="button"
								on:click={() => {
									name = '';
									email = '';
									subject = '';
									message = '';
									errors = {};
									success = false;
								}}
								class="text-sm text-gray-600 hover:underline">Reset</button
							>
						</div>
					</form>
				</div>
			</div>

			<aside>
				<div class="sticky top-6 space-y-4">
					<div class="rounded-lg bg-white p-4 text-gray-900 shadow">
						<h3 class="mb-2 text-lg font-semibold">Contact information</h3>
						<p class="text-sm text-gray-600">
							Prefer to call or visit? See our contact details below.
						</p>

						<ul class="mt-3 space-y-3">
							<li class="flex items-start gap-3">
								<svg
									class="mt-1 h-6 w-6 text-[#204e44]"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									><path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
									/></svg
								>
								<div>
									<div class="text-sm font-medium">Email</div>
									<div class="text-sm text-gray-600">info@wakajariaceramics.com.au</div>
								</div>
							</li>

							<li class="flex items-start gap-3">
								<svg
									class="mt-1 h-6 w-6 text-[#204e44]"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									><path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M3 5h12M9 3v2m-6 4v6a2 2 0 002 2h10a2 2 0 002-2V7M16 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"
									/></svg
								>
								<div>
									<div class="text-sm font-medium">Phone</div>
									<div class="text-sm text-gray-600">1300 857 568, (08) 62459918</div>
								</div>
							</li>

							<li class="flex items-start gap-3">
								<svg
									class="mt-1 h-6 w-6 text-[#204e44]"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									><path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M17 20h5V4H2v16h5"
									/></svg
								>
								<div>
									<div class="text-sm font-medium">Address</div>
									<div class="text-sm text-gray-600">
										Unit 15/10 Gibbs Street East Cannington WA 6107
									</div>
								</div>
							</li>
						</ul>
					</div>

					<div class="overflow-hidden rounded-lg bg-white shadow">
						<div class="h-48 md:h-40">
							<!-- OpenStreetMap embed to avoid API keys -->
							<iframe
								title="Melbourne office location"
								class="h-full w-full"
								frameborder="0"
								scrolling="no"
								marginheight="0"
								marginwidth="0"
								src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4052.639046496313!2d115.94385107627295!3d-32.013147173992174!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2a32bde2b017308d%3A0x47d146be48dac273!2swa%20kajaria%20ceramics!5e1!3m2!1sen!2sin!4v1746555720683!5m2!1sen!2sin"
							></iframe>
						</div>
						<div class="p-3 text-sm text-gray-600">
							Monday - Saturday : 09.00 am - 05.00 pm
							<br />Sunday Closed
						</div>
					</div>
				</div>
			</aside>
		</div>
	</div>
</section>

<style>
	/* small local styles to ensure iframe fills nicely */
	iframe {
		border: none;
	}
</style>
