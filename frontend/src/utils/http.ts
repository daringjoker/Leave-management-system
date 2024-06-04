import axios from "axios";
import { store } from "../store/store";

export const http = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

http.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (!token) {
    localStorage.setItem("authenticated", "false");
    return config;
  }
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

http.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem("token");
      localStorage.setItem("authenticated", "false");
      store.dispatch({ type: "auth/resetAuthenticated" });
    }
    return Promise.reject(error);
  },
);
