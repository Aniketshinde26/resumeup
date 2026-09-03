export interface User {
  id: number;
  email: string;
  fullname: string;
  picture?: string;
  createdAt?: string;
}

export interface AuthResponse {
  accessToken: string;
  user: User;
}

export interface ResetPasswordResponse {
  message: string;
}

export interface RegisterResponse {
  message: string;
}
