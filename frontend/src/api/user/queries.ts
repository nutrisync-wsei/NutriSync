import axiosInstance from '@/api/axiosSetup';
import { API_URL } from '@/api/config';

import { UserData } from './types';

const getUserProfile = async ({ userId }: { userId: string }) => {
  const { data } = await axiosInstance.get(`${API_URL}/user-profile/${userId}`);

  return data;
};

const updateUserProfile = async (user: string, userData: Partial<UserData>) => {
  const { data } = await axiosInstance.post(`${API_URL}/user-profile`, {
    user,
    ...userData,
  });

  return data;
};

const USER_QUERIES = {
  GET_USER_PROFILE: getUserProfile,
  UPDATE_USER_PROFILE: updateUserProfile,
};

export default USER_QUERIES;
