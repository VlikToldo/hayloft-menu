import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import utilitySlice from './utility/utility-slice';

const rootReducer = combineReducers({
    utility: utilitySlice,
})

const persistConfig = {
    key: 'utility',
    storage,
  }

const persistedReducer = persistReducer(persistConfig, rootReducer)  

export default persistedReducer;