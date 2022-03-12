import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from 'src/lib/api';

interface CommentState {
	isCreateCommentLoad: boolean;
	isCreateCommentDone: boolean;
	isCreateCommentErr: null | any;

	isCreateReplyLoad: boolean;
	isCreateReplyDone: boolean;
	isCreateReplyErr: null | any;
}

const initialState: CommentState = {
	isCreateCommentLoad: false,
	isCreateCommentDone: false,
	isCreateCommentErr: null,

	isCreateReplyLoad: false,
	isCreateReplyDone: false,
	isCreateReplyErr: null,
};

const comment = createSlice({
	name: 'comment',
	initialState,
	reducers: {},
	extraReducers: (build) =>
		build
			.addCase(postCreateComment.pending, (state) => {
				state.isCreateCommentLoad = true;
				state.isCreateCommentDone = false;
				state.isCreateCommentErr = null;
			})
			.addCase(postCreateComment.fulfilled, (state) => {
				state.isCreateCommentLoad = false;
				state.isCreateCommentDone = true;
			})
			.addCase(postCreateComment.rejected, (state, { payload }) => {
				state.isCreateCommentLoad = false;
				state.isCreateCommentErr = payload;
			})

			.addCase(postCreateReply.pending, (state) => {
				state.isCreateReplyLoad = true;
				state.isCreateReplyDone = false;
				state.isCreateReplyErr = null;
			})
			.addCase(postCreateReply.fulfilled, (state) => {
				state.isCreateReplyLoad = false;
				state.isCreateReplyDone = true;
			})
			.addCase(postCreateReply.rejected, (state, { payload }) => {
				state.isCreateReplyLoad = false;
				state.isCreateReplyErr = payload;
			}),
});

export const postCreateComment = createAsyncThunk(
	'comment/postCreateComment',
	async (
		data: {
			id: string;
			text: string;
			username?: string;
			password?: string;
		},
		{ rejectWithValue }
	) => {
		const { id, ...rest } = data;
		try {
			await api.post(`/post/comment/${id}`, rest);
		} catch (err: any) {
			return rejectWithValue(err.response.data.message);
		}
	}
);

export const postCreateReply = createAsyncThunk(
	'comment/postCreateReply',
	async (
		data: {
			id: string;
			text: string;
			username?: string;
			password?: string;
		},
		{ rejectWithValue }
	) => {
		const { id, ...rest } = data;
		try {
			await api.post(`/post/comment/reply/${id}`, rest);
		} catch (err: any) {
			return rejectWithValue(err.response.data.message);
		}
	}
);

export default comment.reducer;
