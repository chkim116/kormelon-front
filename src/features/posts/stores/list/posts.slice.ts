import { createSlice } from '@reduxjs/toolkit';

import {
	PostDetailEntity,
	PostListEntity,
	PostListSearchParams,
} from '@core/entities/posts/posts.entity';
import { createPostDetail } from '@features/posts/manipulates/posts.create';
import {
	effPostDetailLoad,
	effPostListLoad,
	effPostCreate,
	effPostUpdate,
	effPostDelete,
} from './posts.effect';

interface postsSliceState {
	loading: boolean;

	params: PostListSearchParams;
	total: number;
	postList: PostListEntity[];
	postDetail: PostDetailEntity;
}

function getPostsSliceState(): postsSliceState {
	return {
		loading: false,

		params: {
			per: 5,
			page: 1,
		},
		total: 0,
		postList: [],
		postDetail: createPostDetail(),
	};
}

export const postsSlice = createSlice({
	name: 'postsSlice',
	initialState: getPostsSliceState(),
	reducers: {},
	extraReducers: (builder) =>
		builder
			.addCase(effPostListLoad.pending, (state, { meta }) => {
				state.loading = true;
				state.params = meta.arg;
			})
			.addCase(effPostListLoad.rejected, (state) => {
				state.loading = false;
			})
			.addCase(effPostListLoad.fulfilled, (state, { payload }) => {
				state.loading = false;
				state.postList = payload.results;
				state.total = payload.total;
			})

			.addCase(effPostDetailLoad.pending, (state) => {
				state.loading = true;
			})
			.addCase(effPostDetailLoad.rejected, (state) => {
				state.loading = false;
			})
			.addCase(effPostDetailLoad.fulfilled, (state, { payload }) => {
				state.loading = false;
				state.postDetail = payload;
			})

			.addCase(effPostCreate.pending, (state) => {
				state.loading = true;
			})
			.addCase(effPostCreate.rejected, (state) => {
				state.loading = false;
			})
			.addCase(effPostCreate.fulfilled, (state) => {
				state.loading = false;
			})

			.addCase(effPostUpdate.pending, (state) => {
				state.loading = true;
			})
			.addCase(effPostUpdate.rejected, (state) => {
				state.loading = false;
			})
			.addCase(effPostUpdate.fulfilled, (state) => {
				state.loading = false;
			})

			.addCase(effPostDelete.pending, (state) => {
				state.loading = true;
			})
			.addCase(effPostDelete.rejected, (state) => {
				state.loading = false;
			})
			.addCase(effPostDelete.fulfilled, (state) => {
				state.loading = false;
			}),
});
