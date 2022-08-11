import { createAsyncThunk } from '@reduxjs/toolkit';

import {
	PostCreateParams,
	PostDetailEntity,
	PostListResultPayload,
	PostListSearchParams,
	PostUpdateParams,
} from '@core/entities/posts/posts.entity';
import { repo } from '@core/repo';

export const effPostListLoad = createAsyncThunk<
	PostListResultPayload,
	PostListSearchParams
>('postListLoad', async (params, { rejectWithValue }) => {
	try {
		const {
			data: { results, total },
		} = await repo.posts.getPostList(params);

		return {
			results,
			total,
		};
	} catch (err) {
		return rejectWithValue(err);
	}
});

export const effPostDetailLoad = createAsyncThunk<PostDetailEntity, string>(
	'postDetailLoad',
	async (postId, { rejectWithValue }) => {
		try {
			const { data: postDetail } = await repo.posts.getPostDetail(postId);

			return postDetail;
		} catch (err) {
			return rejectWithValue(err);
		}
	}
);

export const effPostCreate = createAsyncThunk<string, PostCreateParams>(
	'postCreate',
	async (params, { rejectWithValue }) => {
		try {
			const { data: postId } = await repo.posts.createPost(params);

			return postId;
		} catch (err) {
			return rejectWithValue(err);
		}
	}
);

export const effPostUpdate = createAsyncThunk<string, PostUpdateParams>(
	'postUpdate',
	async (params, { rejectWithValue }) => {
		try {
			const { data: postId } = await repo.posts.updatePost(params);

			return postId;
		} catch (err) {
			return rejectWithValue(err);
		}
	}
);

export const effPostDelete = createAsyncThunk<void, string>(
	'postDelete',
	async (postId, { rejectWithValue }) => {
		try {
			await repo.posts.deletePost(postId);
		} catch (err) {
			return rejectWithValue(err);
		}
	}
);
