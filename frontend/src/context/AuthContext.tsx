import React, { createContext, useContext, useState, useEffect } from 'react';
import api, { setAccessToken as setAxiosToken } from '../api/axios'; 
import type { AuthContextType } from '../types/auth';
import type { User } from '../types/user';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

let memoryToken: string | null = null;

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const setAccessToken = (token: string | null) => {
    memoryToken = token;
    setAxiosToken(token); 
  };

  const getAccessToken = () => memoryToken;

  const login = (userData: User, token: string) => {
    setAccessToken(token); 
    setUser(userData);
  };

const logout = async () => {
    try {
      await api.post('/auth/logout');
      setUser(null);
      setAccessToken(null);
    } catch (err) {
      console.error("Logout request failed:", err);
      throw err; 
    }
  };

  useEffect(() => {
    const verifySession = async () => {
      try {
        const response = await api.post<{ user: User; accessToken: string }>('/auth/refresh');
        
        setUser(response.data.user);
        setAccessToken(response.data.accessToken); 
      } catch (error) {
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