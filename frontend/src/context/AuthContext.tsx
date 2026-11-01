import React, { useState, useEffect } from 'react';
import api, { setAccessToken as setAxiosToken } from '../api/axios'; 
import type { User } from '../types/user';
import { AuthContext } from './auth-context';

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
    } catch (err) {
      console.error("Logout request failed:", err);
    } finally {
      setUser(null);
      setAccessToken(null);
    }
  };

  useEffect(() => {
    const verifySession = async () => {
      try {
        const response = await api.post<{ user: User; accessToken: string }>('/auth/refresh');
        
        setAccessToken(response.data.accessToken);
        setUser(response.data.user);
      } catch {
        setAccessToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    verifySession();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-slate-400 font-medium tracking-wide">Loading ResumeUp...</p>
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, setAccessToken, getAccessToken }}>
      {children}
    </AuthContext.Provider>
  );
};