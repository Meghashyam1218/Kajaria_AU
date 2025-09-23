import axios from "axios";
import * as cheerio from "cheerio";

async function getProductDetails(url) {
  try {
    const { data } = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });

    const $ = cheerio.load(data);
    // console.log('HTML fetched successfully.' + $.html()); // Log first 500 characters of HTML
    // --- Product Name Extraction ---
    // The name is the first bold tag inside the main product details container.
    const productName = $('div.right.col-lg-7.col-md-6 > div.info.row > div.col-md-4 > h2').text().trim();
    // --- More Details Extraction ---
    const moreDetails = {};

    $("table.full-specifications tbody tr").each((i, el) => {
      const key = $(el).find("td").first().text().trim();
      const value = $(el).find("td").eq(1).text().trim();
      if (key) {
        moreDetails[key] = value;
      }
    });


    console.log(moreDetails);
    return {
      productName,
      moreDetails
    };

  } catch (error) {
    console.error('Error fetching or parsing product details:', error.message);
    return null;
  }
}

const url = 'https://www.wakajariaceramics.com.au/astra-grey-60-60';

getProductDetails(url).then(details => {
  if (details) {
    console.log('Product Name:', details.productName);
    console.log('More Details:', details.moreDetails);
  } else {
    console.log('Failed to retrieve product details.');
  }
});