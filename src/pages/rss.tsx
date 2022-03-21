import { GetServerSideProps } from 'next';
import { marked } from 'marked';

import { api } from 'src/lib/api';

interface PostRss {
	id: number;
	title: string;
	content: string;
	createdAt: string;
}

const URL =
	process.env.NODE_ENV === 'production'
		? 'https://kormelon.com'
		: 'http://localhost:3000';
const TITLE = 'Kormelon';
const SITE_DESCRIPTION = 'The most recent home feed on Kormelon Blog';

const postRssXml = (posts: PostRss[]) => {
	let latestPostDate: string = '';
	let rssItemsXml = '';

	posts.forEach((post) => {
		const postDate = Date.parse(post.createdAt);
		if (!latestPostDate || postDate > Date.parse(latestPostDate)) {
			latestPostDate = post.createdAt;
		}

		rssItemsXml += `
      <item>
        <title>${post.title}</title>
        <link>${URL}/${post.id}/${post.title}</link>
        <pubDate>${post.createdAt}</pubDate>
        <description>
        <![CDATA[${marked.parse(post.content)}]]>
        </description>
    </item>`;
	});
	return {
		rssItemsXml,
		latestPostDate,
	};
};

const getRssXml = (posts: PostRss[]) => {
	const { rssItemsXml, latestPostDate } = postRssXml(posts);

	return `<?xml version="1.0" ?>
  <rss version="2.0"  xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
    <channel>
        <title>${TITLE}</title>
        <description>${SITE_DESCRIPTION}</description>
        <link>${URL}</link>
        <language>ko</language>
				<atom:link rel="self" type="application/rss+xml" href="${`${URL}/rss`}"></atom:link>
        <lastBuildDate>${latestPostDate}</lastBuildDate>
        ${rssItemsXml}
    </channel>
  </rss>`;
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const res = ctx.res;

	if (!res) {
		return {
			props: {},
		};
	}

	const posts = await api.get('/post?rss=1').then((res) => res.data);

	res.setHeader('Content-Type', 'text/xml');
	res.write(getRssXml(posts));
	res.end();

	return {
		props: {},
	};
};

export default () => null;
