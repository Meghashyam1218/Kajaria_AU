// src/lib/fetchProducts.js
import * as cheerio from "cheerio";

/**
 * Fetches products from the API and returns cleaned product data.
 * @param {Object} params
 * @param {string} params.category
 * @param {string} params.finish
 * @param {string} params.subcategory
 * @returns {Promise<Array>} products
 */
export async function fetchTiles({ category = "26", finish = "", subcategory = "" }) {
  try {
    // Use a public CORS proxy for development, or set up your own backend proxy for production
    const apiUrl = `https://www.wakajariaceramics.com.au/category-products/${category}?Finish=${finish}&subcategory=${subcategory}`;
    const corsProxy = "https://corsproxy.io/?url=";
    const response = await fetch(corsProxy + apiUrl);
    // console.log("API URL: " + corsProxy + apiUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.status}`);
    }
    const data = JSON.parse(await response.text());
    const products = data.products.map(product => {
      const $ = cheerio.load(product.priceHTML);
      const price = $('span').text().trim();
      return {
        name: product.name,
        slug: product.slug,
        price,
        imageUrl: product.image,
        isNew: product.new
      };
    });
    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}
