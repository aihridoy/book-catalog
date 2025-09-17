import type { IBook, IBookResponse } from "../../../types";
import { api } from "../../api/apiSlice";

const bookApi = api.injectEndpoints({
  endpoints: (builder) => ({
    addBook: builder.mutation<IBook, Partial<IBook> & { userId: string }>({
      query: (bookData) => ({
        url: "/book",
        method: "POST",
        body: bookData,
      }),
      invalidatesTags: ["Book"],
    }),
    getBooks: builder.query<
      IBookResponse,
      { search?: string; genre?: string; year?: string }
    >({
      query: ({ search, genre, year }) => {
        const params = new URLSearchParams();
        if (search) params.append("search", search);
        if (genre) params.append("genre", genre);
        if (year) params.append("year", year);
        return {
          url: `/books?${params.toString()}`,
        };
      },
      providesTags: ["Book"],
    }),
    getBookById: builder.query<{ status: boolean; data: IBook }, string>({
      query: (id) => `/books/${id}`,
      providesTags: ["Book"],
    }),
    editBook: builder.mutation<
      IBook,
      { id: string; data: Partial<IBook> & { userId: string } }
    >({
      query: ({ id, data }) => ({
        url: `/books/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Book"],
    }),
    deleteBook: builder.mutation<void, string>({
      query: (id) => ({
        url: `/books/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Book"],
    }),
  }),
});

export const {
  useAddBookMutation,
  useGetBooksQuery,
  useGetBookByIdQuery,
  useEditBookMutation,
  useDeleteBookMutation,
} = bookApi;
