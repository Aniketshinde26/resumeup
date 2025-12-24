// Use "export" so other files can use this blueprint
export interface User {
  id: string;
  email: string;
  fullname: string;
  createdAt?: string;
}

// You can also define your Auth state here
export interface AuthResponse {
  accessToken: string;
  user: User;
}
