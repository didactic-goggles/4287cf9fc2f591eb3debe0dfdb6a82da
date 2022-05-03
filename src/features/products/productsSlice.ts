import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store/store';
import { fetchProducts } from '../../api/productsAPI';
import Product, { IProductData } from '../../models/Product.model';

export interface ProductsState {
  products: Product[];
  filteredProducts: Product[];
  showedProducts: Product[];
  status: 'idle' | 'loading' | 'failed' | 'succeeded';
  error: Error | null;
  pagination: Pagination;
}

interface Pagination {
  disabled: boolean;
  totalPage: number;
  currentPage: number;
  firstIndex: number;
  lastIndex: number;
  totalItem: number;
}

const initialState: ProductsState = {
  products: [],
  filteredProducts: [],
  showedProducts: [],
  status: 'idle',
  error: null,
  pagination: {
    disabled: false,
    totalPage: 0,
    currentPage: 1,
    firstIndex: 0,
    lastIndex: 0,
    totalItem: 0,
  },
};

export const getProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const response = await fetchProducts();
    if (!response.products) throw new Error('Invalid Response')
    return response;
  }
);

const calculatePagination = (
  paginationState: Pagination,
  productLength: number
) => ({
  disabled: productLength === 0,
  totalPage: Math.ceil(productLength / 10),
  currentPage: 1,
  firstIndex:
    productLength !== 0 ? (paginationState.currentPage - 1) * 10 + 1 : 0,
  lastIndex: productLength > 10 ? 10 : productLength,
  totalItem: productLength,
});

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    searchProducts: (state, action: PayloadAction<string>) => {
      if (action.payload.trim().length < 3) {
        state.filteredProducts = state.products;
        state.showedProducts = state.filteredProducts.slice(0, 10);
        state.pagination.currentPage = 1;
        state.pagination = calculatePagination(
          state.pagination,
          state.products.length
        );
        return;
      }
      state.filteredProducts = state.products.filter(
        (product) =>
          product.title.toLowerCase().indexOf(action.payload.toLowerCase()) !==
          -1
      );
      state.pagination = calculatePagination(
        state.pagination,
        state.filteredProducts.length
      );
      state.showedProducts = state.filteredProducts.slice(0, 10);
    },
    paginateProducts: (state, action: PayloadAction<number>) => {
      if (state.filteredProducts.length === 0) {
        return;
      }
      state.pagination.currentPage += action.payload;
      const firstIndex = (state.pagination.currentPage - 1) * 10;
      let lastIndex = firstIndex + 10;
      state.pagination.firstIndex = firstIndex;
      state.pagination.lastIndex = lastIndex;
      state.showedProducts = state.filteredProducts.slice(
        firstIndex,
        lastIndex
      );
      state.pagination.firstIndex += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const productsArray: Product[] = action.payload.products.map(
          (p: IProductData) => new Product(p)
        );
        state.products = productsArray;
        state.filteredProducts = productsArray;
        state.pagination = calculatePagination(
          state.pagination,
          productsArray.length
        );
        state.showedProducts = state.filteredProducts.slice(0, 10);
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = new Error(action.error.message);
      });
  },
});

export const { searchProducts, paginateProducts } = productsSlice.actions;

export const productsData = (state: RootState) => state.products.showedProducts;
export const productsStatus = (state: RootState) => state.products.status;
export const productsPagination = (state: RootState) =>
  state.products.pagination;
export const productsError = (state: RootState) => state.products.error;

export default productsSlice.reducer;
