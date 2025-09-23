import { json } from '@sveltejs/kit';
import * as cheerio from 'cheerio';

/** @type {import('./$types').RequestHandler} */
export async function GET({ url }) {
  try {
    // Extract query parameters from the incoming request
    const category = url.searchParams.get('category') ?? '26';
    const finish = url.searchParams.get('finish') ?? '';
    const subcategory = url.searchParams.get('subcategory') ?? '';

    // Construct the external API URL
    const apiUrl = `https://www.wakajariaceramics.com.au/category-products/${category}?Finish=${finish}&subcategory=${subcategory}`;
    // console.log('Fetching data from:', apiUrl);
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`Failed to fetch external data: ${response.status}`);
    }

    const data = JSON.parse(await response.text());
    // console.log(`Fetched ${data.products.length} products from external API.`);
    // Map over products to fetch individual details
    const products = await Promise.all(
      data.products.map(async (product) => {
        try {
          const detailsUrl = `https://www.wakajariaceramics.com.au/${product.slug}`;
          const detailsResponse = await fetch(detailsUrl);
          // console.log('Fetched product details from:', detailsUrl);
          // console.log('Details response status:', detailsResponse.status);
          if (!detailsResponse.ok) return null; // Skip if details fetch fails

          const html = await detailsResponse.text();
          const $details = cheerio.load(html);
          // console.log('Fetched details for:', product.slug);
          // full path if needed
          const availability = $details("#product-form > div > div > div.right.col-lg-7.col-md-6 > div.info.row > div.col-md-4 > div.col-12.availability label").text().trim();

          // or simpler by class:
          const availabilityAlt = $details(".col-12.availability label").text().trim();
          return {
            name: product.name,
            slug: product.slug,
            imageUrl: product.image,
            isNew: product.new,
            availability: availabilityAlt || 'N/A',
            Size: $details('td:contains("Size")').next().text().trim(),
            'Product Type': $details('td:contains("Product Type")').next().text().trim(),
            Finish: $details('td:contains("Finish")').next().text().trim(),
            'Per Carton': $details('td:contains("Per Carton")').next().text().trim()
          };

        } catch (e) {
          console.error('Error fetching product details for', product.slug, e);
          return null; // Ignore products that fail to fetch details
        }
      })
    );

    const validProducts = products.filter(Boolean); // Remove any nulls from failed fetches

    // Sort products to show 'New' items first
    validProducts.sort((a, b) => {
      if (a.isNew === 'New' && b.isNew !== 'New') return -1;
      if (b.isNew === 'New' && a.isNew !== 'New') return 1;
      return 0;
    });

    return json({ products: validProducts });
  } catch (error) {
    console.error('Error in /tiles GET endpoint:', error);
    return json({ products: [], error: 'Unable to fetch products' }, { status: 500 });
  }
}