import { getServerSideSitemap } from 'next-sitemap';
import { GetServerSideProps } from 'next';

import { api } from 'src/lib/api';

interface PostRss {
	id: number;
	title: string;
}

const URL =
	process.env.NODE_ENV === 'production'
		? 'https://kormelon'
		: 'http://localhost:3000';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const posts = await api.get('/post?rss=1').then((res) => res.data);
	const fields = posts.map((post: PostRss) => ({
		loc: `${URL}/post/${post.id}/${post.title}`,
		lastmod: new Date().toISOString(),
		changefreq: 'weekly',
		priority: 0.7,
	}));

	return getServerSideSitemap(ctx, fields);
};

// eslint-disable-next-line import/no-anonymous-default-export
export default () => null;
