// Селектори для отримання даних з auth slice

export const selectUser = state => state.auth.user;

export const selectIsAuthenticated = state => state.auth.isAuthenticated;

export const selectIsAdmin = state => state.auth.user?.role === 'admin';

export const selectAuthLoading = state => state.auth.isLoading;

export const selectAuthError = state => state.auth.error;
