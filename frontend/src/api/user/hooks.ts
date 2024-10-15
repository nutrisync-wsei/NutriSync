import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { useAuth } from '@/contexts/AuthContext';

import USER_KEYS from './keys';
import USER_QUERIES from './queries';
import { UserData } from './types';

export const useUserProfile = () => {
  const authUser = useAuth();

  return useQuery({
    queryKey: USER_KEYS.GET_USER_PROFILE,
    queryFn: USER_QUERIES.GET_USER_PROFILE.bind(null, {
      userId: authUser?.id ?? '',
    }),
    enabled: Boolean(authUser?.id),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useUpdateUserProfile = () => {
  const authUser = useAuth();
  const { refetchQueries } = useQueryClient();

  return useMutation({
    mutationKey: USER_KEYS.UPDATE_USER_PROFILE,
    mutationFn: (userData: Partial<UserData>) =>
      USER_QUERIES.UPDATE_USER_PROFILE(authUser?.id ?? '', userData),
    onSuccess: () =>
      refetchQueries({
        queryKey: USER_KEYS.GET_USER_PROFILE,
      }),
  });
};
