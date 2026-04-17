import axios from 'axios';
import { getToken, refreshToken, logout } from './auth';

const baseInstance = axios.create({
    baseURL: 'https://backend-loft.onrender.com/api',
  // baseURL: 'http://localhost:3001/api',
});

// Інтерцептор для додавання токена до кожного запиту
baseInstance.interceptors.request.use(
  config => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

// Інтерцептор для обробки помилок авторизації та рефреш токена
baseInstance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    // Якщо помилка 401 і це не спроба рефреш токена
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const newToken = await refreshToken();
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return baseInstance(originalRequest);
      } catch (refreshError) {
        logout();
        window.location.href = '/login'; // або ваш шлях до сторінки логіну
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default baseInstance;
