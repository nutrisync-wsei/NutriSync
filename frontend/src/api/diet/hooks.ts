import { useMutation, useQuery } from '@tanstack/react-query';

import { useAuth } from '@/contexts/AuthContext';

import DIET_KEYS from './key';
import DIET_QUERIES from './queries';

export const useGenerateDietPlan = () => {
  const { authUser } = useAuth();

  return useMutation({
    mutationKey: [DIET_KEYS.GENERATE_PLAN, authUser?.id],
    mutationFn: () => DIET_QUERIES.GENERATE_PLAN(authUser?.id ?? ''),
  });
};

export const useMeals = () => {
  const { authUser } = useAuth();

  return useQuery({
    queryKey: [...DIET_KEYS.GET_MEALS, authUser?.id],
    queryFn: () => DIET_QUERIES.GET_MEALS(authUser?.id ?? ''),
    enabled: Boolean(authUser?.id),
    staleTime: 10 * 60 * 1000, // 10 minuty
  });
};
