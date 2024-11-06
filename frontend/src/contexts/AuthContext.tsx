'use client';
import { useRouter } from 'next/navigation';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

type AuthUser = {
  id: string;
  email: string;
  username: string;
  accessToken: string;
  refreshToken: string;
};

type AuthContextType = {
  authUser: AuthUser | null;
  logout: () => void;
};

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
    const getAuthDataFromLocalStorage = () => {
      const user = localStorage.getItem('user');
      const accessToken = localStorage.getItem('accessToken');
      const refreshToken = localStorage.getItem('refreshToken');

      if (user && accessToken && refreshToken) {
        setAuthUser({
          ...JSON.parse(user),
          accessToken,
          refreshToken,
        });
      } else {
        setAuthUser(null);
      }
    };

    window.addEventListener('storage', getAuthDataFromLocalStorage);

    getAuthDataFromLocalStorage();

    return () => {
      window.removeEventListener('storage', getAuthDataFromLocalStorage);
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
    <AuthContext.Provider value={{ authUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
