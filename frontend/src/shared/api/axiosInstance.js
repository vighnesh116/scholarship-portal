import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.1.68:5000",
});

// Add access token to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Automatically refresh expired access token
api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    // Don't refresh token for login or refresh requests
    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest.url?.includes("/login") &&
      !originalRequest.url?.includes("/refresh") &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refresh_token");

        if (!refreshToken) {
          return Promise.reject(error);
        }

        const refreshResponse = await axios.post(
          "http://192.168.1.68:5000/refresh",
          {},
          {
            headers: {
              Authorization: `Bearer ${refreshToken}`,
            },
          },
        );

        const newAccessToken = refreshResponse.data.access_token;

        localStorage.setItem("access_token", newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return api(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default api;
