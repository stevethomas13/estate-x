import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';

export const store = configureStore({
  reducer: {user: userReducer},
  // add this to prevent errors in the future 
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});