import { AxiosRequestConfig } from 'axios';
import { api } from '.';

export const fetchUser = (option: AxiosRequestConfig<any>) => {
	return api.get('/user/auth', option).then((res) => res.data);
};
