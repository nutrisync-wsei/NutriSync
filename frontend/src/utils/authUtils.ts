import Cookies from 'js-cookie';

import { AuthUser } from '@/types/auth';

export const getAuthDataFromCookies = (
  setAuthUser: (user: AuthUser | null) => void,
) => {
  const user = Cookies.get('user');
  const accessToken = Cookies.get('accessToken');
  const refreshToken = Cookies.get('refreshToken');

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
    getAuthDataFromCookies(setAuthUser);
  }
};
