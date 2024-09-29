import { LoginFormValues, SignupFormValues } from "@/types/auth";
import axios from "axios";
import { API_URL } from "../config";

const login = async ({ email, password }: LoginFormValues) => {
  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  const { data } = await axios.post(`${API_URL}/auth/login`, {
    email,
    password,
  });

  return data;
};

const signup = async ({ email, password, name }: SignupFormValues) => {
  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  const { data } = await axios.post(`${API_URL}/auth/signup`, {
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
