export interface IUser {
  _id?: string;
  email: string;
  username: string;
  password?: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
  token?: string;
  favorites?: string[];
}
export interface AuthResponse {
  status: boolean;
  data: IUser & { token: string };
  message?: string;
  error?: string;
}

export interface UserState {
  user: IUser | null;
  isLoading: boolean;
  isError: boolean;
  error: string | null;
}

export interface UserSignUp {
  email: string;
  password: string;
  username: string;
  confirmPassword: string;
}

export interface UserLogin {
  email: string;
  password: string;
}

export interface IBook {
  _id?: string;
  image: string;
  title: string;
  author: string;
  genre: string;
  publicationDate: string;
  userId: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}
export interface IBookResponse {
  status: boolean;
  data: IBook[];
  error?: string;
}

export interface MyBooksProps {
  selectedGenre: string | null;
  setSelectedGenre: (genre: string | null) => void;
  genres: string[];
  isLoading: boolean;
  displayedBooks: IBook[];
  handleEditBook: (book: IBook) => void;
  handleDeleteBook: (bookId: string) => void;
  isDeleting: boolean;
}

export interface EditBookModalProps {
  editingBook: IBook | null;
  setEditingBook: (book: IBook | null) => void;
  setEditFormData: (data: Partial<IBook>) => void;
  editFormData: Partial<IBook>;
  handleInputChange: (field: keyof IBook, value: string) => void;
  handleSaveEdit: () => void;
  isEditing: boolean;
}

export interface FavoritesResponse {
  status: boolean;
  data: string[] | IBook[];
  message?: string;
  error?: string;
}
