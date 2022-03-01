/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	experimental: {
		swcMinify: true,
	},
	images: {
		domains: ['placehold.it'],
	},
};

module.exports = nextConfig;
