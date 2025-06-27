// import axios from "axios";

// const AxiosInstance = axios.create({
//   baseURL: "http://localhost:3000/",
//   withCredentials: true, 
// });

// AxiosInstance.interceptors.request.use(
//   config => {
//     return config;
//   },
//   error => Promise.reject(error)
// );

// AxiosInstance.interceptors.response.use(
//   response => response,
//   error => {
//     if (error.response && (error.response.status === 401 || error.response.status === 403)) {
//        window.location.href = "/";

//     } else if (error.code === "ERR_NETWORK") {
//       window.location.href = "/";
//     }
//     return Promise.reject(error);
//   }
// );

// export default AxiosInstance;

import React from 'react'

const AxiosInstance = () => {
  return (
    <div>
      
    </div>
  )
}

export default AxiosInstance

