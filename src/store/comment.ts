import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from 'src/lib/api';

interface CommentState {
	isCreateCommentLoad: boolean;
	isCreateCommentDone: boolean;
	isCreateCommentErr: null | any;

	isCreateReplyLoad: boolean;
	isCreateReplyDone: boolean;
	isCreateReplyErr: null | any;

	isEditCommentLoad: boolean;
	isEditCommentDone: boolean;
	isEditCommentErr: null | any;

	isEditReplyLoad: boolean;
	isEditReplyDone: boolean;
	isEditReplyErr: null | any;

	isDeleteCommentLoad: boolean;
	isDeleteCommentDone: boolean;
	isDeleteCommentErr: null | any;

	isDeleteReplyLoad: boolean;
	isDeleteReplyDone: boolean;
	isDeleteReplyErr: null | any;
}

const initialState: CommentState = {
	isCreateCommentLoad: false,
	isCreateCommentDone: false,
	isCreateCommentErr: null,

	isCreateReplyLoad: false,
	isCreateReplyDone: false,
	isCreateReplyErr: null,

	isEditCommentLoad: false,
	isEditCommentDone: false,
	isEditCommentErr: null,

	isEditReplyLoad: false,
	isEditReplyDone: false,
	isEditReplyErr: null,

	isDeleteCommentLoad: false,
	isDeleteCommentDone: false,
	isDeleteCommentErr: null,

	isDeleteReplyLoad: false,
	isDeleteReplyDone: false,
	isDeleteReplyErr: null,
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
			})

			.addCase(patchComment.pending, (state) => {
				state.isEditCommentLoad = true;
				state.isEditCommentDone = false;
				state.isEditCommentErr = null;
			})
			.addCase(patchComment.fulfilled, (state) => {
				state.isEditCommentLoad = false;
				state.isEditCommentDone = true;
			})
			.addCase(patchComment.rejected, (state, { payload }) => {
				state.isEditCommentLoad = false;
				state.isEditCommentErr = payload;
			})

			.addCase(deleteComment.pending, (state) => {
				state.isDeleteCommentLoad = true;
				state.isDeleteCommentDone = false;
				state.isDeleteCommentErr = null;
			})
			.addCase(deleteComment.fulfilled, (state) => {
				state.isDeleteCommentLoad = false;
				state.isDeleteCommentDone = true;
			})
			.addCase(deleteComment.rejected, (state, { payload }) => {
				state.isDeleteCommentLoad = false;
				state.isDeleteCommentErr = payload;
			})

			.addCase(patchReply.pending, (state) => {
				state.isEditReplyLoad = true;
				state.isEditReplyDone = false;
				state.isEditReplyErr = null;
			})
			.addCase(patchReply.fulfilled, (state) => {
				state.isEditReplyLoad = false;
				state.isEditReplyDone = true;
			})
			.addCase(patchReply.rejected, (state, { payload }) => {
				state.isEditReplyLoad = false;
				state.isEditReplyErr = payload;
			})

			.addCase(deleteReply.pending, (state) => {
				state.isDeleteReplyLoad = true;
				state.isDeleteReplyDone = false;
				state.isDeleteReplyErr = null;
			})
			.addCase(deleteReply.fulfilled, (state) => {
				state.isDeleteReplyLoad = false;
				state.isDeleteReplyDone = true;
			})
			.addCase(deleteReply.rejected, (state, { payload }) => {
				state.isDeleteReplyLoad = false;
				state.isDeleteReplyErr = payload;
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

export const patchComment = createAsyncThunk(
	'comment/patchComment',
	async (data: { id: string; text: string }, { rejectWithValue }) => {
		const { id, text } = data;
		try {
			await api.patch(`/post/comment/${id}`, { text });
		} catch (err: any) {
			return rejectWithValue(err.response.data.message);
		}
	}
);

export const patchReply = createAsyncThunk(
	'comment/patchReply',
	async (data: { id: string; text: string }, { rejectWithValue }) => {
		const { id, text } = data;
		try {
			await api.patch(`/post/comment/reply/${id}`, { text });
		} catch (err: any) {
			return rejectWithValue(err.response.data.message);
		}
	}
);

export const deleteComment = createAsyncThunk(
	'comment/deleteComment',
	async (id: string, { rejectWithValue }) => {
		try {
			await api.delete(`/post/comment/${id}`);
		} catch (err: any) {
			return rejectWithValue(err.response.data.message);
		}
	}
);

export const deleteReply = createAsyncThunk(
	'comment/deleteReply',
	async (id: string, { rejectWithValue }) => {
		try {
			await api.delete(`/post/comment/reply/${id}`);
		} catch (err: any) {
			return rejectWithValue(err.response.data.message);
		}
	}
);

export default comment.reducer;
