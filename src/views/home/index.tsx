import { useRouter } from 'next/router';
import { useEffect, useMemo } from 'react';
import queryString from 'query-string';

import { PostListTemplate } from 'src/components/PostListTemplate';
import { DEFAULT_PAGE, DEFAULT_PER } from 'src/lib/constants';
import { getPosts } from 'src/store/post';

import HomeStyle from './HomeStyle';
import { useAppDispatch, useAppSelector } from 'src/store/config';
import PostListSkeleton from 'src/components/PostListSkeleton';

const Home = () => {
	const { query } = useRouter();
	const dispatch = useAppDispatch();
	const { posts, isPostLoad } = useAppSelector((state) => state.post);

	const queries = useMemo(() => {
		const page = query['page'] || DEFAULT_PAGE;
		const per = query['per'] || DEFAULT_PER;

		return queryString.stringify({ per, page });
	}, [query]);

	useEffect(() => {
		dispatch(getPosts(queries));
	}, [dispatch, queries]);

	if (isPostLoad) {
		return <PostListSkeleton length={5} />;
	}

	return (
		<HomeStyle>
			<PostListTemplate posts={posts} />
		</HomeStyle>
	);
};

export default Home;
