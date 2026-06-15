import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";

// 1. Define the shape of our queue items to handle the token string or error
interface PromiseObject {
  resolve: (token: string) => void;
  reject: (error: any) => void;
}

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true, // 🍪 Keeps your HttpOnly refresh cookie active
});

// 🔒 THE VAULT: Keeps track of your short-lived access token in frontend memory
let accessTokenInMemory: string | null = null;

// Helper function your login hooks will use to set the token string
export const setAccessToken = (token: string | null) => {
  accessTokenInMemory = token;
};

let isRefreshing = false;
let failedQueue: PromiseObject[] = [];

// 2. Clear the queue and process the waiting requests with the new token
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

// 🛰️ OUTBOUND REQUEST INTERCEPTOR (The Dynamic Guard)
api.interceptors.request.use(
  (config) => {
    // Inject the memory token onto headers right before the request fires off
    if (accessTokenInMemory && config.headers) {
      config.headers["Authorization"] = `Bearer ${accessTokenInMemory}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry
    ) {
      // SCENARIO A: A refresh request is already in progress, wait in line!
      if (isRefreshing) {
        return new Promise<string>((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            // Re-inject the token that the queue leader just fetched for us
            if (originalRequest.headers) {
              originalRequest.headers["Authorization"] = `Bearer ${token}`;
            }
            return api(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      // SCENARIO B: You are the first request to fail. You are the queue leader!
      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // 1. Call the refresh endpoint to obtain a new token
        const response = await api.post("/auth/refresh");
        const { accessToken } = response.data;

        // 2. Inject the fresh token into the global Axios configuration instance
        api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
        if (originalRequest.headers) {
          originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
        }

        // 3. Reset the system lock and wake up the queue stashed in Scenario A
        isRefreshing = false;
        processQueue(null, accessToken);

        // 4. Retry the leader request
        return api(originalRequest);
      } catch (refreshError) {
        // If the refresh token itself fails/expires, nuke the session completely
        isRefreshing = false;
        processQueue(refreshError, null);
        window.location.href = "/"; // Send user back to the login screen
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;