// src/redux/features/book/bookSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { IBook } from "../../../types";

interface BookState {
  books: IBook[];
  selectedBook: IBook | null;
  isLoading: boolean;
  isError: boolean;
  error: string | null;
}

const initialState: BookState = {
  books: [],
  selectedBook: null,
  isLoading: false,
  isError: false,
  error: null,
};

const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    setBooks: (state, action: PayloadAction<IBook[]>) => {
      state.books = action.payload;
    },
    setSelectedBook: (state, action: PayloadAction<IBook | null>) => {
      state.selectedBook = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.isError = action.payload !== null;
      state.error = action.payload;
    },
  },
});

export const { setBooks, setSelectedBook, setLoading, setError } =
  bookSlice.actions;
export default bookSlice.reducer;
