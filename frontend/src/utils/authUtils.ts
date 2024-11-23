import { AuthUser } from '@/types/auth';

export const getAuthDataFromLocalStorage = (
  setAuthUser: (user: AuthUser | null) => void,
) => {
  const user = localStorage.getItem('user');
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');

  if (user && accessToken && refreshToken) {
    setAuthUser({
      authorized: true,
      ...JSON.parse(user),
      accessToken,
      refreshToken,
    });
  } else {
    setAuthUser({
      authorized: false,
    });
  }
};
