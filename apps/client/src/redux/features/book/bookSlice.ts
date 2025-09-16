import { createSlice } from "@reduxjs/toolkit";
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
  reducers: {},
});

export default bookSlice.reducer;
