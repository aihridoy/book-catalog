export interface IUser {
  _id?: string;
  email: string;
  username: string;
  password?: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
  token?: string;
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
