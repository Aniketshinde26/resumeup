import type { User } from "./user";

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (userData: User, token: string) => void;
  logout: () => Promise<void>;
  setAccessToken: (token: string | null) => void;
  getAccessToken: () => string | null;
}
