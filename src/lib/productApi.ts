import axios from "axios";

export class ProductApi {
  async getPaginatedProducts(query?: string) {
    return await axios.get(`/api/products?${query}`);
  }

  async getMostProducts(type: "sell" | "search") {
    return await axios.get(`/api/products/most?most=${type}`);
  }
}

export const productApi = new ProductApi();
