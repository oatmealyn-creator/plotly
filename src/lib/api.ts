import axios from "axios";

const BACKEND_URL = typeof window !== "undefined" ? window.location.origin : "";
export const API = `${BACKEND_URL}/api`;

export const api = axios.create({
  baseURL: API,
  withCredentials: true,
});

if (typeof window !== "undefined") {
  api.interceptors.request.use(
    (config) => {
      const sessionId = localStorage.getItem("session_id");
      if (sessionId) {
        config.headers["Authorization"] = `Bearer ${sessionId}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
}
