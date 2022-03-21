import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import queryString from 'query-string';

import { PostListTemplate } from 'src/components/PostListTemplate';

import { useAppDispatch, useAppSelector } from 'src/store/config';
import { getPostByCategory } from 'src/store/search';

const SearchByCategory = () => {
	const { query } = useRouter();

	const dispatch = useAppDispatch();
	const { postByQuery } = useAppSelector((state) => state.search);

	useEffect(() => {
		const q = query['q'] || '';

		if (!q) {
			return;
		}

		const page = query['page'] || 1;
		const per = query['per'] || 10;

		const toQuery = queryString.stringify({ q, per, page });
		dispatch(getPostByCategory(toQuery));
	}, [dispatch, getPostByCategory, query]);

	return (
		<div>
			<PostListTemplate posts={postByQuery} />
		</div>
	);
};

export default SearchByCategory;
