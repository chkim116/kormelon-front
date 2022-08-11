import { createHttpApi } from './createHttpApi';
import { isProduction } from './env';
import { errorParser } from './errorParser';

const BASE_URL = isProduction
	? 'https://api.kormelon.com'
	: 'http://localhost:4000';

export const api = createHttpApi(BASE_URL, errorParser);
