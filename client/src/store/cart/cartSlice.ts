import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getLocalStorage } from "../../utils/localStorage";
import { toast } from "../../utils/notification";
import { RootState } from "../store";

const initialState = {
  cartItems: [],
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    checkLocalStorage: (state) => {
      if (getLocalStorage("cartItems")) {
        state.cartItems = getLocalStorage("cartItems");

        console.log("Cart Items have been retrieved");
        toast("Success", "Cart items have been retrieved", "success", 1);
      } else {
        console.log("no cart items");
      }
    },
    addToCart: (state: any, action: any) => {
      const item = action.payload;
      console.log("payload", action);
      const doesItemExist: any = state.cartItems.find(
        (cartItem: any) => cartItem.product === item.product
      );
      if (doesItemExist) {
        state.cartItems = state.cartItems.map((cartItem: any) => {
          return cartItem.product === doesItemExist.product ? item : cartItem;
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
export const { addToCart, checkLocalStorage } = cartSlice.actions;
export const selectCartItems = (state: RootState, action: PayloadAction<any>) =>
  state.cartStore.cartItems;
export default cartSlice.reducer;
