/** @type {import('next').NextConfig} */
module.exports = {
	swcMinify: true,
	reactStrictMode: true,
	images: {
		disableStaticImages: true,
		domains: ['kormelon-v2.s3.us-east-1.amazonaws.com'],
	},
};
