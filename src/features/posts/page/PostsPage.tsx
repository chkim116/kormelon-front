import { NextSeo } from 'next-seo';

import { PostListContainer } from '../containers/PostListContainer';

export const PostsPage = () => {
	return (
		<>
			<NextSeo title='Posts' />
			<PostListContainer />
		</>
	);
};
