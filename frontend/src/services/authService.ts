import api from "../api/axios";
import { API_ENDPOINTS } from "../api/enpoint";

export const login = async (email: string, password: string) => {
  const response = await api.post(API_ENDPOINTS.AUTH.LOGIN, {
    email,
    password,
  });

  if (response.data.access_token) {
    localStorage.setItem("token", response.data.access_token);
    localStorage.setItem("user", JSON.stringify(response.data.user));
  }

  return response.data;
};

export const register = async (email: string, password: string) => {
  const response = await api.post(API_ENDPOINTS.AUTH.REGISTER, {
    email,
    password,
  });

  return response.data;
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

export const isLoggedIn = () => {
  return localStorage.getItem("token") !== null;
};

export const getCurrentUser = () => {
  const userStr = localStorage.getItem("user");
  if (userStr) {
    return JSON.parse(userStr);
  }
  return null;
};
