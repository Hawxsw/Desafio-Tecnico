import type { AxiosInstance } from "axios";
import {
  Product,
  ProductCreation,
  ProductUpdate,
  ProductListItem,
} from "@/lib/products/product.schema";

export class ProductService {
  constructor(private api: AxiosInstance) {}

  async getProducts(
    page: number = 1,
    pageSize: number = 10,
    filter?: string
  ): Promise<ProductListItem[]> {
    const { data } = await this.api.get("/products", {
      params: { page, pageSize, filter },
    });
    return data;
  }

  async getProductById(id: string): Promise<Product> {
    const { data } = await this.api.get(`/products/${id}`);
    return data;
  }

  async createProduct(payload: ProductCreation): Promise<Product> {
    const { data } = await this.api.post("/products", payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return data;
  }

  async updateProduct(id: string, payload: ProductUpdate): Promise<Product> {
    const { data } = await this.api.put(`/products/${id}`, payload);
    return data;
  }

  async deleteProduct(id: string): Promise<{ message: string }> {
    const { data } = await this.api.delete(`/products/${id}`);
    return data;
  }

  async updateProductThumbnail(id: string, thumbnail: File): Promise<Product> {
    const formData = new FormData();
    formData.append("thumbnail", thumbnail);
    const { data } = await this.api.patch(
      `/products/thumbnail/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return data;
  }
}
