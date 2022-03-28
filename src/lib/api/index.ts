import axios, { AxiosError } from 'axios';
import { makeStore } from 'src/store/config';
import { addNotification } from 'src/store/notification';
import { API_URL } from '../constants';

export const api = axios.create({
	baseURL: API_URL,
	withCredentials: true,
});

api.interceptors.response.use(
	(res) => res,
	(err: AxiosError) => {
		if (err.config.url === '/user/auth') {
			// 오류 응답을 처리
			return Promise.reject(err);
		}

		const store = makeStore();
		store.dispatch(
			addNotification({
				type: 'danger',
				message: err.response?.data.message || '알 수 없는 오류입니다.',
			})
		);

		return Promise.reject(err);
	}
);
