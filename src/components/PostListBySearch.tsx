import { useRouter } from 'next/router';
import React, { useCallback, useEffect } from 'react';
import queryString from 'query-string';

import { DEFAULT_PAGE, DEFAULT_PER } from 'src/lib/constants';
import { useAppDispatch, useAppSelector } from 'src/store/config';
import {
	getPostByCategory,
	getPostBySubCategory,
	getPostByTag,
	getPostByText,
} from 'src/store/search';
import PostListSkeleton from './PostListSkeleton';
import { PostListTemplate } from './PostListTemplate';

const PostListBySearch = ({
	type,
}: {
	type: 'tag' | 'sub' | 'category' | 'text';
}) => {
	const { query } = useRouter();

	const dispatch = useAppDispatch();
	const toDispatch = useCallback(
		(query) => {
			if (type === 'tag') {
				return dispatch(getPostByTag(query));
			}
			if (type === 'text') {
				return dispatch(getPostByText(query));
			}
			if (type === 'sub') {
				return dispatch(getPostBySubCategory(query));
			}
			if (type === 'category') {
				return dispatch(getPostByCategory(query));
			}
		},
		[type, dispatch]
	);
	const { postByQuery, searchLoad } = useAppSelector((state) => state.search);

	useEffect(() => {
		const q = query['q'] || '';

		if (!q) {
			return;
		}

		const page = query['page'] || DEFAULT_PAGE;
		const per = query['per'] || DEFAULT_PER;

		const toQuery = queryString.stringify({ q, per, page });
		toDispatch?.(toQuery);
	}, [dispatch, toDispatch, query]);

	if (searchLoad) {
		return <PostListSkeleton />;
	}

	return (
		<div>
			<PostListTemplate posts={postByQuery} />
		</div>
	);
};

export default PostListBySearch;
