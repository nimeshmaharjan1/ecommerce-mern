import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useNavigate } from "react-router";
import { storeStatus } from "../../constants/constants.enum";
import { axiosPost } from "../../utils/axios";
import { RootState } from "../store";
const initialState = {
  user: null,
  status: storeStatus.IDLE,
  error: undefined,
};
interface Login {
  username: string;
  password: string;
}
export const login = createAsyncThunk(
  "users/login",
  async (data: Login, thunkAPI) => {
    const { username, password } = data;
    const response = await axiosPost("/api/v1/users/login", {
      username,
      password,
    });
    return response.data.user;
  }
);
const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    logout: (state, action) => {
      state.user = null;
      console.log("logout", state.user);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(login.pending, (state, action) => {
        state.status = storeStatus.LOADING;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = storeStatus.SUCCEEDED;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = storeStatus.FAILED;
        state.error = action.error.message as any;
      });
  },
});
export const selectUser = (state: RootState) => state.userStore.user;
export const selectStatus = (state: RootState) => state.userStore.status;
export const { logout } = userSlice.actions;
export default userSlice.reducer;
