import axios, { AxiosError } from 'axios';
import qs from 'qs';

/* eslint-disable no-unused-vars */
export function createHttpApi(
	baseURL: string,
	errorParser: (err: AxiosError) => any = (err) => Promise.reject(err),
	paramsSerializer: (params: string) => string = (params: string) =>
		qs.stringify(params)
) {
	const baseApi = axios.create({
		baseURL,
		timeout: 5000,
		paramsSerializer,
		withCredentials: true,
	});

	baseApi.interceptors.response.use(
		(res) => res,
		(err: AxiosError) => errorParser?.(err)
	);

	return baseApi;
}
