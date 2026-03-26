import {
  login,
  register,
  getCurrentUser,
  isAuthenticated,
} from '../../shared/api/auth';
import {
  loginStart,
  loginSuccess,
  loginFailure,
  registerStart,
  registerSuccess,
  registerFailure,
  setUser,
  logout,
} from './auth-slice';

// Thunk для логіну користувача
export const loginUser = (email, password) => async dispatch => {
  try {
    dispatch(loginStart());
    const result = await login(email, password);
    dispatch(loginSuccess(result));
  } catch (error) {
    dispatch(loginFailure(error.response?.data?.message || error.message));
  }
};

// Thunk для реєстрації користувача
export const registerUser = (email, password, name) => async dispatch => {
  try {
    dispatch(registerStart());
    const result = await register(email, password, name);
    dispatch(registerSuccess(result));
  } catch (error) {
    dispatch(registerFailure(error.response?.data?.message || error.message));
  }
};

// Thunk для ініціалізації користувача при завантаженні додатку
export const initializeUser = () => async dispatch => {
  try {
    console.log('initializeUser called');
    if (isAuthenticated()) {
      console.log('isAuthenticated true, calling getCurrentUser');
      const user = await getCurrentUser();
      console.log('getCurrentUser success', user);
      dispatch(setUser(user));
    } else {
      console.log('isAuthenticated false');
    }
  } catch (error) {
    console.log('initializeUser error', error);
    dispatch(logout());
  }
};
