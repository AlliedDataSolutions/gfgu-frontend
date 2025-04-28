import axios from "axios";

const baseURL = 
  import.meta.env.DEV
    ? "http://localhost:5000/api"        // local when running vite
    : "https://gfgu-backend.vercel.app/api";

const axiosInstance = axios.create({
  // baseURL,
  baseURL: "https://gfgu-backend.vercel.app/api",
  // baseURL: "http://localhost:5000/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const publicRoutes = ["/auth/login", "/auth/register"];
    if (config.url && publicRoutes.includes(config.url)) {
      return config;
    }

    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    // Return response if status is in the range of 2xx
    return response;
  },
  (error) => {
    // Catch errors (like 400) globally
    if (error.response) {
      switch (error.response.status) {
        case 400:
          console.error("Bad Request:", error.response.data.message);
          break;
        case 401:
          console.error("Unauthorized");
          break;
        case 404:
          console.error("Not Found");
          break;
        default:
          console.error("An error occurred:", error.response.data);
      }
    } else {
      console.error("Network error or no response");
    }
    return Promise.reject(error); // Propagate the error
  }
);

export default axiosInstance;
