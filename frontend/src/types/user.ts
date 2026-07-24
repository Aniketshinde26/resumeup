// Use "export" so other files can use this blueprint
export interface User {
  id: number;
  email: string;
  fullname: string;
  createdAt?: string;
}

export interface AuthResponse {
  accessToken: string;
  user: User;
}
  