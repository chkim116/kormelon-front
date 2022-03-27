import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { api } from 'src/lib/api';

interface Notification {
	postId: string;
	postTitle: string;
	type: 'comment' | 'reply';
	targetId: string;
	value: string;
	author: string;
	isRead: boolean;
	createdAt: string;
}

type UserData = {
	id: string;
	username: string;
	email: string;
	isAdmin: boolean;
	notifications: Notification[];
};

interface UserState {
	userData: UserData | null;
	isLoginLoad: boolean;
	isLoginDone: boolean;
	isLoginErr: null | any;

	isLogoutLoad: boolean;
	isLogoutDone: boolean;
	isLogoutErr: null | any;

	isRegisterLoad: boolean;
	isRegisterDone: boolean;
	isRegisterErr: null | any;
}

const initialState: UserState = {
	userData: null,
	isLoginLoad: false,
	isLoginErr: null,
	isLoginDone: false,

	isLogoutLoad: false,
	isLogoutErr: null,
	isLogoutDone: false,

	isRegisterLoad: false,
	isRegisterErr: null,
	isRegisterDone: false,
};

const user = createSlice({
	initialState,
	name: 'user',
	reducers: {},
	extraReducers: (build) =>
		build
			.addCase(postLogin.pending, (state) => {
				state.isLoginLoad = true;
				state.isLoginDone = false;
				state.isLoginErr = null;
			})
			.addCase(
				postLogin.fulfilled,
				(state, { payload }: PayloadAction<UserData>) => {
					state.isLoginLoad = false;
					state.isLoginDone = true;
					state.userData = payload;
				}
			)
			.addCase(postLogin.rejected, (state, { payload }) => {
				state.isLoginLoad = false;
				state.isLoginErr = payload;
			})

			.addCase(postLogout.pending, (state) => {
				state.isLogoutLoad = true;
				state.isLogoutDone = false;
				state.isLogoutErr = null;
			})
			.addCase(postLogout.fulfilled, (state) => {
				state.isLogoutLoad = false;
				state.isLogoutDone = true;
				state.userData = null;
			})
			.addCase(postLogout.rejected, (state, { payload }) => {
				state.isLogoutLoad = false;
				state.isLogoutErr = payload;
			})

			.addCase(postRegister.pending, (state) => {
				state.isRegisterLoad = true;
				state.isRegisterDone = false;
				state.isRegisterErr = null;
			})
			.addCase(postRegister.fulfilled, (state) => {
				state.isRegisterLoad = false;
				state.isRegisterDone = true;
			})
			.addCase(postRegister.rejected, (state, { payload }) => {
				state.isRegisterLoad = false;
				state.isRegisterErr = payload;
			})

			.addCase(getUser.fulfilled, (state, { payload }) => {
				state.userData = payload;
			})
			.addCase(getUser.rejected, (state) => {
				state.userData = null;
			}),
});

// export const {} = user.actions;

export default user.reducer;

// thunk
export const postLogin = createAsyncThunk(
	'user/postLogin',
	async (data: { email: string; password: string }, { rejectWithValue }) => {
		try {
			const res = await api.post('/user/login', data).then((res) => res.data);
			return res;
		} catch (err: any) {
			return rejectWithValue(err.response.data.message);
		}
	}
);

export const postLogout = createAsyncThunk(
	'user/postLogout',
	async (_, { rejectWithValue }) => {
		try {
			await api.post('/user/logout');
		} catch (err: any) {
			return rejectWithValue(err.response.data.message);
		}
	}
);

export const postRegister = createAsyncThunk(
	'user/postRegister',
	async (
		data: { email: string; username: string; password: string },
		{ rejectWithValue }
	) => {
		try {
			return await api.post('/user/register', data);
		} catch (err: any) {
			return rejectWithValue(err.response.data.message);
		}
	}
);

export const getUser = createAsyncThunk(
	'user/getUser',
	async (_, { rejectWithValue }) => {
		try {
			return await api.get('/user/auth').then((res) => res.data);
		} catch (err: any) {
			return rejectWithValue(err.response.data.message);
		}
	}
);
