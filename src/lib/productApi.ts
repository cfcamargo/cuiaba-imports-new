import axios from "axios";

export class ProductApi {
  async getPaginatedProducts(query?: string) {
    return await axios.get(`/api/products?${query}`);
  }

  async getProductById(id: number) {
    return await axios.get(`/api/products/${id}`);
  }

  async getMostProducts(type: "sell" | "search") {
    return await axios.get(`/api/products/most?most=${type}`);
  }
}

export const productApi = new ProductApi();
