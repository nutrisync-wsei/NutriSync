'use client';
import Cookies from 'js-cookie';
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
    const getAuthDataFromCookies = () => {
      const accessToken = Cookies.get('accessToken');
      const refreshToken = Cookies.get('refreshToken');

      const userInfo = Cookies.get('userInfo');

      if (accessToken && refreshToken && userInfo) {
        setAuthUser({
          accessToken,
          refreshToken,
          ...JSON.parse(userInfo),
        });
      } else {
        setAuthUser(null);
      }
    };

    getAuthDataFromCookies();

    return () => setAuthUser(null);
  }, []);

  const logout = () => {
    Cookies.remove('accessToken', { path: '/' });
    Cookies.remove('refreshToken', { path: '/' });
    Cookies.remove('userInfo', { path: '/' });
    setAuthUser(null);

    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ authUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
