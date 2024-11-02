import axiosInstance from '@/api/axiosSetup';
import { API_URL } from '@/api/config';

import { UserData, UserHealthIndicators } from './types';

const getUserProfile = async ({ userId }: { userId: string }) => {
  const { data } = await axiosInstance.get(`${API_URL}/user-profile/${userId}`);

  return data;
};

const getHealthIndicators = async (
  userData: UserData,
): Promise<UserHealthIndicators> => {
  const { data } = await axiosInstance.post(
    `${API_URL}/health-indicators/metrics`,
    {
      ...userData,
      gender: 'male',
    },
  );

  return data;
};

const createUserProfile = async (user: string, userData: Partial<UserData>) => {
  const { data } = await axiosInstance.post(`${API_URL}/user-profile`, {
    user,
    ...userData,
  });

  return data;
};

const updateExtendedUserProfile = async (
  user: string,
  userData: Partial<UserData>,
) => {
  const { data } = await axiosInstance.put(
    `${API_URL}/user-profile/${user}/extended`,
    {
      ...userData,
    },
  );

  return data;
};

const USER_QUERIES = {
  GET_USER_PROFILE: getUserProfile,
  GET_HEALTH_INDICATORS: getHealthIndicators,
  CREATE_USER_PROFILE: createUserProfile,
  UPDATE_EXTENDED_USER_PROFILE: updateExtendedUserProfile,
};

export default USER_QUERIES;
