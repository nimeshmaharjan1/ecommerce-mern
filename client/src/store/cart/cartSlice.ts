import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems")!)
    : [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state: any, action: any) => {
      const item = action.payload;
      console.log("payload", action);
      const doesItemExist: any = state.cartItems.find(
        (cartItem: any) => cartItem._id === item._id
      );
      if (doesItemExist) {
        state.cartItems = state.cartItems.map((cartItem: any) => {
          return cartItem._id === doesItemExist._id ? item : cartItem;
        });
        console.log(state.cartItems);
      } else {
        console.log("hello");
        state.cartItems = [...state.cartItems, item];
        console.log("else", state.cartItems);
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
  },
});
export const { addToCart } = cartSlice.actions;
export const selectCartItems = (state: RootState, action: PayloadAction<any>) =>
  state.cartStore.cartItems;
export default cartSlice.reducer;
