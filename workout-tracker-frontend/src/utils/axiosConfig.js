// axiosConfig.js
import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/workout", // <-- đúng với context-path backend của bạn
});

// Gắn token mỗi request (lấy trực tiếp từ localStorage)
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;
