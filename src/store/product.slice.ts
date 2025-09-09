import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { ProductSchema } from '../schemas/product.schema';
import { api } from '../services/api';

interface ProductState {
  products: ProductSchema[];
  currentProduct: ProductSchema | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ProductState = {
  products: [],
  currentProduct: null,
  status: 'idle',
  error: null,
};

// Async Thunks
export const createProduct = createAsyncThunk(
  'products/createProduct',
  async (product: ProductSchema) => {
    const response = await api.product.createProduct(product);
    return response;
  },
);

export const fetchAllProducts = createAsyncThunk(
  'products/fetchAllProducts',
  async () => {
    const response = await api.product.getProducts();
    return response;
  },
);

export const fetchProductById = createAsyncThunk(
  'products/fetchProductById',
  async (id: string) => {
    const response = await api.product.getProductById(id);
    return response;
  },
);

export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async ({ id, product }: { id: string; product: Partial<ProductSchema> }) => {
    const response = await api.product.updateProduct(id, product as ProductSchema);
    return response;
  },
);

export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (id: string) => {
    await api.product.deleteProduct(id);
    return id;
  },
);

export const updateProductThumbnail = createAsyncThunk(
  'products/updateProductThumbnail',
  async ({ id, thumbnail }: { id: string; thumbnail: string }) => {
    const response = await api.product.updateProductThumbnail(id, thumbnail);
    return response;
  },
);

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(createProduct.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createProduct.fulfilled, (state, action: PayloadAction<ProductSchema>) => {
        state.status = 'succeeded';
        state.products.push(action.payload);
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to create product';
      })
      .addCase(fetchAllProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllProducts.fulfilled, (state, action: PayloadAction<ProductSchema[]>) => {
        state.status = 'succeeded';
        state.products = action.payload;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch products';
      })
      .addCase(fetchProductById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductById.fulfilled, (state, action: PayloadAction<ProductSchema>) => {
        state.status = 'succeeded';
        state.currentProduct = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch product';
      })
      .addCase(updateProduct.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateProduct.fulfilled, (state, action: PayloadAction<ProductSchema>) => {
        state.status = 'succeeded';
        const index = state.products.findIndex((p) => p.id === action.payload.id);
        if (index !== -1) {
          state.products[index] = action.payload;
        }
        if (state.currentProduct?.id === action.payload.id) {
          state.currentProduct = action.payload;
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to update product';
      })
      .addCase(deleteProduct.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteProduct.fulfilled, (state, action: PayloadAction<string>) => {
        state.status = 'succeeded';
        state.products = state.products.filter((p) => p.id !== action.payload);
        if (state.currentProduct?.id === action.payload) {
          state.currentProduct = null;
        }
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to delete product';
      })
      .addCase(updateProductThumbnail.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateProductThumbnail.fulfilled, (state, action: PayloadAction<ProductSchema>) => {
        state.status = 'succeeded';
        const index = state.products.findIndex((p) => p.id === action.payload.id);
        if (index !== -1) {
          state.products[index] = action.payload;
        }
        if (state.currentProduct?.id === action.payload.id) {
          state.currentProduct = action.payload;
        }
      })
      .addCase(updateProductThumbnail.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to update product thumbnail';
      });
  },
});

export default productSlice.reducer;
