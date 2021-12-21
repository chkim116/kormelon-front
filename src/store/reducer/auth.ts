import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface User {
  id: number;
  username: string;
  admin: boolean;
}

interface InitialState {
  // auth
  isAuthLoading: boolean;
  isAuthError: any | null;

  // login
  isLoginLoading: boolean;
  isLoginError: any | null;

  // logout
  isLogoutLoading: boolean;
  isLogoutError: any | null;

  user: User;
}

const initialState: InitialState = {
  isAuthLoading: false,
  isAuthError: null,
  isLoginLoading: false,
  isLoginError: null,
  isLogoutLoading: false,
  isLogoutError: null,

  user: {
    username: '',
    id: 0,
    admin: false,
  },
};

const auth = createSlice({
  initialState,
  name: 'auth',
  reducers: {
    postLoginRequest: (state, { payload }) => {
      state.isLoginLoading = true;
      state.isLoginError = null;
    },
    postLoginSuccess: (state) => {
      state.isLoginLoading = false;
    },
    postLoginFailure: (state, { payload }) => {
      state.isLoginLoading = true;
      state.isLoginError = payload;
    },
    getAuthRequest: (state) => {
      state.isAuthLoading = true;
      state.isAuthError = null;
    },
    getAuthSuccess: (state, { payload }: PayloadAction<User>) => {
      state.user = payload;
      state.isAuthLoading = false;
    },
    getAuthFailure: (state, { payload }) => {
      state.isAuthLoading = false;
      state.isAuthError = payload;
    },
    postLogoutRequest: (state) => {
      state.isLogoutLoading = false;
      state.isLogoutError = null;
    },
    postLogoutSuccess: (state) => {
      state.user = initialState.user;
      state.isLogoutLoading = false;
    },
    postLogoutFailure: (state, { payload }) => {
      state.isAuthLoading = false;
      state.isLogoutError = payload;
    },
  },
});

export const {
  postLoginRequest,
  postLoginSuccess,
  postLoginFailure,
  getAuthRequest,
  getAuthSuccess,
  getAuthFailure,
  postLogoutRequest,
  postLogoutSuccess,
  postLogoutFailure,
} = auth.actions;

export default auth.reducer;
