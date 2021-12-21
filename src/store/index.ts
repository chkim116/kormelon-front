import { configureStore } from '@reduxjs/toolkit';
import auth from './reducer/auth';
import asider from './reducer/asider';

export const store = configureStore({
  reducer: {
    auth,
    asider,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
