import React, { createContext, useState, useContext, useEffect } from "react";
import { api } from "../services/api";
import { AUTH_ENDPOINTS, ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      if (localStorage.getItem(ACCESS_TOKEN)) {
        const userData = await api.get(AUTH_ENDPOINTS.PROFILE);
        setUser(userData.data);
      }
    } catch (error) {
      console.error("Failed to load user:", error);
      localStorage.removeItem(ACCESS_TOKEN);
      localStorage.removeItem(REFRESH_TOKEN);
    } finally {
      setLoading(false);
    }
  };

  const login = async (username, password) => {
    try {
      const response = await api.post(AUTH_ENDPOINTS.LOGIN, {
        username,
        password,
      });
      localStorage.setItem(ACCESS_TOKEN, response.data.access);
      localStorage.setItem(REFRESH_TOKEN, response.data.refresh);

      // Set the token in the API headers
      api.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.access}`;

      // Immediately fetch and set user data
      const userData = await api.get(AUTH_ENDPOINTS.PROFILE);
      setUser(userData.data);

      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
    delete api.defaults.headers.common["Authorization"];
    setUser(null);
  };

  const registerClient = async (data) => {
    await api.post(AUTH_ENDPOINTS.REGISTER_CLIENT, data);
  };

  const registerProvider = async (data) => {
    await api.post(AUTH_ENDPOINTS.REGISTER_PROVIDER, data);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        registerClient,
        registerProvider,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthContext;
