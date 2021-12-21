import { all, call, put, fork, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {
  getAuthFailure,
  getAuthRequest,
  getAuthSuccess,
  postLoginFailure,
  postLoginRequest,
  postLoginSuccess,
  postLogoutFailure,
  postLogoutRequest,
  postLogoutSuccess,
  User,
} from '../reducer/auth';
import { PayloadAction } from '@reduxjs/toolkit';

// ajax

function login(form: { username: ''; password: '' }) {
  return axios.post('/auth/login', form);
}

function logout() {
  return axios.post('/auth/logout');
}

function getAuthData() {
  return axios.get('/auth').then((res) => res.data);
}

// call & put

function* postLogin({ payload }: PayloadAction<{ username: ''; password: '' }>) {
  try {
    yield call(login, payload);
    yield put(getAuthRequest());
  } catch (err: any) {
    console.log(err);
    yield put(postLoginFailure(err.message));
  }
}

function* postLogout() {
  try {
    yield call(logout);
    yield put(postLogoutSuccess());
  } catch (err: any) {
    console.error(err);
    yield put(postLogoutFailure(err.message));
  }
}

function* getAuth() {
  try {
    const userData: User = yield call(getAuthData);
    yield put(getAuthSuccess(userData));
    yield put(postLoginSuccess());
  } catch (err: any) {
    console.error(err);
    yield put(getAuthFailure(err.message));
  }
}

// watch

function* watchLogoutRequest() {
  yield takeLatest(postLogoutRequest, postLogout);
}

function* watchLoginRequest() {
  yield takeLatest(postLoginRequest, postLogin);
}

function* watchGetAuthRequest() {
  yield takeLatest(getAuthRequest, getAuth);
}

export default function* auth(): Generator {
  yield all([fork(watchGetAuthRequest), fork(watchLoginRequest), fork(watchLogoutRequest)]);
}
