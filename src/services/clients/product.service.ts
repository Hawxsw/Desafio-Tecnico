import type { AxiosInstance } from "axios";
import type { ProductSchema } from '../../schemas/product.schema';

export class ProductService  {
    constructor(private api: AxiosInstance) {}

    async getProducts() {
        const { data } = await this.api.get('/products');
        return data;
    }

    async getProductById(id: string) {
        const { data } = await this.api.get(`/products/${id}`);
        return data;
    }

    async createProduct(payload: ProductSchema) {
        const { data } = await this.api.post('/products', payload);
        return data;
    }

    async updateProduct(id: string, payload: ProductSchema) {
        const { data } = await this.api.put(`/products/${id}`, payload);
        return data;
    }

    async deleteProduct(id: string) {
        const { data } = await this.api.delete(`/products/${id}`);
        return data;
    }

    async updateProductThumbnail(id: string, thumbnail: string) {
        const { data } = await this.api.patch(`/products/thumbnail/${id}`, { thumbnail });
        return data;
    }
    
};
