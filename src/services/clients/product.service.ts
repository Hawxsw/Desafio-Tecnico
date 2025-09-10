import type { AxiosInstance } from "axios";
import type { ProductCreationSchema, ProductSchema } from "../../lib/products/product.schema";
import { IProduct } from "@/lib/types/product";
import { IPaginationResponse } from "../api";

export class ProductService {
    constructor(private api: AxiosInstance) {}

    async getProducts(
        page: number = 1,
        pageSize: number = 10,
        filter?: string
    ): Promise<IPaginationResponse<IProduct>> {
        const { data } = await this.api.get("/products", {
            params: { page, pageSize, filter },
        });
        return data;
    }

    async getProductById(id: string): Promise<IProduct> {
        const { data } = await this.api.get(`/products/${id}`);
        return data;
    }

    async createProduct(payload: ProductCreationSchema): Promise<ProductSchema> {
        const { data } = await this.api.post("/products", payload);
        return data;
    }

    async updateProduct(id: string, payload: ProductSchema): Promise<IProduct> {
        const { data } = await this.api.put(`/products/${id}`, payload);
        return data;
    }

    async deleteProduct(id: string): Promise<{ message: string }> {
        const { data } = await this.api.delete(`/products/${id}`);
        return data;
    }

    async updateProductThumbnail(
        id: string,
        thumbnail: string
    ): Promise<IProduct> {
        const { data } = await this.api.patch(`/products/thumbnail/${id}`, { thumbnail });
        return data;
    }
}
