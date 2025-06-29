import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: "http://localhost:3000/",
    withCredentials: true
});

// axiosInstance.interceptors.request.use((config) => {
//     const token = document.getElementById("acces_token");
//     if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//     }

//     return config;
// }, (error) => {
//     return Promise.reject(error);
// });

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response && (error.response.status === 401 || error.response.status === 403 )&& !originalRequest._retry) {
            originalRequest._retry = true;    
                clearLocalStorageTokens();
                window.location.href = "/login";
            }
        else if (error?.code === "ERR_NETWORK") {
            clearLocalStorageTokens();
            console.log(`Network error, server is not responding. Redirecting to login screen...`);
            window.location.href = "/login";
        }

        return Promise.reject(error);
    }
);
function clearLocalStorageTokens() {
    // BURAYI COOKİDEKİ VERİYİ SİLMEK İÇİN KULLANMAN LAZIM
    document.getElementById("access_token")?.remove();
}

export default axiosInstance;
