import React, { createContext, useState, useEffect, useContext } from "react";
import instance from "../utils/axiosConfig";

export const AuthContext = createContext();

// Custom hook
export const useAuth = () => useContext(AuthContext);

const safeJSONParse = (v) => {
  try {
    return v ? JSON.parse(v) : null;
  } catch {
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    () => safeJSONParse(localStorage.getItem("user")) || null
  );
  const [token, setToken] = useState(
    () => localStorage.getItem("token") || null
  );
  const [refreshToken, setRefreshToken] = useState(
    () => localStorage.getItem("refreshToken") || null
  );

  // ✅ Cập nhật header Authorization mỗi khi token thay đổi
  useEffect(() => {
    if (token) {
      instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete instance.defaults.headers.common["Authorization"];
    }
  }, [token]);

  // ✅ Lưu dữ liệu user sau khi login/register
  const saveAuthData = (data) => {
    const newUser = {
      id: data.id, // backend đã trả sẵn id
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

    console.log("✅ User info saved:", newUser);
  };

  // ✅ Login
  const login = async (username, password) => {
    try {
      const res = await instance.post("/auth/login", { username, password });
      const data = res.data.result ?? res.data;

      saveAuthData(data);
      console.log("🚀 Login successful:", data.username);
      return data;
    } catch (err) {
      console.error("❌ Login failed:", err.response?.data || err.message);
      throw err;
    }
  };

  // ✅ Register (tạo user bình thường)
  const register = async (username, email, password) => {
    try {
      const res = await instance.post("/auth/register", {
        username,
        email,
        password,
      });
      const data = res.data.result ?? res.data;

      if (data.token) saveAuthData(data);

      console.log("🎉 Registration successful:", data.username);
      return data;
    } catch (err) {
      console.error(
        "❌ Registration failed:",
        err.response?.data || err.message
      );
      throw err;
    }
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

  return (
    <AuthContext.Provider
      value={{ user, token, refreshToken, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
