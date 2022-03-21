import { useRouter } from 'next/router';
import { useEffect } from 'react';
import queryString from 'query-string';

import { PostListTemplate } from 'src/components/PostListTemplate';

import { useAppDispatch, useAppSelector } from 'src/store/config';
import { getPostByTag } from 'src/store/search';
import { DEFAULT_PAGE, DEFAULT_PER } from 'src/lib/constants';

const SearchByTag = () => {
	const { query } = useRouter();

	const dispatch = useAppDispatch();
	const { postByQuery } = useAppSelector((state) => state.search);

	useEffect(() => {
		const q = query['q'] || '';

		if (!q) {
			return;
		}

		const page = query['page'] || DEFAULT_PAGE;
		const per = query['per'] || DEFAULT_PER;

		const toQuery = queryString.stringify({ q, per, page });
		dispatch(getPostByTag(toQuery));
	}, [dispatch, getPostByTag, query]);

	return (
		<div>
			<PostListTemplate posts={postByQuery} />
		</div>
	);
};

export default SearchByTag;
