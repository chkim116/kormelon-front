import { configureStore, combineReducers, AnyAction } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import logger from 'redux-logger';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';

import gnb from './gnb';
import themeMode from './themeMode';
import user from './user';
import category from './category';
import tag from './tag';
import post from './post';
import comment from './comment';
import notification from './notification';
import search from './search';
import view from './view';

const combineReducer = combineReducers({
	gnb,
	themeMode,
	user,
	category,
	tag,
	post,
	comment,
	notification,
	search,
	view,
});

const reducer = (state: any, action: AnyAction) => {
	switch (action.type) {
		case HYDRATE:
			return action.payload;
		default: {
			return combineReducer(state, action);
		}
	}
};

export const makeStore = () =>
	configureStore({
		reducer,
		middleware: (getDefaultMiddleware) =>
			process.env.NODE_ENV !== 'production'
				? [...getDefaultMiddleware(), logger]
				: [...getDefaultMiddleware()],
		devTools: process.env.NODE_ENV !== 'production',
	});

const store = createWrapper(makeStore, { debug: false });
export default store;

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<typeof combineReducer>;
export type AppDispatch = AppStore['dispatch'];

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
