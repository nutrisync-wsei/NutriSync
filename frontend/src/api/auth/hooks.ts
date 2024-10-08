import { useMutation } from '@tanstack/react-query';

import AUTH_KEYS from './keys';
import AUTH_QUERIES from './queries';

export const useLogin = () => {
  return useMutation({
    mutationKey: AUTH_KEYS.LOGIN,
    mutationFn: AUTH_QUERIES.LOGIN,
    //   onSuccess: () => refetchCurrentUser(queryClient),
  });
};

export const useSignup = () => {
  return useMutation({
    mutationKey: AUTH_KEYS.SIGNUP,
    mutationFn: AUTH_QUERIES.SIGNUP,
    //   onSuccess: () => refetchCurrentUser(queryClient),
  });
};
