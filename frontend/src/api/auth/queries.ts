import axios from "axios";

import { API_URL } from "@/api/config";
import { LoginFormValues, SignupFormValues } from "@/types/auth";

const login = async ({ email, password }: LoginFormValues) => {
  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  const { data } = await axios.post(
    "http://localhost:3001/auth/login",
    {
      email,
      password,
    },
    {
      withCredentials: true,
    }
  );

  return data;
};

const signup = async ({ email, password, name }: SignupFormValues) => {
  if (!email || !password || !name) {
    throw new Error("Email, password and name are required");
  }

  const { data } = await axios.post("http://localhost:3001/auth/signup", {
    name,
    email,
    password,
  });

  return data;
};

const AUTH_QUERIES = {
  LOGIN: login,
  SIGNUP: signup,
};

export default AUTH_QUERIES;
