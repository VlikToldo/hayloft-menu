// Експорт всього необхідного для роботи з авторизацією

// Slice та actions
export { default as authReducer } from './auth-slice';
export {
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
} from './auth-slice';

// Thunks
export { loginUser, registerUser, initializeUser } from './auth-thunks';

// Selectors
export {
  selectUser,
  selectIsAuthenticated,
  selectIsAdmin,
  selectAuthLoading,
  selectAuthError,
} from './auth-selectors';
