import axios from "axios";

const AxiosInstance = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});

// 401
AxiosInstance.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);


export default AxiosInstance;