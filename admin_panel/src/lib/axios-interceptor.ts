import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:4000/",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("_auth");
    if (token !== null) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response) {
      if (error.response.status === 403 && !originalRequest._retry) {
        originalRequest._retry = true;
        const refreshToken = localStorage.getItem("refreshToken");
        if (refreshToken !== null) {
          try {
            const response = await axiosInstance.post("/refresh_token", {
              refreshToken: refreshToken,
            });
            localStorage.setItem("_auth", response.data.accessToken);
            return axiosInstance(originalRequest);
          } catch (error) {
            return Promise.reject(error);
          }
        }
      }
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;