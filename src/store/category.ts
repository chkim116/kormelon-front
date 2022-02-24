import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { api } from 'src/lib/api';

export interface Category {
	id: string;
	value: string;
	posts?: any[];
	categories: Category[];
}

interface InitialState {
	categories: Category[];
	isCategoryLoad: boolean;
	isCategoryDone: boolean;
	isCategoryErr: null | any;

	isCreateLoad: boolean;
	isCreateDone: boolean;
	isCreateErr: null | any;

	isSubCreateLoad: boolean;
	isSubCreateDone: boolean;
	isSubCreateErr: null | any;

	isDeleteLoad: boolean;
	isDeleteDone: boolean;
	isDeleteErr: null | any;

	isSubDeleteLoad: boolean;
	isSubDeleteDone: boolean;
	isSubDeleteErr: null | any;
}

const initialState: InitialState = {
	categories: [],
	isCategoryLoad: false,
	isCategoryDone: false,
	isCategoryErr: null,

	isCreateLoad: false,
	isCreateDone: false,
	isCreateErr: null,

	isSubCreateLoad: false,
	isSubCreateDone: false,
	isSubCreateErr: null,

	isDeleteLoad: false,
	isDeleteDone: false,
	isDeleteErr: null,

	isSubDeleteLoad: false,
	isSubDeleteDone: false,
	isSubDeleteErr: null,
};

const category = createSlice({
	name: 'category',
	initialState,
	reducers: {},
	extraReducers: (build) =>
		build
			.addCase(getCategory.pending, (state) => {
				state.isCategoryLoad = true;
				state.isCategoryDone = false;
				state.isCategoryErr = null;
			})
			.addCase(getCategory.fulfilled, (state, { payload }) => {
				state.isCategoryLoad = false;
				state.isCategoryDone = true;
				state.categories = payload;
			})
			.addCase(getCategory.rejected, (state, { payload }) => {
				state.isCategoryLoad = false;
				state.isCategoryErr = payload;
			})

			.addCase(postCategory.pending, (state) => {
				state.isCreateLoad = true;
				state.isCreateDone = true;
				state.isCreateErr = null;
			})
			.addCase(postCategory.fulfilled, (state) => {
				state.isCreateDone = false;
				state.isCreateLoad = false;
			})
			.addCase(postCategory.rejected, (state, { payload }) => {
				state.isCreateLoad = false;
				state.isCreateErr = payload;
			})

			.addCase(postSubCategory.pending, (state) => {
				state.isSubCreateLoad = true;
				state.isSubCreateDone = false;
				state.isSubCreateErr = null;
			})
			.addCase(postSubCategory.fulfilled, (state) => {
				state.isSubCreateDone = true;
				state.isSubCreateLoad = false;
			})
			.addCase(postSubCategory.rejected, (state, { payload }) => {
				state.isSubCreateLoad = false;
				state.isSubCreateErr = payload;
			})

			.addCase(deleteCategory.pending, (state) => {
				state.isDeleteLoad = true;
				state.isDeleteDone = false;
				state.isDeleteErr = null;
			})
			.addCase(deleteCategory.fulfilled, (state) => {
				state.isDeleteDone = true;
				state.isDeleteLoad = false;
			})
			.addCase(deleteCategory.rejected, (state, { payload }) => {
				state.isDeleteLoad = false;
				state.isDeleteErr = payload;
			})

			.addCase(deleteSubCategory.pending, (state) => {
				state.isSubDeleteLoad = true;
				state.isSubDeleteDone = false;
				state.isSubDeleteErr = null;
			})
			.addCase(deleteSubCategory.fulfilled, (state) => {
				state.isSubDeleteDone = true;
				state.isSubDeleteLoad = false;
			})
			.addCase(deleteSubCategory.rejected, (state, { payload }) => {
				state.isSubDeleteLoad = false;
				state.isSubDeleteErr = payload;
			}),
});

// export const {} = category.actions;

export default category.reducer;

// thunk
export const getCategory = createAsyncThunk(
	'category/getCategory',
	async (_, { rejectWithValue }) => {
		try {
			const res = await api.get('/category').then((res) => res.data);
			return res;
		} catch (err: any) {
			return rejectWithValue(err.response.data.message);
		}
	}
);

export const postCategory = createAsyncThunk(
	'category/postCategory',
	async (value: string, { rejectWithValue, dispatch }) => {
		try {
			await api.post('/category', { value });
			dispatch(getCategory());
		} catch (err: any) {
			return rejectWithValue(err.response.data.message);
		}
	}
);

export const postSubCategory = createAsyncThunk(
	'category/postSubCategory',
	async (
		data: { parentId: string; value: string },
		{ rejectWithValue, dispatch }
	) => {
		try {
			await api.post(`/category/${data.parentId}/sub`, {
				value: data.value,
			});
			dispatch(getCategory());
		} catch (err: any) {
			return rejectWithValue(err.response.data.message);
		}
	}
);

export const deleteCategory = createAsyncThunk(
	'category/deleteCategory',
	async (id: string, { rejectWithValue, dispatch }) => {
		try {
			await api.delete(`/category/${id}`);
			dispatch(getCategory());
		} catch (err: any) {
			return rejectWithValue(err.response.data.message);
		}
	}
);

export const deleteSubCategory = createAsyncThunk(
	'category/deleteSubCategory',
	async (id: string, { rejectWithValue, dispatch }) => {
		try {
			await api.delete(`/category/${id}/sub`);
			dispatch(getCategory());
		} catch (err: any) {
			return rejectWithValue(err.response.data.message);
		}
	}
);
