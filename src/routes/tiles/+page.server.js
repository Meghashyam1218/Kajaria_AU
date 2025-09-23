/** @type {import('./$types').PageServerLoad} */
export const load = async ({ fetch, url }) => {
  // Rebuild the query string to pass to our own API endpoint
  const query = url.searchParams.toString();
  const endpointUrl = `/tiles?${query}`;

  try {
    // Use the `fetch` provided by SvelteKit to call our own endpoint
    const response = await fetch(endpointUrl);

    if (!response.ok) {
      const errorData = await response.json();
      return { products: [], error: errorData.error || 'Failed to load products' };
    }

    const data = await response.json();
    return data; // This will return { products: [...] }
  } catch (error) {
    console.error('Error fetching from /tiles endpoint in page load:', error);
    return { products: [], error: 'Unable to load products' };
  }
};