import { all, fork } from 'redux-saga/effects';
import Axios from 'axios';
import auth from './auth';

Axios.defaults.baseURL = process.env.NODE_ENV === 'production' ? process.env.PROD_SITE_URL : process.env.DEV_SITE_URL;
Axios.defaults.withCredentials = true;

export default function* rootSaga() {
  yield all([fork(auth)]);
}
