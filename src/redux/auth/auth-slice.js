import { createSlice } from '@reduxjs/toolkit';
import { logout as apiLogout, isAuthenticated } from '../../shared/api/auth';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
  },
  reducers: {
    loginStart: state => {
      state.isLoading = true;
      state.error = null;
    },
    loginSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.user = payload.user;
      state.error = null;
    },
    loginFailure: (state, { payload }) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.error = payload;
    },
    registerStart: state => {
      state.isLoading = true;
      state.error = null;
    },
    registerSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.user = payload.user;
      state.error = null;
    },
    registerFailure: (state, { payload }) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.error = payload;
    },
    logout: state => {
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;
      apiLogout();
    },
    clearError: state => {
      state.error = null;
    },
    setUser: (state, { payload }) => {
      state.user = payload;
      state.isAuthenticated = !!payload;
    },
    initializeAuth: state => {
      state.isAuthenticated = isAuthenticated();
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  registerStart,
  registerSuccess,
  registerFailure,
  logout,
  clearError,
  setUser,
  initializeAuth,
} = authSlice.actions;

export default authSlice.reducer;
