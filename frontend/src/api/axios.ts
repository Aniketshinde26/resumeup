import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";
import toast from "react-hot-toast"; // 🛠️ 1. IMPORT TOAST AT THE TOP

// Extend the Axios config interface slightly to avoid TypeScript compiler complaints
interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

interface PromiseObject {
  resolve: (token: string) => void;
  reject: (error: any) => void;
}

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true, 
});

let accessTokenInMemory: string | null = null;

export const setAccessToken = (token: string | null) => {
  accessTokenInMemory = token;
};

let isRefreshing = false;
let failedQueue: PromiseObject[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else if (token) {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// 🛰️ OUTBOUND REQUEST INTERCEPTOR
api.interceptors.request.use(
  (config) => {
    if (accessTokenInMemory && config.headers) {
      config.headers.set("Authorization", `Bearer ${accessTokenInMemory}`);
    }

    console.log("📤 [Request]:", config.method?.toUpperCase(), config.url,
      "| Auth:", config.headers?.get("Authorization") ? "SET" : "MISSING"
    );
    return config;
  },
  (error) => Promise.reject(error)
);

// 📡 INBOUND RESPONSE INTERCEPTOR
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as CustomAxiosRequestConfig;

    // 🛠️ 2. GLOBAL RATE LIMIT CATCHER (429)
    if (error.response?.status === 429) {
      // Safely access the custom message sent by your backend createHandler wrapper
      const responseData = error.response.data as { error?: string };
      const rateLimitMessage = responseData?.error || "Too many requests. Please slow down.";

      // Fire the toast alert visually inside the browser UI view layer
      toast.error(rateLimitMessage, {
        duration: 4000, // Stays visible for 4 seconds
        id: "rate-limit-toast", // Fixed unique ID avoids stacking duplicate overlays if hammered quickly
        style: {
          background: '#1e293b', // Matches a dark slate color panel theme
          color: '#fff',
          fontWeight: '600',
          borderRadius: '12px',
        },
      });

      
    }

    if (!originalRequest) {
      return Promise.reject(error);
    }

    // 🛡️ CRITICAL FIX: Read retry lock directly from the config root, NOT headers
    if (error.response?.status === 401 && !originalRequest._retry) {
      
      // Queue up overlapping concurrent requests while processing the first refresh token transaction
      if (isRefreshing) {
        return new Promise<string>((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            if (originalRequest.headers) {
              originalRequest.headers.set("Authorization", `Bearer ${token}`);
            }
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      // Lock this request instantly right on the root config object
      originalRequest._retry = true;
      isRefreshing = true;

      try {
        console.log("🔄 [Interceptor]: Access token expired. Refreshing...");
        
        const response = await axios.post(
          "http://localhost:5000/api/auth/refresh",
          {},
          { withCredentials: true }
        );
        
        const { accessToken } = response.data;

        setAccessToken(accessToken); 
        
        if (originalRequest.headers) {
          originalRequest.headers.set("Authorization", `Bearer ${accessToken}`);
        }

        isRefreshing = false;
        processQueue(null, accessToken);

        console.log("🚀 [Interceptor]: Retrying initial transaction chain.");
        return api(originalRequest);
      } catch (refreshError) {
        isRefreshing = false;
        processQueue(refreshError, null);
        setAccessToken(null);
        
        if (typeof window !== "undefined") {
          window.location.href = "/login"; 
        }
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;