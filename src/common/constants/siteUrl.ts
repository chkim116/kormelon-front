import { isProduction } from '@core/env';

export const SITE_URL = isProduction
	? 'https://kormelon.com'
	: 'http://localhost:3000';
