import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // your backend
  withCredentials: true, // IMPORTANT: sends cookies (access & refresh)
});

// JWT Token Refresh Interceptor Logic
// ----------------------------------------------------

// Flag to prevent multiple concurrent refresh calls
let isRefreshing = false;
// Queue to hold pending requests while the token is being refreshed
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      // Fulfill the pending requests with the new token (though the token is in the cookie,
      // the retry needs the token to proceed and avoid the cookie bug)
      prom.resolve(true);
    }
  });
  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Check if the error is 401 Unauthorized and not already retried
    if (error.response?.status === 401 && !originalRequest._retry) {
      // 1. If a refresh is already in progress, queue the current failed request
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => {
            // Retry the original request after refresh completes
            return api(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true; // Mark as retried
      isRefreshing = true;

      try {
        // 2. Call the backend refresh endpoint
        // The browser automatically sends the expired refresh token cookie
        // const res = await api.post("/auth/refresh");

        // 3. Refresh successful: Update queue and retry failed requests
        isRefreshing = false;
        processQueue(null);

        // Retry the original request (it will now pass with the new cookie)
        return api(originalRequest);
      } catch (refreshError) {
        // 4. Refresh failed (Refresh Token expired or invalid)
        isRefreshing = false;
        processQueue(refreshError, null);

        // CRITICAL: Force user to log in again
        // You should implement a proper router navigation here (e.g., history.push('/login'))
        window.location.href = "/"; // Redirect to home/login page
        return Promise.reject(refreshError);
      }
    }

    // Return all other errors
    return Promise.reject(error);
  }
);

export default api;
