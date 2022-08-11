import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cart/cartSlice";
import productSlice from "./products/productsSlice";
import singleProductSlice from "./products/singleProductSlice";
import userSlice from "./users/userSlice";
export const store = configureStore({
  reducer: {
    productsStore: productSlice,
    productStore: singleProductSlice,
    userStore: userSlice,
    cartStore: cartSlice,
  },
});
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
