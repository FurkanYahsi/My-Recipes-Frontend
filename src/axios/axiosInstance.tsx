import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    withCredentials: true
});

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response && (error.response.status === 401 )&& !originalRequest._retry) {
            originalRequest._retry = true;    
                window.location.href = "/login";
            }
        else if (error?.code === "ERR_NETWORK") {
            console.log(`Network error, server is not responding. Redirecting to login screen...`);
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
