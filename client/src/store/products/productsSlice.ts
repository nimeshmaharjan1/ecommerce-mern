import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { storeStatus } from "../../constants/constants.enum";
import { Product } from "../../interfaces/product.interface";
import { RootState } from "../store";
export interface Query {
  keyword: string;
  currentPage: number;
}
const initialState = {
  products: [] as Product[],
  status: storeStatus.IDLE, //'idle' | 'loading' | 'succeeded' | 'failed',
  productsCount: 0,
  error: null,
};
export const getAllProducts = createAsyncThunk(
  "products/getAllProducts",
  async (query: Query, thunkAPI) => {
    console.log("query", query);
    const { keyword = "", currentPage } = query;
    const response = await axios.get(
      `/api/v1/products?keyword=${keyword}&page=${currentPage}`
    );
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
        state.productsCount = action.payload.productCount;
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
export const selectSingleProduct = (state: RootState, productId: string) => {
  return state.productsStore.products.find(
    (product) => product._id === productId
  );
};
export default productsSlice.reducer;
