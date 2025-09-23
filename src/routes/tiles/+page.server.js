/** @type {import('./$types').PageServerLoad} */
export const load = ({ fetch, url }) => {
  // Rebuild the query string to pass to our own API endpoint
  const query = url.searchParams.toString();
  const endpointUrl = `/tiles?${query}`;

  // Don't await here. Return a promise for the products.
  const productsPromise = fetch(endpointUrl)
    .then(async (response) => {
      if (!response.ok) {
        const errorData = await response.json();
        // Throw an error to be caught by the #await block on the page
        throw new Error(errorData.error || 'Failed to load products');
      }
      return response.json();
    })
    .then((data) => data.products); // Extract the products array from the JSON response

  return {
    // The page will render immediately.
    // The products will be streamed in as the promise resolves.
    streamed: {
      products: productsPromise
    }
  };
};