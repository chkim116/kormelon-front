import { AxiosError } from 'axios';

interface ServerErrorResponse {
	message: string;
}

type StatusType = 'auth' | 'unknown';

class HttpError extends Error {
	constructor(
		message: string,
		// eslint-disable-next-line no-unused-vars
		public readonly statusType: StatusType = 'unknown'
	) {
		super(message);
	}
}

export function errorParser(error: AxiosError) {
	const status = error.response?.status;
	const { message } = error.response?.data as ServerErrorResponse;

	if (status === 401 || status === 500) {
		return Promise.reject(new HttpError(message, 'auth'));
	}

	return Promise.reject(new HttpError(message));
}
