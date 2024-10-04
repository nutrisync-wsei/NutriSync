import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import USER_QUERIES from "./queries";
import USER_KEYS from "./keys";

export const useUserProfile = () => {
  // const { data: user } = useAuthUser();
  return useQuery({
    queryKey: USER_KEYS.GET_USER_PROFILE,
    // queryFn: USER_QUERIES.GET_USER_PROFILE.bind(null, { userId: user?.id }),
    // enabled: Boolean(user?.id),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useUpdateUserProfile = () => {
  // const { data: user } = useAuthUser();
  const { refetchQueries } = useQueryClient();

  return useMutation({
    mutationKey: USER_KEYS.UPDATE_USER_PROFILE,
    // mutationFn: USER_QUERIES.UPDATE_USER_PROFILE.bind(null, user?.id),
    // enabled: Boolean(user?.id),
    onSuccess: () =>
      refetchQueries({
        queryKey: USER_KEYS.GET_USER_PROFILE,
      }),
  });
};
