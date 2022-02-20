import { useCallback } from 'react';
import { iNotification, Store } from 'react-notifications-component';

export const useNotification = () => {
	const callNotification = useCallback(
		({
			title,
			message,
			type,
			insert = 'top',
			container = 'top-right',
			dismiss = {
				duration: 3000,
				onScreen: true,
			},
			animationIn = ['animate__animated', 'animate__fadeIn'],
			animationOut = ['animate__animated', 'animate__fadeOut'],
			...rest
		}: Partial<iNotification>) => {
			Store.addNotification({
				title,
				message,
				type,
				insert,
				container,
				dismiss,
				animationIn,
				animationOut,
				...rest,
			});
		},
		[]
	);

	return { callNotification };
};
