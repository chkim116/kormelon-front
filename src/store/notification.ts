import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { iNotification, Store } from 'react-notifications-component';

interface Notification extends Partial<iNotification> {}

const initialState: Notification = {};

const notification = createSlice({
	name: 'notification',
	initialState,
	reducers: {
		addNotification: (state, { payload }: PayloadAction<Notification>) => {
			Store.addNotification({
				title: payload.title,
				message: payload.message,
				type: payload.type,
				insert: 'top',
				container: 'top-right',
				dismiss: {
					duration: 3000,
					onScreen: true,
				},
				animationIn: ['animate__animated', 'animate__fadeIn'],
				animationOut: ['animate__animated', 'animate__fadeOut'],
				...payload,
			});
		},
	},
});

export const { addNotification } = notification.actions;

export default notification.reducer;
