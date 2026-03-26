import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import utilitySlice from './utility/utility-slice';
import authSlice from './auth/auth-slice';

const rootReducer = combineReducers({
  utility: utilitySlice,
  auth: authSlice,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'], // зберігаємо тільки auth в localStorage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
