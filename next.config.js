const withImages = require('next-images');

/** @type {import('next').NextConfig} */
const config = {
	swcMinify: true,
	reactStrictMode: true,
	images: {
		disableStaticImages: true,
		domains: ['kormelon-v2.s3.us-east-1.amazonaws.com', 'images.unsplash.com'],
	},
};

module.exports = withImages({
	...config,
	webpack(config) {
		return config;
	},
});
