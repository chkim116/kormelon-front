export const DEFAULT_PER = 5;
export const DEFAULT_PAGE = 1;
export const API_URL =
	process.env.NODE_ENV === 'production'
		? 'https://api.kormelon.com'
		: 'http://localhost:4000';
