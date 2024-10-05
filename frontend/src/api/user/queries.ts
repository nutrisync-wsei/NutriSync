import axios from "axios";
import { API_URL } from "../config";
import { UserData } from "./types";

const getUserProfile = async ({ userId }: { userId: string }) => {
  const { data } = await axios.get(`${API_URL}/user-profile/${userId}`);

  return data;
};

const updateUserProfile = async (
  userId: string,
  userData: Partial<UserData>
) => {
  const { data } = await axios.post(`${API_URL}/user-profile`, {
    userId,
    ...userData,
  });

  return data;
};

const USER_QUERIES = {
  GET_USER_PROFILE: getUserProfile,
  UPDATE_USER_PROFILE: updateUserProfile,
};

export default USER_QUERIES;
