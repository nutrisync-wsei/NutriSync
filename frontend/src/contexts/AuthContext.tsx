'use client';
import { useRouter } from 'next/navigation';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

import { AuthContextType, AuthUser } from '@/types/auth';
import { getAuthDataFromLocalStorage } from '@/utils/authUtils';

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within a AuthProvider');
  return context;
};
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authUser, setAuthUser] = useState<AuthUser | null>(null);
  const router = useRouter();

  useEffect(() => {
    const handleStorage = () => getAuthDataFromLocalStorage(setAuthUser);

    window.addEventListener('storage', handleStorage);

    handleStorage();

    return () => {
      window.removeEventListener('storage', handleStorage);
    };
  }, []);

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    setAuthUser(null);

    window.dispatchEvent(new Event('storage'));
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
