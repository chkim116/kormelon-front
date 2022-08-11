import { AnyAction, configureStore } from '@reduxjs/toolkit';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';

import { isProduction } from '@core/env';
import { featureReducers } from '@features/feat-reducers';

const reducer = (state: any, action: AnyAction) => {
	switch (action.type) {
		case HYDRATE:
			return action.payload;
		default: {
			return featureReducers(state, action);
		}
	}
};

const makeStore = () =>
	configureStore({
		reducer,
		devTools: !isProduction,
	});

export const store = createWrapper(makeStore, { debug: false });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<typeof featureReducers>;
export type AppDispatch = AppStore['dispatch'];
