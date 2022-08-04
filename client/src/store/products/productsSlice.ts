import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { storeStatus } from "../../constants/constants.enum";
import { Product } from "../../interfaces/product.interface";
import { RootState } from "../store";

const initialState = {
  products: [] as Product[],
  status: storeStatus.IDLE, //'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};
export const getAllProducts = createAsyncThunk(
  "products/getAllProducts",
  async (keyword: string = "", thunkAPI) => {
    const response = await axios.get(`/api/v1/products?keyword=${keyword}`);
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
export const selectSingleProduct = (state: RootState, productId: string) => {
  return state.productsStore.products.find(
    (product) => product._id === productId
  );
};
export default productsSlice.reducer;
