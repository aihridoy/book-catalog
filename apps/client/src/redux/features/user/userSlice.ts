import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { IUser, UserState } from "../../../types";
import { jwtDecode } from "jwt-decode";

const initialState: UserState = {
  user: null,
  isLoading: false,
  isError: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser | null>) => {
      state.user = action.payload;
      if (action.payload?.token) {
        localStorage.setItem("token", action.payload.token);
      } else {
        localStorage.removeItem("token");
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.isError = action.payload !== null;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.isLoading = false;
      state.isError = false;
      state.error = null;
      localStorage.removeItem("token");
    },
    loadUser: (state) => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const decoded: {
            id: string;
            email: string;
            username: string;
            createdAt: string;
            iat: number;
            exp: number;
          } = jwtDecode(token);
          if (decoded.exp * 1000 > Date.now()) {
            state.user = {
              _id: decoded.id,
              email: decoded.email,
              username: decoded.username,
              createdAt: decoded.createdAt,
              token,
            } as IUser;
          } else {
            localStorage.removeItem("token");
          }
        } catch {
          localStorage.removeItem("token");
        }
      }
    },
  },
});

export const { setUser, setLoading, setError, logout, loadUser } =
  userSlice.actions;
export default userSlice.reducer;
