/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	images: {
		disableStaticImages: true,
		domains: [
			'kormelon-v2.s3.us-east-1.amazonaws.com',
			'assets-kormelon-v2.s3.ap-northeast-2.amazonaws.com',
		],
	},
};

module.exports = nextConfig;
