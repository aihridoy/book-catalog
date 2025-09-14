import { configureStore } from "@reduxjs/toolkit";
import userReducer, { loadUser } from "./features/user/userSlice";
import { api } from "./api/apiSlice";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

store.dispatch(loadUser());

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
