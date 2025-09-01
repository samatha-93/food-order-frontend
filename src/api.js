import axios from "axios";

// Use backend API URL from environment variable set in your .env file
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api", // fallback to local backend
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const registerUser = (formData) => API.post("/auth/register", formData);
export const loginUser = (formData) => API.post("/auth/login", formData);

export default API;
