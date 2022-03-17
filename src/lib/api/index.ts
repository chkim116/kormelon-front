import axios from 'axios';
import { makeStore } from 'src/store/config';
import { addNotification } from 'src/store/notification';

const API_URL = 'http://localhost:4000';

export const api = axios.create({
	baseURL: API_URL,
	withCredentials: true,
});

api.interceptors.response.use(
	(res) => res,
	(err) => {
		console.dir(err);
		// 오류 응답을 처리
		if (err.config.url === '/user/auth') {
			return Promise.reject(err);
		}

		const store = makeStore();
		store.dispatch(
			addNotification({ type: 'danger', message: err.response.data.message })
		);
		return Promise.reject(err);
	}
);
