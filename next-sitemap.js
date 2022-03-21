/** @type {import('next-sitemap').IConfig} */

const URL =
	process.env.NODE_ENV === 'production'
		? 'https://kormelon.com'
		: 'http://localhost:3000';

module.exports = {
	siteUrl: URL,
	generateRobotsTxt: true,
	changefreq: 'weekly',
	priority: 0.7,
	sitemapSize: 5000,
	exclude: [
		'/login',
		'/search/*',
		'/post/write',
		'/setting',
		'/search',
		'/server-sitemap-index.xml',
	],
	robotsTxtOptions: {
		additionalSitemaps: [URL + '/server-sitemap-index.xml'],
	},
};
