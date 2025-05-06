import * as cheerio from "cheerio";

export const fetchProducts = async (i, fetch) => {
  try {
    const response = await fetch(`/products?i=${i}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      // body: JSON.stringify({ i }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const { extractedData } = await response.json();
    return extractedData;
  } catch (error) {
    console.error(error);
    throw new Error("Unable to fetch products");
  }
};