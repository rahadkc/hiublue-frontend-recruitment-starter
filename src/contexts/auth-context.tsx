import { ENDPOINTS } from '@/lib/constants';
import apiClient from '@/services/api';
import React, { createContext, useContext, useEffect, useState } from 'react';

type AuthUser = {
  id: string;
  name: string;
  email: string;
};

interface AuthContextType {
  isAuthenticated: boolean;
  user: AuthUser | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    // Check LocalStorage for authentication state on initial load
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    if (storedToken && storedUser) {
      setIsAuthenticated(true);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const result = await apiClient.post(ENDPOINTS.login, {
        email,
        password,
      });
      const { user, token } = result.data;
      setIsAuthenticated(true);
      setUser(user);
      //   document.cookie = `token=${token}; path=/; max-age=3600`; // 1 hour expiry
      document.cookie = `token=${token}; path=/; Secure; SameSite=Strict;`;
      document.cookie = `user=${JSON.stringify(user)}; path=/; Secure; SameSite=Strict;`;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      return result.data;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('Something is wrong!');
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    document.cookie = 'user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';

    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
