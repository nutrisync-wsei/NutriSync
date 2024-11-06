import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { useAuth } from '@/contexts/AuthContext';

import USER_KEYS from './keys';
import USER_QUERIES from './queries';
import { UserData } from './types';

export const useUserProfile = () => {
  const { authUser } = useAuth();

  return useQuery({
    queryKey: [...USER_KEYS.GET_USER_PROFILE, authUser?.id],
    queryFn: USER_QUERIES.GET_USER_PROFILE.bind(null, {
      userId: authUser?.id ?? '',
    }),
    enabled: Boolean(authUser?.id),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useCreateUserProfile = () => {
  const { authUser } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [...USER_KEYS.CREATE_USER_PROFILE, authUser?.id],
    mutationFn: (userData: Partial<UserData>) =>
      USER_QUERIES.CREATE_USER_PROFILE(authUser?.id ?? '', userData),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [...USER_KEYS.GET_USER_PROFILE, authUser?.id],
      }),
  });
};

export const useUpdateUserProfile = () => {
  const { authUser } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [...USER_KEYS.UPDATE_USER_PROFILE, authUser?.id],
    mutationFn: (userData: Partial<UserData>) =>
      USER_QUERIES.UPDATE_USER_PROFILE(authUser?.id ?? '', userData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [...USER_KEYS.GET_USER_PROFILE, authUser?.id],
      });
    },
  });
};

export const useHealthIndicators = () => {
  const { authUser } = useAuth();
  const { data } = useUserProfile();

  return useQuery({
    queryKey: [...USER_KEYS.GET_HEALTH_INDICATORS, authUser?.id],
    queryFn: USER_QUERIES.GET_HEALTH_INDICATORS.bind(null, data),
    enabled: Boolean(data),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};
