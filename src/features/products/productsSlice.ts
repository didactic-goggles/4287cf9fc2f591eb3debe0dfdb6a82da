import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store/store';
import { fetchProducts } from './productsAPI';
import Product from './Product.model';

export interface ProductsState {
  products: Product[];
  filteredProducts: Product[];
  status: 'idle' | 'loading' | 'failed' | 'succeeded';
  pagination: {
    totalPage: number;
    currentPage: number;
  };
}

const initialState: ProductsState = {
  products: [],
  filteredProducts: [],
  status: 'idle',
  pagination: {
    totalPage: 0,
    currentPage: 0,
  },
};

export const getProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const response = await fetchProducts();
    return response;
  }
);

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    searchProducts: (state, action: PayloadAction<string>) => {
      if (action.payload.trim().length < 3) {
        state.filteredProducts = state.products;
        state.pagination = {
          totalPage: Math.ceil(state.products.length / 10),
          currentPage: 1,
        };
        return;
      }
      state.filteredProducts = state.products
        .filter(
          (product) => JSON.stringify(product).indexOf(action.payload) !== -1
        );
      state.pagination = {
        totalPage: Math.ceil(state.filteredProducts.length / 10),
        currentPage: 1,
      };
    },
    paginateProducts: (state, action: PayloadAction<number>) => {
      state.pagination.currentPage += action.payload;
      const firstIndex = (state.pagination.currentPage - 1) * 10;
      const lastIndex = firstIndex + 10;

      state.filteredProducts = state.products.slice(firstIndex, lastIndex);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload.products as Product[];
        state.filteredProducts = action.payload.products.slice(
          0,
          10
        ) as Product[];
        state.pagination = {
          totalPage: Math.ceil(state.products.length / 10),
          currentPage: 1,
        };
      })
      .addCase(getProducts.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { searchProducts, paginateProducts } = productsSlice.actions;

export const productsData = (state: RootState) =>
  state.products.filteredProducts;
export const productsStatus = (state: RootState) => state.products.status;
export const productsPagination = (state: RootState) =>
  state.products.pagination;

export default productsSlice.reducer;
