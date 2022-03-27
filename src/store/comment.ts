import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { api } from 'src/lib/api';
import { addNotification } from './notification';
import {
	addPostComment,
	addPostCommentReply,
	deletePostComment,
	deletePostCommentReply,
	updatePostComment,
	updatePostCommentReply,
} from './post';

interface CommentState {
	focusId: string;

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
	focusId: '',

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
	reducers: {
		setFocusCommentId: (state, { payload }: PayloadAction<string>) => {
			state.focusId = payload;
		},
		removeFocusCommentId: (state) => {
			state.focusId = '';
		},
	},
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
		{ rejectWithValue, dispatch }
	) => {
		const { id, ...withoutId } = data;
		try {
			const comment = await api
				.post(`/post/comment/${id}`, withoutId)
				.then((res) => res.data);
			await dispatch(addPostComment(comment));
			dispatch(
				addNotification({ type: 'success', message: '댓글이 작성되었습니다.' })
			);
			dispatch(setFocusCommentId(comment.id));
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
		{ rejectWithValue, dispatch }
	) => {
		const { id, ...withoutId } = data;
		try {
			const commentReply = await api
				.post(`/post/comment/reply/${id}`, withoutId)
				.then((res) => res.data);
			await dispatch(addPostCommentReply({ id, commentReply }));
			dispatch(
				addNotification({
					type: 'success',
					message: '댓글이 작성되었습니다.',
				})
			);
			dispatch(setFocusCommentId(commentReply.id));
		} catch (err: any) {
			return rejectWithValue(err.response.data.message);
		}
	}
);

export const patchComment = createAsyncThunk(
	'comment/patchComment',
	async (
		data: { id: string; text: string; password?: string },
		{ rejectWithValue, dispatch }
	) => {
		const { id, ...withoutId } = data;
		try {
			await api.patch(`/post/comment/${id}`, withoutId);
			dispatch(updatePostComment({ id, text: withoutId.text }));
			dispatch(
				addNotification({
					type: 'success',
					message: '댓글이 수정되었습니다.',
				})
			);
		} catch (err: any) {
			return rejectWithValue(err.response.data.message);
		}
	}
);

export const patchReply = createAsyncThunk(
	'comment/patchReply',
	async (
		data: { id: string; text: string; password?: string },
		{ rejectWithValue, dispatch }
	) => {
		const { id, ...withoutId } = data;
		try {
			await api.patch(`/post/comment/reply/${id}`, withoutId);
			dispatch(updatePostCommentReply({ id, text: withoutId.text }));
			dispatch(
				addNotification({
					type: 'success',
					message: '댓글이 수정되었습니다.',
				})
			);
		} catch (err: any) {
			return rejectWithValue(err.response.data.message);
		}
	}
);

export const deleteComment = createAsyncThunk(
	'comment/deleteComment',
	async (
		data: { id: string; password?: string },
		{ rejectWithValue, dispatch }
	) => {
		const { id, password } = data;
		try {
			await api.delete(`/post/comment/${id}`, { data: { password } });
			dispatch(deletePostComment({ id }));
			dispatch(
				addNotification({
					type: 'success',
					message: '댓글이 삭제되었습니다.',
				})
			);
		} catch (err: any) {
			return rejectWithValue(err.response.data.message);
		}
	}
);

export const deleteReply = createAsyncThunk(
	'comment/deleteReply',
	async (
		data: { id: string; password?: string },
		{ rejectWithValue, dispatch }
	) => {
		const { id, password } = data;
		try {
			await api.delete(`/post/comment/reply/${id}`, { data: { password } });
			dispatch(deletePostCommentReply({ id }));
			dispatch(
				addNotification({
					type: 'success',
					message: '댓글이 삭제되었습니다.',
				})
			);
		} catch (err: any) {
			return rejectWithValue(err.response.data.message);
		}
	}
);

export const { setFocusCommentId, removeFocusCommentId } = comment.actions;

export default comment.reducer;
