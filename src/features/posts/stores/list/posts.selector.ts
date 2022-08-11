import { createDraftSafeSelector, createSelector } from '@reduxjs/toolkit';
import { RootState } from '@common/store';

const selPosts = (state: RootState) => state.posts;

export const selPostListLoading = createSelector(
	selPosts,
	(state) => state.loading
);

export const selPostList = createSelector(selPosts, (state) => state.postList);

export const drfPostSearchParams = createDraftSafeSelector(
	selPosts,
	(state) => state.params
);
