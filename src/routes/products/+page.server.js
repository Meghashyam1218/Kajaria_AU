import { fetchProducts } from "../../utils/fetchProducts.js";

export const load = async ({ fetch }) => {
  try {
    const i = 0; // Default value for demonstration
    const extractedData = await fetchProducts(i, fetch);
    return { extractedData };
  } catch (error) {
    console.error(error);
    return { error: "Unable to fetch products" };
  }
};