import { useEffect } from 'react';
import { NextSeo } from 'next-seo';
import { useDispatch } from 'react-redux';

import { AppDispatch } from '@common/store';
import { PostListContainer } from '../containers/PostListContainer';
import { usePostSearchParams } from '../hooks/usePostSearchParams';
import { effPostListLoad } from '../stores/list/posts.effect';

export const PostsPage = () => {
	const dispatch = useDispatch<AppDispatch>();
	const params = usePostSearchParams();

	const loadPostList = () => {
		dispatch(effPostListLoad(params));
	};

	useEffect(loadPostList, [dispatch, params]);

	return (
		<>
			<NextSeo title='Posts' />
			<PostListContainer />
		</>
	);
};
