import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";

interface PromiseObject {
  resolve: (token: string) => void;
  reject: (error: any) => void;
}

type RetryableRequest = InternalAxiosRequestConfig &{
  _retry?: boolean;
}

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true, // 🍪 Critical for HttpOnly cookies
});

// The single source of truth for your short-lived access token
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
    // Force read directly from memory variable on every single outbound call
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
    const originalRequest = error.config as RetryableRequest;

    if (
      error.response?.status === 401 &&
      originalRequest &&
      !(originalRequest as any)._retry // 🛡️ Check custom header instead of _retry property
    ) {
      // If a refresh is already happening, queue up subsequent requests (like the Builder page fetch)
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

      // 🔑 Lock this specific request using an explicit transaction header property
      if (originalRequest.headers) {
       (originalRequest as any)._retry = true;
      }
      
      isRefreshing = true;

      try {
        console.log("🔄 [Interceptor]: Access token expired. Refreshing...");
        
        // Use an isolated axios call to ensure clean header state
        const response = await axios.post(
          "http://localhost:5000/api/auth/refresh",
          {},
          { withCredentials: true }
        );
        
        const { accessToken } = response.data;

        // Sync local storage / memory vault immediately
        setAccessToken(accessToken); 
        
        if (originalRequest.headers) {
          originalRequest.headers.set("Authorization", `Bearer ${accessToken}`);
        }

        isRefreshing = false;
        
        // Flush out queued actions with the updated token value
        processQueue(null, accessToken);

        console.log("🚀 [Interceptor]: Retrying initial transaction chain.");
          console.log("🔁 [Interceptor retry]: Headers being sent:", 
            originalRequest.headers?.get("Authorization")
        );
        return api(originalRequest);
      } catch (refreshError) {
        isRefreshing = false;
        processQueue(refreshError, null);
        setAccessToken(null);
        window.location.href = "/login"; 
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;