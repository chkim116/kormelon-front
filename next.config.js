const withPlugins = require('next-compose-plugins');
const withImages = require('next-images');

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	images: {
		disableStaticImages: true,
	},
};

module.exports = withPlugins(
	[
		[
			withImages({
				inlineImageLimit: false,
				fileExtensions: ['jpg', 'jpeg', 'png', 'gif', 'svg'],
			}),
		],
	],
	nextConfig
);
