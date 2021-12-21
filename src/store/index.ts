import { configureStore, applyMiddleware, combineReducers } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import auth from './reducer/auth';
import asider from './reducer/asider';
import darkMode from './reducer/darkmode';
import rootSaga from './sagas';

const reducer = combineReducers({
  auth,
  asider,
  darkMode,
});

const sageMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer,
  middleware: [sageMiddleware],
  enhancers: [applyMiddleware(sageMiddleware)],
});

(store as any).sagaTask = sageMiddleware.run(rootSaga);

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
