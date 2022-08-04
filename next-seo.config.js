import { isProduction } from '@core/env';

const SITE_IMAGE = isProduction
	? 'https://assets-kormelon-v2.s3.ap-northeast-2.amazonaws.com/img/profile.jpeg'
	: '';

/** @type {import('next-seo').DefaultSeoProps} */
const defaultSEOConfig = {
	title: 'Kormelon Blog',
	titleTemplate: '%s | Kormelon Blog',
	defaultTitle: 'Kormelon Blog',
	description: '프론트엔드 개발자 김창회의 블로그입니다.',
	canonical: 'https://kormelon.com',
	openGraph: {
		url: 'https://kormelon.com',
		title: 'Kormelon Blog',
		description: '프론트엔드 개발자 김창회의 블로그입니다.',
		images: [
			{
				url: SITE_IMAGE,
				alt: 'Kormelon Blog Image',
			},
		],
		site_name: 'Kormelon Blog',
	},
	twitter: {
		site: 'Kormelon Blog',
		cardType: 'summary_large_image',
	},
};

export default defaultSEOConfig;
