import React, { createContext, useState, useEffect, useContext } from "react";
import instance from "../utils/axiosConfig";

export const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

const safeJSONParse = (v) => {
  try {
    return v ? JSON.parse(v) : null;
  } catch {
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [isInitializing, setIsInitializing] = useState(true);

  // ✅ Khi app khởi động lại, đọc lại dữ liệu từ localStorage
  useEffect(() => {
    const storedUser = safeJSONParse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const storedRefresh = localStorage.getItem("refreshToken");

    if (storedUser && storedToken) {
      setUser(storedUser);
      setToken(storedToken);
      setRefreshToken(storedRefresh);
      instance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${storedToken}`;
      console.log("🔁 Session restored:", storedUser.username);
    }

    setIsInitializing(false);
  }, []);

  // ✅ Mỗi khi token thay đổi, cập nhật vào header
  useEffect(() => {
    if (token) {
      instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete instance.defaults.headers.common["Authorization"];
    }
  }, [token]);

  // ✅ Lưu thông tin user khi login / register
  const saveAuthData = (data) => {
    const newUser = {
      id: data.id,
      username: data.username,
      email: data.email,
      roles:
        Array.isArray(data.roles) && data.roles.length > 0
          ? data.roles
          : ["ROLE_USER"],
    };

    setUser(newUser);
    setToken(data.token);
    setRefreshToken(data.refreshToken);

    localStorage.setItem("user", JSON.stringify(newUser));
    localStorage.setItem("token", data.token);
    localStorage.setItem("refreshToken", data.refreshToken);
  };

  // ✅ Login
  const login = async (username, password) => {
    const res = await instance.post("/auth/login", { username, password });
    const data = res.data.result ?? res.data;
    saveAuthData(data);
    console.log("🚀 Login successful:", data.username);
    return data;
  };

  // ✅ Register
  const register = async (username, email, password) => {
    const res = await instance.post("/auth/register", {
      username,
      email,
      password,
    });
    const data = res.data.result ?? res.data;
    if (data.token) saveAuthData(data);
    console.log("🎉 Registration successful:", data.username);
    return data;
  };

  // ✅ Logout
  const logout = () => {
    setUser(null);
    setToken(null);
    setRefreshToken(null);
    localStorage.clear();
    delete instance.defaults.headers.common["Authorization"];
    console.log("👋 Logged out successfully.");
  };

  // ✅ Refresh token handler
  const refreshTokenHandler = async () => {
    if (!refreshToken) {
      console.warn("⚠️ No refresh token available.");
      logout();
      throw new Error("No refresh token");
    }

    try {
      const res = await instance.post("/auth/refresh-token", {
        refreshToken,
      });
      const data = res.data.result ?? res.data;

      setToken(data.token);
      localStorage.setItem("token", data.token);
      instance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${data.token}`;

      console.log("🔄 Token refreshed successfully!");
      return data.token;
    } catch (err) {
      console.error(
        "❌ Token refresh failed:",
        err.response?.data || err.message
      );
      logout();
      throw err;
    }
  };

  // ✅ Axios Interceptor: tự refresh token khi 401
  useEffect(() => {
    const interceptor = instance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          try {
            const newToken = await refreshTokenHandler();
            originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
            return instance(originalRequest);
          } catch (refreshError) {
            logout();
            throw refreshError;
          }
        }
        return Promise.reject(error);
      }
    );

    return () => instance.interceptors.response.eject(interceptor);
  }, [refreshToken]);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        refreshToken,
        login,
        register,
        logout,
        refreshTokenHandler,
        isInitializing,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
