// import axios from 'axios';

// const BaseURL = axios.create(
//     {
//         baseURL: "http://localhost:8082/"
//         // baseUrl: "http://44.216.75.225/"
//     }
// );

// // 添加请求拦截器
// BaseURL.interceptors.request.use(
//     (config) => {
//         const token = localStorage.getItem('accessToken');
//         if (token) {
//             config.headers['Authorization'] = `Bearer ${token}`;
//         }
//         return config;
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// );

// // 刷新令牌的函数
// const refreshAccessToken = async () => {
//     try {
//         const res = await BaseURL.post('/user/refresh-token', {
//             refreshToken: localStorage.getItem ('refreshToken')
//         });//改refresh token和access token
//         localStorage.setItem('accessToken', res.data.accessToken);
//         localStorage.setItem('refreshToken', res.data.refreshToken);
//         return res.data.accessToken;
//     } catch (error) {
//         console.error('Refresh token failed', error);
//         localStorage.removeItem('accessToken');
//         localStorage.removeItem('refreshToken');
//         window.location.href = '/login'; // Redirect to login page
//         throw error;
//     }
// };

// // 添加响应拦截器
// BaseURL.interceptors.response.use(
//     (response) => response,
//     async (error) => {
//         const originalRequest = error.config;
//         if (error.response.status === 401 && !originalRequest._retry) {
//             originalRequest._retry = true;
//             const newAccessToken = await refreshAccessToken();
//             originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
//             return BaseURL(originalRequest);
//         }
//         return Promise.reject(error);
//     }
// );

// export default BaseURL;

// import axios from 'axios';

// const BaseURL = axios.create({
//     baseURL: "http://localhost:8082/",
//     withCredentials: true // 确保请求包含凭证（cookie）
// });

// // 添加响应拦截器
// BaseURL.interceptors.response.use(
//     (response) => response,
//     async (error) => {
//         const originalRequest = error.config;
//         if (error.response.status === 403 && !originalRequest._retry) {
//             originalRequest._retry = true;
//             try {
//                 await axios.post('http://localhost:8082/user/refresh-token', {}, { withCredentials: true });
//                 return BaseURL(originalRequest);
//             } catch (refreshError) {
//                 console.error('Refresh token failed', refreshError);
//                 window.location.href = '/login'; // Redirect to login page
//                 return Promise.reject(refreshError);
//             }
//         }
//         return Promise.reject(error);
//     }
// );

// export default BaseURL;

import axios from 'axios';
import Cookies from 'js-cookie';

// 创建 Axios 实例
const BaseURL = axios.create({
    baseURL: "http://localhost:8082/",
    withCredentials: true // 确保请求包含凭证（cookie）
});

// 添加请求拦截器以包含 CSRF 令牌
BaseURL.interceptors.request.use(
    (config) => {
        const csrfToken = Cookies.get('XSRF-TOKEN');
        if (csrfToken) {
            config.headers['X-XSRF-TOKEN'] = csrfToken;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 添加响应拦截器
BaseURL.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 403 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                // 获取 CSRF 令牌并包含在刷新令牌请求中
                const csrfToken = Cookies.get('XSRF-TOKEN');
                const refreshConfig = {
                    withCredentials: true,
                    headers: {}
                };
                if (csrfToken) {
                    refreshConfig.headers['X-XSRF-TOKEN'] = csrfToken;
                }

                await axios.post('http://localhost:8082/user/refresh-token', {}, refreshConfig);
                return BaseURL(originalRequest);
            } catch (refreshError) {
                console.error('Refresh token failed', refreshError);
                window.location.href = '/login'; // Redirect to login page
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

export default BaseURL;
