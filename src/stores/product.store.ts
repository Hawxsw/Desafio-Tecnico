import { create } from 'zustand';
import { Product, ProductCreationSchema, ProductSchema, ProductListItem } from '@/lib/products/product.schema';
import { api } from '@/services/api';
import z from 'zod';

interface ProductState {
  products: ProductListItem[];
  currentProduct: Product | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  createProduct: (productData: z.infer<typeof ProductCreationSchema>) => Promise<Product>;
  fetchAllProducts: () => Promise<void>;
  fetchProductById: (id: string) => Promise<void>;
  updateProduct: (id: string, product: Partial<Product>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  updateProductThumbnail: (id: string, thumbnail: File) => Promise<void>;
}

export const useProductStore = create<ProductState>((set, get) => ({
  products: [],
  currentProduct: null,
  status: 'idle',
  error: null,
  createProduct: async (productData) => {
    set({ status: 'loading', error: null });
    try {
      const response = await api.product.createProduct(productData);
      set({ status: 'succeeded' });
      return response;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Erro desconhecido ao criar produto.';
      set({ status: 'failed', error: errorMessage });
      throw new Error(errorMessage);
    }
  },
  fetchAllProducts: async () => {
    set({ status: 'loading', error: null });
    try {
      const response = await api.product.getProducts();
      set({ status: 'succeeded', products: response });
    } catch (error: any) {
      set({ status: 'failed', error: error.message || 'Falha ao buscar produtos' });
    }
  },
  fetchProductById: async (id) => {
    set({ status: 'loading', error: null });
    try {
      const response = await api.product.getProductById(id);
      const product = ProductSchema.parse(response);
      set({ status: 'succeeded', currentProduct: product });
    } catch (error: any) {
      set({ status: 'failed', error: error.message || 'Falha ao buscar produto' });
    }
  },
  updateProduct: async (id, product) => {
    set({ status: 'loading', error: null });
    try {
      const response = await api.product.updateProduct(id, product);
      const updatedProduct = ProductSchema.parse(response);
      set({
        status: 'succeeded',
        products: get().products.map((p) => (p.id === updatedProduct.id ? updatedProduct : p)),
        currentProduct: get().currentProduct?.id === updatedProduct.id ? updatedProduct : get().currentProduct,
      });
    } catch (error: any) {
      set({ status: 'failed', error: error.message || 'Falha ao atualizar produto' });
    }
  },
  deleteProduct: async (id) => {
    set({ status: 'loading', error: null });
    try {
      await api.product.deleteProduct(id);
      set({
        status: 'succeeded',
        products: get().products.filter((p) => p.id !== id),
        currentProduct: get().currentProduct?.id === id ? null : get().currentProduct,
      });
    } catch (error: any) {
      set({ status: 'failed', error: error.message || 'Falha ao deletar produto' });
    }
  },
  updateProductThumbnail: async (id, thumbnail) => {
    set({ status: 'loading', error: null });
    try {
      const response = await api.product.updateProductThumbnail(id, thumbnail);
      const updatedProduct = ProductSchema.parse(response);
      set({
        status: 'succeeded',
        products: get().products.map((p) => (p.id === updatedProduct.id ? updatedProduct : p)),
        currentProduct: get().currentProduct?.id === updatedProduct.id ? updatedProduct : get().currentProduct,
      });
    } catch (error: any) {
      set({ status: 'failed', error: error.message || 'Falha ao atualizar thumbnail' });
    }
  },
}));
