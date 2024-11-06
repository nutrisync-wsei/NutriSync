import { useMutation } from '@tanstack/react-query';

import { useAuth } from '@/contexts/AuthContext';
import { getAuthDataFromLocalStorage } from '@/utils/authUtils';

import AUTH_KEYS from './keys';
import AUTH_QUERIES from './queries';

export const useLogin = () => {
  const { setAuthUser } = useAuth();

  return useMutation({
    mutationKey: AUTH_KEYS.LOGIN,
    mutationFn: AUTH_QUERIES.LOGIN,
    onSuccess: () => {
      getAuthDataFromLocalStorage(setAuthUser);
    },
  });
};

export const useSignup = () => {
  const { setAuthUser } = useAuth();

  return useMutation({
    mutationKey: AUTH_KEYS.SIGNUP,
    mutationFn: AUTH_QUERIES.SIGNUP,
    onSuccess: () => {
      getAuthDataFromLocalStorage(setAuthUser);
    },
  });
};
