import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { storeStatus } from "../../constants/constants.enum";
import { Product } from "../../interfaces/product.interface";
import { RootState } from "../store";
export interface Query {
  keyword: string;
  currentPage: number;
  price: Array<number> | [0, 250000];
  category: string | null;
  rating: number;
}
const initialState = {
  products: [] as Product[],
  status: storeStatus.IDLE, //'idle' | 'loading' | 'succeeded' | 'failed',
  productsCount: undefined,
  error: null,
  resultsPerPage: undefined,
};
export const getAllProducts = createAsyncThunk(
  "products/getAllProducts",
  async (query: Query, thunkAPI) => {
    const { keyword = "", currentPage, price, category, rating } = query;
    let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&rating[gte]=${rating}`;
    if (query.category) {
      link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&rating[gte]=${rating}`;
    }
    const response = await axios.get(link);
    return response.data;
  }
);
const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getAllProducts.pending, (state, action) => {
        state.status = storeStatus.LOADING;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.status = storeStatus.SUCCEEDED;
        state.productsCount = action.payload.productsCount;
        state.products = action.payload.products;
      })
      .addCase(getAllProducts.rejected, (state: any, action) => {
        state.status = storeStatus.FAILED;
        state.error = action.error.message;
      });
  },
});

export const selectAllProducts = (state: RootState) =>
  state.productsStore.products;
export const getProductStatus = (state: RootState) =>
  state.productsStore.status;
export const getProductError = (state: RootState) => state.productsStore.error;
export const getProductsCount = (state: RootState) =>
  state.productsStore.productsCount;
export const getResultsPerPage = (state: RootState) =>
  state.productsStore.resultsPerPage;
export const selectSingleProduct = (state: RootState, productId: string) => {
  return state.productsStore.products.find(
    (product) => product._id === productId
  );
};
export default productsSlice.reducer;
