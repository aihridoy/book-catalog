import type { AuthResponse, IUser } from "../../../types";
import { api } from "../../api/apiSlice";

const userApi = api.injectEndpoints({
  endpoints: (build) => ({
    addUser: build.mutation<AuthResponse, Partial<IUser>>({
      query: (userData) => ({
        url: "/user",
        method: "POST",
        body: userData,
      }),
      invalidatesTags: ["User"],
    }),
    getUser: build.query<IUser, string>({
      query: (email) => ({
        url: `/user/${email}`,
      }),
      providesTags: ["User"],
    }),
    login: build.mutation<AuthResponse, Pick<IUser, "email" | "password">>({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["User"],
    }),
    logout: build.mutation<void, void>({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
    }),
  }),
});

export const {
  useAddUserMutation,
  useGetUserQuery,
  useLoginMutation,
  useLogoutMutation,
} = userApi;
