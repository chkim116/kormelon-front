import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useMemo } from 'react';
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

	const toQuery = useMemo(() => {
		const q = query['q'] || '';

		if (!q) {
			return;
		}

		const page = query['page'] || DEFAULT_PAGE;
		const per = query['per'] || DEFAULT_PER;

		return queryString.stringify({ q, per, page });
	}, [query]);

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
		toQuery && toDispatch?.(toQuery);
	}, [toDispatch, toQuery]);

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
