import axiosInstance from '@/api/axiosSetup';

import { UserData, UserHealthIndicators } from './types';

const getUserProfile = async ({ userId }: { userId: string }) => {
  const { data } = await axiosInstance.get(`/user-profile/${userId}`);

  return data;
};

const getHealthIndicators = async (
  userData: UserData,
): Promise<UserHealthIndicators> => {
  const { data } = await axiosInstance.post('/health-indicators/metrics', {
    ...userData,
    gender: 'male',
  });

  return data;
};

const createUserProfile = async (user: string, userData: Partial<UserData>) => {
  const { data } = await axiosInstance.post('/user-profile', {
    user,
    ...userData,
  });

  return data;
};

const updateUserProfile = async (user: string, userData: Partial<UserData>) => {
  const { data } = await axiosInstance.put(`/user-profile/${user}`, {
    ...userData,
  });

  return data;
};

const USER_QUERIES = {
  GET_USER_PROFILE: getUserProfile,
  GET_HEALTH_INDICATORS: getHealthIndicators,
  CREATE_USER_PROFILE: createUserProfile,
  UPDATE_USER_PROFILE: updateUserProfile,
};

export default USER_QUERIES;
