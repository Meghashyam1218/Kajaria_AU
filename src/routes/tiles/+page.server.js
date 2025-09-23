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
    const products = await Promise.all(data.products.map(async (product) => {
      const $ = cheerio.load(product.priceHTML);
      const price = $('span').text().trim();
      const url = 'https://www.wakajariaceramics.com.au/' + product.slug;
      let moreDetails = {};
      try {
        const detailsResponse = await fetch(url, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
          }
        });

        const html = await detailsResponse.text();
        const $details = cheerio.load(html);
        // console.log('HTML fetched successfully.' + $.html()); // Log first 500 characters of HTML
        // --- Product Name Extraction ---
        // The name is the first bold tag inside the main product details container.
        const productName = $details('div.right.col-lg-7.col-md-6 > div.info.row > div.col-md-4 > h2').text().trim();
        // --- More Details Extraction ---
        const availabilityAlt = $details(".col-12.availability label").text().trim();

        // console.log(availabilityAlt);   // "In Stock"
        moreDetails.availability = availabilityAlt;
        $details("table.full-specifications tbody tr").each((i, el) => {
          const key = $details(el).find("td").first().text().trim();
          const value = $details(el).find("td").eq(1).text().trim();
          if (key) {
            moreDetails[key] = value;
          }
        });


        // console.log(moreDetails);

      } catch (error) {
        console.error('Error fetching or parsing product details:', error.message);
      }
      return {
        name: product.name,
        slug: product.slug,
        price: price, // The clean price extracted from the HTML
        imageUrl: product.image,
        isNew: product.new,
        ...moreDetails
      };
    }));
    // Sort products to show 'New' items first
    products.sort((a, b) => {
      if (a.isNew === 'New' && b.isNew !== 'New') {
        return -1; // a comes first
      }
      if (b.isNew === 'New' && a.isNew !== 'New') {
        return 1; // b comes first
      }
      return 0; // No change in order
    });
    products.sort((a, b) => {
      if (a.availability === 'In Stock' && b.availability !== 'In Stock') {
        return -1; // a comes first
      }
      if (b.availability === 'In Stock' && a.availability !== 'In Stock') {
        return 1; // b comes first
      }
      return 0; // No change in order
    });
    console.log({ products });
    return { products };  // Return an array of products
  } catch (error) {
    console.error("Error fetching products:", error);
    return { products: [], error: "Unable to fetch products" };
  }
};