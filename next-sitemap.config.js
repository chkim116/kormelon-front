/** @type {import('next-sitemap').IConfig} */
import { SITE_URL } from '@common/constants';

module.exports = {
	siteUrl: SITE_URL,
	generateRobotsTxt: true,
	changefreq: 'weekly',
	priority: 0.7,
	sitemapSize: 5000,
	exclude: [
		//...
	],
	robotsTxtOptions: {
		// additionalSitemaps: [URL + '/server-sitemap-index.xml'],
	},
};
