"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import { SessionExpired } from "@/components/SessionExpired";
import { clearUserData } from "@/utils/auth";

interface User {
  id: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showSessionExpired, setShowSessionExpired] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      // Don't check auth on the auth page
      if (window.location.pathname === '/auth') {
        setIsLoading(false);
        return;
      }

      try {
        const token = localStorage.getItem('auth_token');
        if (!token) {
          setUser(null);
          setIsLoading(false);
          setShowSessionExpired(true);
          return;
        }

        const userData = await api.get('/api/v1/auth/me');
        setUser(userData);
        setIsLoading(false);
      } catch (error) {
        setUser(null);
        setIsLoading(false);
        setShowSessionExpired(true);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const data = await api.post('/api/v1/auth/login', { email, password });
      localStorage.setItem('auth_token', data.token);
      document.cookie = `auth_token=${data.token}; path=/; secure; samesite=strict`;
      const userData = await api.get('/api/v1/auth/me');
      setUser(userData);
      router.push('/');
    } catch (error: any) {
      throw new Error(error.message || 'Login failed. Please try again.');
    }
  };

  const signup = async (email: string, password: string) => {
    try {
      const data = await api.post('/api/v1/auth/signup', { email, password });
      localStorage.setItem('auth_token', data.token);
      document.cookie = `auth_token=${data.token}; path=/; secure; samesite=strict`;
      const userData = await api.get('/api/v1/auth/me');
      setUser(userData);
      router.push('/');
    } catch (error: any) {
      throw new Error(error.message || 'Signup failed. Please try again.');
    }
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    document.cookie = 'auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    setUser(null);
    router.push('/auth');
  };

  if (showSessionExpired) {
    return <SessionExpired />;
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};