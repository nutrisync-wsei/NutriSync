import _ from 'lodash';

import axiosInstance from '@/api/axiosSetup';

import { UserData, UserHealthIndicators } from './types';

const getUserProfile = async ({ userId }: { userId: string }) => {
  const { data } = await axiosInstance.get(`/user-profile/${userId}`);

  return data;
};

const setHealthIndicators = async (
  userData: UserData,
): Promise<UserHealthIndicators> => {
  const { data } = await axiosInstance.post('/health-indicators/metrics', {
    ..._.omit(userData, ['_id', '__v']),
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
  SET_HEALTH_INDICATORS: setHealthIndicators,
  CREATE_USER_PROFILE: createUserProfile,
  UPDATE_USER_PROFILE: updateUserProfile,
};

export default USER_QUERIES;
