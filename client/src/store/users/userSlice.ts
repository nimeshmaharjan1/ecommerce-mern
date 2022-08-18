import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { storeStatus } from "../../constants/constants.enum";
import { User } from "../../interfaces/user.interface";
import { axiosPost } from "../../utils/axios";
import { getLocalStorage, setLocalStorage } from "../../utils/localStorage";
import { RootState } from "../store";
const initialState = {
  user: getLocalStorage("user") ? getLocalStorage("user") : undefined,
  status: storeStatus.IDLE,
  error: undefined,
  isAuthenticated: false,
};
interface Login {
  username: string;
  password: string;
}
export interface Register {
  username: string;
  password: string;
  email: string;
  name: string;
  avatar: any;
}
export const login = createAsyncThunk(
  "users/login",
  async (data: Login, thunkAPI) => {
    const { username, password } = data;
    const response = (await axiosPost("/api/v1/users/login", {
      username,
      password,
    })) as any;
    return response.data.user;
  }
);
export const register = createAsyncThunk(
  "users/register",
  async (data: Register, thunkAPI) => {
    const config = { headers: { "Content-Type": "multipart/form-data" } };
    const { username, password, email, name, avatar } = data;
    const response = (await axios.post(
      "/api/v1/users/register",
      {
        username,
        password,
        email,
        name,
        avatar,
      },
      config
    )) as any;
    return response.data;
  }
);
const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    logout: (state, action) => {
      state.user = undefined as any;
      console.log("logout", state.user);
    },
    clearErrors: (state, action) => {
      state.error = undefined;
    },
    authenticate: (state) => {
      state.isAuthenticated = true;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(login.pending, (state, action) => {
        state.status = storeStatus.LOADING;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = storeStatus.SUCCEEDED;
        state.user = action.payload as User;
        state.isAuthenticated = true;
        setLocalStorage("user", action.payload);
      })
      .addCase(login.rejected, (state, action) => {
        state.status = storeStatus.FAILED;
        state.error = action.error.message as any;
      })
      .addCase(register.pending, (state, action) => {
        state.status = storeStatus.LOADING;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status = storeStatus.SUCCEEDED;
        console.log("register:", action.payload);
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.status = storeStatus.FAILED;
        state.error = action.error.message as any;
        setLocalStorage("user", action.payload);
      });
  },
});
export const selectUser = (state: RootState) => state.userStore.user;
export const selectStatus = (state: RootState) => state.userStore.status;
export const selectIsAuthenticated = (state: RootState) =>
  state.userStore.isAuthenticated;
export const { logout, clearErrors, authenticate } = userSlice.actions;
export default userSlice.reducer;
