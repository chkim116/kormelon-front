import { configureStore } from '@reduxjs/toolkit';
import auth from './reducer/auth';
import asider from './reducer/asider';
import darkMode from './reducer/darkmode';

export const store = configureStore({
  reducer: {
    auth,
    asider,
    darkMode,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
