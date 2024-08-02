import { configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// import waterReducer from './water/slice';
import { authReducer } from './auth/slice.js';
import { dateReducer } from './date/dateSlice.js';
import { usersReducer } from './users/slice.js';
import { waterReducer } from './water/slice.js';

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token'],
};

const usersPersistConfig = {
  key: 'users',
  storage,
  whitelist: ['token'],
};

const waterPersistConfig = {
  key: 'water',
  storage,
  whitelist: ['token'],
};

export const store = configureStore({
  reducer: {
    auth: persistReducer(authPersistConfig, authReducer),
    users: persistReducer(usersPersistConfig, usersReducer),
    date: dateReducer,
    water: persistReducer(waterPersistConfig, waterReducer),
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: true,
});

// export default store;
export const persistor = persistStore(store);
