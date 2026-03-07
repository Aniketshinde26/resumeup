import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";
// 1. Define the shape of our queue items
interface PromiseObject {
  resolve: (value: boolean) => void;
  reject: (error: any) => void;
}

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
  
});

let isRefreshing = false;
// 2. Type the queue explicitly
let failedQueue: PromiseObject[] = [];

// 3. Type the helper function
const processQueue = (error: any) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      // We just resolve as true because the new cookie
      // is already set in the browser
      prom.resolve(true);
    }
  });
  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    // 4. Cast config to include our custom _retry flag
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry
    ) {
      if (isRefreshing) {
        return new Promise<boolean>((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => {
            return api(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        await api.post("/auth/refresh");

        isRefreshing = false;
        processQueue(null);

        return api(originalRequest);
      } catch (refreshError) {
        isRefreshing = false;
        processQueue(refreshError);
        window.location.href = "/";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
