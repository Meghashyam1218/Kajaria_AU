/** @type {import('./$types').PageServerLoad} */
import * as cheerio from "cheerio";

export const load = async ({ url }) => {
  try {
    // Extract query parameters
    const category = url.searchParams.get("category") || "26";
    const finish = url.searchParams.get("finish") || "";
    const subcategory = url.searchParams.get("subcategory") || "";

    // Construct the API URL
    const apiUrl = `https://www.wakajariaceramics.com.au/category-products/${category}?Finish=${finish}&subcategory=${subcategory}`;
    const response = await fetch(apiUrl);
    console.log("API URL: " + apiUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.status}`);
    }

    const data = JSON.parse(await response.text());

    // Extract and clean the product data
    const products = data.products.map(product => {
      const $ = cheerio.load(product.priceHTML);
      const price = $('span').text().trim();

      return {
        name: product.name,
        slug: product.slug,
        price: price, // The clean price extracted from the HTML
        imageUrl: product.image,
        isNew: product.new
      };
    });
    console.log({ products });
    return { products }; // Return an array of products
  } catch (error) {
    console.error("Error fetching products:", error);
    return { products: [], error: "Unable to fetch products" };
  }
};