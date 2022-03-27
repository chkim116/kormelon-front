import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { api } from 'src/lib/api';
import { Comment, CommentReply } from 'src/views/post/PostComment';
import { Tags } from './tag';

type PostCategory = {
	id: string;
	value: string;
	parentId: string;
	parentValue: string;
};

export type Posts = {
	total: number;
	results: {
		id: string;
		title: string;
		category: PostCategory;
		view: number;
		commentLength: number;
		tags: Tags;
		readTime: number;
		isPrivate: boolean;
		createdAt: string;
	}[];
};

export type PostDetail = {
	id: string;
	userId: string;
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
	posts: Posts;
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

	isWriteEditLoad: boolean;
	isWriteEditDone: boolean;
	isWriteEditErr: null | any;

	isPostDeleteLoad: boolean;
	isPostDeleteDone: boolean;
	isPostDeleteErr: null | any;
}

const initialState: PostState = {
	posts: {
		total: 0,
		results: [],
	},
	post: {
		id: '',
		userId: '',
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

	isWriteEditLoad: false,
	isWriteEditDone: false,
	isWriteEditErr: null,

	isPostDeleteLoad: false,
	isPostDeleteDone: false,
	isPostDeleteErr: null,
};

const post = createSlice({
	name: 'post',
	initialState,
	reducers: {
		// 댓글 CRUD -> comment reducer에서 사용
		addPostComment: (state, { payload }: PayloadAction<Comment>) => {
			state.post.comments = [...state.post.comments, payload];
		},
		addPostCommentReply: (
			state,
			{ payload }: PayloadAction<{ id: string; commentReply: CommentReply }>
		) => {
			state.post.comments = state.post.comments.map((comment) => ({
				...comment,
				commentReplies:
					comment.id === payload.id
						? [...comment.commentReplies, payload.commentReply]
						: comment.commentReplies,
			}));
		},
		updatePostComment: (
			state,
			{ payload }: PayloadAction<{ id: string; text: string }>
		) => {
			state.post.comments = state.post.comments.map((comment) => ({
				...comment,
				text: comment.id === payload.id ? payload.text : comment.text,
			}));
		},
		deletePostComment: (state, { payload }: PayloadAction<{ id: string }>) => {
			const existReply = state.post.comments.find(
				(comment) => comment.id === payload.id
			)?.commentReplies.length;

			state.post.comments = existReply
				? state.post.comments.map((comment) => ({
						...comment,
						text:
							comment.id === payload.id ? '삭제된 댓글입니다.' : comment.text,
						deletedAt: new Date().toISOString(),
				  }))
				: state.post.comments.filter((comment) => comment.id !== payload.id);
		},
		updatePostCommentReply: (
			state,
			{ payload }: PayloadAction<{ id: string; text: string }>
		) => {
			state.post.comments = state.post.comments.map((comment) => ({
				...comment,
				commentReplies: comment.commentReplies.map((reply) => ({
					...reply,
					text: reply.id === payload.id ? payload.text : reply.text,
				})),
			}));
		},
		deletePostCommentReply: (
			state,
			{ payload }: PayloadAction<{ id: string }>
		) => {
			state.post.comments = state.post.comments.map((comment) => ({
				...comment,
				commentReplies: comment.commentReplies.filter(
					(reply) => reply.id !== payload.id
				),
			}));
		},
	},
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

			.addCase(patchPost.pending, (state) => {
				state.isWriteEditLoad = true;
				state.isWriteEditDone = false;
				state.isWriteEditErr = null;
			})
			.addCase(patchPost.fulfilled, (state) => {
				state.isWriteEditDone = true;
				state.isWriteEditLoad = false;
			})
			.addCase(patchPost.rejected, (state, { payload }) => {
				state.isWriteEditLoad = false;
				state.isWriteEditErr = payload;
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
			})

			.addCase(deletePost.pending, (state) => {
				state.isPostDeleteLoad = true;
				state.isPostDeleteDone = false;
				state.isPostDeleteErr = null;
			})
			.addCase(deletePost.fulfilled, (state) => {
				state.isPostDeleteDone = true;
				state.isPostDeleteLoad = false;
			})
			.addCase(deletePost.rejected, (state, { payload }) => {
				state.isPostDeleteLoad = false;
				state.isPostDeleteErr = payload;
			}),
});

export const {
	addPostComment,
	addPostCommentReply,
	updatePostComment,
	updatePostCommentReply,
	deletePostComment,
	deletePostCommentReply,
} = post.actions;

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

export const patchPost = createAsyncThunk(
	'post/patchPost',
	async (
		data: {
			id: string;
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
			const { id, ...withoutId } = data;
			const postId = await api
				.patch(`/post/${id}`, withoutId)
				.then((res) => res.data);
			return postId;
		} catch (err: any) {
			return rejectWithValue(err.response.data.message);
		}
	}
);

export const getPost = createAsyncThunk(
	'post/getPost',
	async (
		{ id, token = '' }: { id: string; token?: string },
		{ rejectWithValue }
	) => {
		try {
			const post = await api
				.get(`/post/${id}`, {
					headers: {
						Cookie: `auth=${token}`,
					},
					withCredentials: true,
				})
				.then((res) => res.data);
			return post;
		} catch (err: any) {
			return rejectWithValue(err.response.data.message);
		}
	}
);

export const getPosts = createAsyncThunk(
	'post/getPosts',
	async (queries: string, { rejectWithValue }) => {
		try {
			const post = await api.get(`/post?${queries}`).then((res) => res.data);
			return post;
		} catch (err: any) {
			return rejectWithValue(err.response.data.message);
		}
	}
);

export const deletePost = createAsyncThunk(
	'post/deletePost',
	async (id: string, { rejectWithValue }) => {
		try {
			await api.delete(`/post/${id}`).then((res) => res.data);
		} catch (err: any) {
			return rejectWithValue(err.response.data.message);
		}
	}
);
