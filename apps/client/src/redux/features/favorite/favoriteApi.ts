import type { FavoritesResponse } from "../../../types";
import { api } from "../../api/apiSlice";

const favoritesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    addToFavorites: builder.mutation<FavoritesResponse, { bookId: string }>({
      query: (body) => ({
        url: "/favorites",
        method: "POST",
        body,
      }),
      invalidatesTags: ["User"],
    }),
    removeFromFavorites: builder.mutation<FavoritesResponse, string>({
      query: (bookId) => ({
        url: `/favorites/${bookId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
    getFavorites: builder.query<FavoritesResponse, void>({
      query: () => "/favorites",
      providesTags: ["User"],
    }),
  }),
});

export const {
  useAddToFavoritesMutation,
  useRemoveFromFavoritesMutation,
  useGetFavoritesQuery,
} = favoritesApi;
