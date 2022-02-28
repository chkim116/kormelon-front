import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from 'src/lib/api';
import { Comment } from 'src/views/post/PostComment';
import { Tags } from './tag';

type PostCategory = {
	id: string;
	value: string;
	parentId: string;
	parentValue: string;
};

export type Post = {
	id: string;
	title: string;
	content: string;
	category: PostCategory;
	tags: Tags;
	readTime: number;
	isPrivate: boolean;
	createdAt: string;
};

export type PostDetail = {
	id: string;
	title: string;
	content: string;
	category: PostCategory;
	comments: Comment[];
	tags: Tags;
	view: number;
	readTime: number;
	isPrivate: boolean;
	createdAt: string;
};

interface PostState {
	posts: Post[];
	post: PostDetail;

	isPostLoad: boolean;
	isPostDone: boolean;
	isPostErr: null | any;

	isPostDetailLoad: boolean;
	isPostDetailDone: boolean;
	isPostDetailErr: null | any;

	isWriteLoad: boolean;
	isWriteDone: boolean;
	isWriteErr: null | any;
}

const initialState: PostState = {
	posts: [],
	post: {
		id: '',
		title: '',
		content: '',
		category: {
			id: '',
			value: '',
			parentId: '',
			parentValue: '',
		},
		comments: [],
		tags: [],
		createdAt: '',
		readTime: 0,
		view: 0,
		isPrivate: false,
	},

	isPostLoad: false,
	isPostDone: false,
	isPostErr: null,

	isPostDetailLoad: false,
	isPostDetailDone: false,
	isPostDetailErr: null,

	isWriteLoad: false,
	isWriteDone: false,
	isWriteErr: null,
};

const post = createSlice({
	name: 'post',
	initialState,
	reducers: {},
	extraReducers: (build) =>
		build
			.addCase(postCreate.pending, (state) => {
				state.isWriteLoad = true;
				state.isWriteDone = false;
				state.isWriteErr = null;
			})
			.addCase(postCreate.fulfilled, (state) => {
				state.isWriteDone = true;
				state.isWriteLoad = false;
			})
			.addCase(postCreate.rejected, (state, { payload }) => {
				state.isWriteLoad = false;
				state.isWriteErr = payload;
			})

			.addCase(getPost.pending, (state) => {
				state.isPostDetailLoad = true;
				state.isPostDetailDone = false;
				state.isPostDetailErr = null;
			})
			.addCase(getPost.fulfilled, (state, { payload }) => {
				state.isPostDetailDone = true;
				state.isPostDetailLoad = false;
				state.post = payload;
			})
			.addCase(getPost.rejected, (state, { payload }) => {
				state.isPostDetailLoad = false;
				state.isPostDetailErr = payload;
			})

			.addCase(getPosts.pending, (state) => {
				state.isPostLoad = true;
				state.isPostDone = false;
				state.isPostErr = null;
			})
			.addCase(getPosts.fulfilled, (state, { payload }) => {
				state.isPostDone = true;
				state.isPostLoad = false;
				state.posts = payload;
			})
			.addCase(getPosts.rejected, (state, { payload }) => {
				state.isPostLoad = false;
				state.isPostErr = payload;
			}),
});

export default post.reducer;

export const postCreate = createAsyncThunk(
	'post/postCreate',
	async (
		data: {
			title: string;
			content: string;
			isPrivate: boolean;
			parentCategory: string;
			category: string;
			tags: string[];
		},
		{ rejectWithValue }
	) => {
		try {
			const postId = await api.post('/post', data).then((res) => res.data);
			return postId;
		} catch (err: any) {
			return rejectWithValue(err.response.data.message);
		}
	}
);

export const getPost = createAsyncThunk(
	'post/getPost',
	async (id: string, { rejectWithValue }) => {
		try {
			const post = await api.get(`/post/${id}`).then((res) => res.data);
			return post;
		} catch (err: any) {
			return rejectWithValue(err.response.data.message);
		}
	}
);

export const getPosts = createAsyncThunk(
	'post/getPosts',
	async (_, { rejectWithValue }) => {
		try {
			const post = await api.get('/post').then((res) => res.data);
			return post;
		} catch (err: any) {
			return rejectWithValue(err.response.data.message);
		}
	}
);
