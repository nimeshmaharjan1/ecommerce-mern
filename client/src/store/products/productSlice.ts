import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

const initialState = {
  products: [],
  status: "idle", //'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};
export const getAllProducts = createAsyncThunk(
  "products/getAllProducts",
  async () => {
    const response = await axios.get("/api/v1/products");
    return response.data;
  }
);
const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getAllProducts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload.products;
      })
      .addCase(getAllProducts.rejected, (state: any, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const selectAllProducts = (state: RootState) =>
  state.productStore.products;
export const getProductStatus = (state: RootState) => state.productStore.status;
export const getProductError = (state: RootState) => state.productStore.error;

export default productSlice.reducer;
