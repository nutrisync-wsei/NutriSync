import Cookies from 'js-cookie';
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

const AuthContext = createContext<AuthUser | null>(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authUser, setAuthUser] = useState<AuthUser | null>(null);

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
      }
    };

    getAuthDataFromCookies();

    return () => setAuthUser(null);
  }, []);

  return (
    <AuthContext.Provider value={authUser}>{children}</AuthContext.Provider>
  );
};
