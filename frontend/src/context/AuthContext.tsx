// src/context/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
// 🛠️ FIX: Import your custom instance AND its exposed setAccessToken function!
import api, { setAccessToken as setAxiosToken } from '../api/axios'; 

interface AuthContextType {
  user: any;
  loading: boolean;
  login: (userData: any, token: string) => void;
  logout: () => Promise<void>;
  setAccessToken: (token: string | null) => void;
  getAccessToken: () => string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

let memoryToken: string | null = null;

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // 🛠️ FIX: Sync token both locally in memory AND down to the axios instance
  const setAccessToken = (token: string | null) => {
    memoryToken = token;
    setAxiosToken(token); 
  };

  const getAccessToken = () => memoryToken;

  const login = (userData: any, token: string) => {
    setAccessToken(token); // Sets token first (and syncs it to Axios)
    setUser(userData);
  };

  const logout = async () => {
    try {
      await api.post('/auth/logout');
      
    } catch (err) {
      console.error("Logout request failed:", err);
    } finally {
      setUser(null);
      setAccessToken(null); // Clears from context and Axios instance cleanly
    }
  };

  useEffect(() => {
    const verifySession = async () => {
      try {
        const response = await api.post('/auth/refresh');
        
        setUser(response.data.user);
        setAccessToken(response.data.accessToken); // Populates token on load
      } catch (error) {
        console.log("No active session found on initialization.");
      } finally {
        setLoading(false);
      }
    };

    verifySession();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, setAccessToken, getAccessToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};