import {
	configureStore,
	applyMiddleware,
	combineReducers,
} from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import logger from 'redux-logger';

import gnb from './gnb';
import themeMode from './themeMode';

const reducer = combineReducers({
	gnb,
	themeMode,
});

const store = configureStore({
	reducer,
	enhancers: [applyMiddleware(logger)],
	devTools: process.env.NODE_ENV !== 'production',
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
