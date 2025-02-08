import { api } from "./api";
import { AUTH_ENDPOINTS, ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";

export const authService = {
  login: async (data) => {
    const response = await api.post(AUTH_ENDPOINTS.LOGIN, data);
    localStorage.setItem(ACCESS_TOKEN, response.data.access);
    localStorage.setItem(REFRESH_TOKEN, response.data.refresh);
    return response.data;
  },

  logout: () => {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
  },

  refreshToken: async () => {
    const refresh = localStorage.getItem("refreshToken");
    if (refresh) {
      const response = await api.post("/api/token/refresh/", { refresh });
      localStorage.setItem("accessToken", response.data.access);
      return response.data;
    }
    throw new Error("No refresh token available");
  },

  logout: () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  },

  getCurrentUser: async () => {
    const response = await api.get(AUTH_ENDPOINTS.PROFILE);
    return response.data;
  },
};
