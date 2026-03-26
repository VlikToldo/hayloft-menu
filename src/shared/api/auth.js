import axios from 'axios';

const API_URL = 'https://backend-loft.onrender.com/api/auth';
// const API_URL = 'http://localhost:3001/api/auth';

const authInstance = axios.create({
  baseURL: API_URL,
});

// Функція для логіну
export const login = async (email, password) => {
  const { data: result } = await authInstance.post('/login', {
    email,
    password,
  });

  if (result.token) {
    localStorage.setItem('authToken', result.token);
    if (result.refreshToken) {
      setRefreshToken(result.refreshToken);
    }
  }

  return result;
};

// Функція для реєстрації
export const register = async (email, password, name) => {
  const { data: result } = await authInstance.post('/register', {
    email,
    password,
    name,
  });

  if (result.token) {
    localStorage.setItem('authToken', result.token);
    if (result.refreshToken) {
      setRefreshToken(result.refreshToken);
    }
  }

  return result;
};

// Функція для логауту
export const logout = () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('refreshTokenData');
};

// Функція для отримання токена
export const getToken = () => {
  return localStorage.getItem('authToken');
};

// Функція для отримання refresh токена
export const getRefreshToken = () => {
  const data = localStorage.getItem('refreshTokenData');
  if (!data) {
    console.log('no refreshTokenData in localStorage');
    return null;
  }
  const parsed = JSON.parse(data);
  console.log(
    'refreshToken expire',
    new Date(parsed.expire),
    'now',
    new Date(Date.now())
  );
  if (Date.now() > parsed.expire) {
    console.log('refreshToken expired');
    localStorage.removeItem('refreshTokenData');
    return null;
  }
  console.log('refreshToken valid');
  return parsed.token;
};

// Функція для збереження refresh токена з expire 24 години
export const setRefreshToken = token => {
  const expire = Date.now() + 24 * 60 * 60 * 1000; // 24 години
  localStorage.setItem('refreshTokenData', JSON.stringify({ token, expire }));
};

// Функція для рефреш токена
export const refreshToken = async () => {
  try {
    console.log('refreshToken called');
    const refreshToken = getRefreshToken();
    if (!refreshToken) {
      console.log('no refreshToken');
      throw new Error('No refresh token');
    }

    console.log('sending refresh request');
    const { data: result } = await authInstance.post('/refresh', {
      refreshToken,
    });

    if (result.token) {
      console.log('new token received');
      localStorage.setItem('authToken', result.token);
    }

    if (result.refreshToken) {
      console.log('new refreshToken received');
      setRefreshToken(result.refreshToken);
    }

    return result.token;
  } catch (error) {
    console.log('refreshToken error', error);
    logout();
    throw error;
  }
};

// Функція для перевірки автентифікації
export const isAuthenticated = () => {
  const token = getToken();
  console.log('isAuthenticated check, token exists:', !!token);
  return !!token;
};

// Функція для отримання інформації про користувача
export const getCurrentUser = async () => {
  try {
    const { data: result } = await authInstance.get('/me');
    return result;
  } catch (error) {
    logout();
    throw error;
  }
};

export default authInstance;
