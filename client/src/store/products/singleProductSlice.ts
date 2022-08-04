import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { storeStatus } from "../../constants/constants.enum";
import { Product } from "../../interfaces/product.interface";
import { RootState } from "../store";

const initialState = {
  product: {} as Product,
  status: storeStatus.IDLE,
  error: null,
};
export const getProduct = createAsyncThunk(
  "product/getProduct",
  async (productId: string, thunkAPI) => {
    const response = await axios.get(`/api/v1/products/${productId}`);
    return response.data.product;
  }
);
const singleProductSlice = createSlice({
  name: "singleProduct",
  initialState,
  reducers: {
    changeStatus: (state, action) => {
      state.status = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getProduct.pending, (state, action) => {
        state.status = storeStatus.LOADING;
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.status = storeStatus.SUCCEEDED;
        state.product = action.payload;
      })
      .addCase(getProduct.rejected, (state: any, action) => {
        state.status = storeStatus.FAILED;
        state.error = action.error.message;
      });
  },
});
export const selectProduct = (state: RootState) => state.productStore.product;
export const getStatus = (state: RootState) => state.productStore.status;
export const getError = (state: RootState) => state.productStore.error;
export const { changeStatus } = singleProductSlice.actions;
export default singleProductSlice.reducer;
