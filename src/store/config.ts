import {
	configureStore,
	applyMiddleware,
	combineReducers,
} from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import logger from 'redux-logger';
import { createWrapper } from 'next-redux-wrapper';

import gnb from './gnb';
import themeMode from './themeMode';
import user from './user';
import category from './category';

const reducer = combineReducers({
	gnb,
	themeMode,
	user,
	category,
});

const makeStore = () =>
	configureStore({
		reducer,
		enhancers: [applyMiddleware(logger)],
		devTools: process.env.NODE_ENV !== 'production',
	});

const store = createWrapper(makeStore, { debug: false });
export default store;

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
