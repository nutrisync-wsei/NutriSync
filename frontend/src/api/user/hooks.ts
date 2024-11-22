import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { useAuth } from '@/contexts/AuthContext';

import USER_KEYS from './keys';
import USER_QUERIES from './queries';
import { UserData, UserProgress } from './types';

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

export const useUserProgress = () => {
  const { authUser } = useAuth();
  return useQuery({
    queryKey: [...USER_KEYS.GET_USER_PROGRESS, authUser?.id],
    queryFn: () => USER_QUERIES.GET_USER_PROGRESS(authUser?.id ?? ''),
    enabled: Boolean(authUser?.id),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useCreateUserProfile = () => {
  const { authUser } = useAuth();
  const queryClient = useQueryClient();
  const setHealth = useSetHealthIndicators();

  return useMutation({
    mutationKey: [...USER_KEYS.CREATE_USER_PROFILE, authUser?.id],
    mutationFn: (userData: Partial<UserData>) =>
      USER_QUERIES.CREATE_USER_PROFILE(authUser?.id ?? '', userData),
    onSuccess: (profileData) => {
      queryClient.invalidateQueries({
        queryKey: [...USER_KEYS.GET_USER_PROFILE, authUser?.id],
      });
      setHealth.mutate(profileData);
    },
  });
};

export const useUpdateUserProfile = () => {
  const { authUser } = useAuth();
  const queryClient = useQueryClient();
  const setHealth = useSetHealthIndicators();

  return useMutation({
    mutationKey: [...USER_KEYS.UPDATE_USER_PROFILE, authUser?.id],
    mutationFn: (userData: Partial<UserData>) =>
      USER_QUERIES.UPDATE_USER_PROFILE(authUser?.id ?? '', userData),
    onSuccess: (profileData) => {
      queryClient.invalidateQueries({
        queryKey: [...USER_KEYS.GET_USER_PROFILE, authUser?.id],
      });
      setHealth.mutate(profileData);
    },
  });
};

export const useUpdateUserProgress = () => {
  const { authUser } = useAuth();
  const queryClient = useQueryClient();
  const setHealth = useSetHealthIndicators();

  return useMutation({
    mutationKey: [...USER_KEYS.UPDATE_USER_PROGRESS, authUser?.id],
    mutationFn: (progress: UserProgress) =>
      USER_QUERIES.UPDATE_USER_PROGRESS(authUser?.id ?? '', progress),
    onSuccess: (profileData) => {
      queryClient.invalidateQueries({
        queryKey: [...USER_KEYS.GET_USER_PROFILE, authUser?.id],
      });

      setHealth.mutate(profileData);
    },
  });
};

export const useSetHealthIndicators = () => {
  const queryClient = useQueryClient();
  const { authUser } = useAuth();

  return useMutation({
    mutationKey: [...USER_KEYS.SET_HEALTH_INDICATORS, authUser?.id],
    mutationFn: (userData: UserData) =>
      USER_QUERIES.SET_HEALTH_INDICATORS(userData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [...USER_KEYS.GET_USER_PROFILE, authUser?.id],
      });
    },
  });
};
