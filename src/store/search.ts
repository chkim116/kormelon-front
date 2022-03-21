import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from 'src/lib/api';
import { Post } from './post';

interface SearchState {
	searchLoad: boolean;
	searchDone: boolean;
	searchErr: null | any;

	postByQuery: Post;
}

const initialState: SearchState = {
	searchLoad: false,
	searchErr: null,
	searchDone: false,

	postByQuery: {
		total: 0,
		results: [],
	},
};

const search = createSlice({
	name: 'search',
	initialState,
	reducers: {},
	extraReducers: (build) =>
		build
			.addCase(getPostByText.pending, (state) => {
				state.searchLoad = true;
				state.searchDone = false;
				state.searchErr = null;
			})
			.addCase(getPostByText.fulfilled, (state, { payload }) => {
				state.searchLoad = false;
				state.searchDone = true;
				state.postByQuery = payload;
			})
			.addCase(getPostByText.rejected, (state, { payload }) => {
				state.searchLoad = false;
				state.searchErr = payload;
			})

			.addCase(getPostByTag.pending, (state) => {
				state.searchLoad = true;
				state.searchDone = false;
				state.searchErr = null;
			})
			.addCase(getPostByTag.fulfilled, (state, { payload }) => {
				state.searchLoad = false;
				state.searchDone = true;
				state.postByQuery = payload;
			})
			.addCase(getPostByTag.rejected, (state, { payload }) => {
				state.searchLoad = false;
				state.searchErr = payload;
			})

			.addCase(getPostByCategory.pending, (state) => {
				state.searchLoad = true;
				state.searchDone = false;
				state.searchErr = null;
			})
			.addCase(getPostByCategory.fulfilled, (state, { payload }) => {
				state.searchLoad = false;
				state.searchDone = true;
				state.postByQuery = payload;
			})
			.addCase(getPostByCategory.rejected, (state, { payload }) => {
				state.searchLoad = false;
				state.searchErr = payload;
			})

			.addCase(getPostBySubCategory.pending, (state) => {
				state.searchLoad = true;
				state.searchDone = false;
				state.searchErr = null;
			})
			.addCase(getPostBySubCategory.fulfilled, (state, { payload }) => {
				state.searchLoad = false;
				state.searchDone = true;
				state.postByQuery = payload;
			})
			.addCase(getPostBySubCategory.rejected, (state, { payload }) => {
				state.searchLoad = false;
				state.searchErr = payload;
			}),
});

export default search.reducer;

export const getPostByText = createAsyncThunk(
	'search/getPostByText',
	async (query: string, { rejectWithValue }) => {
		try {
			return await api.get(`/search?${query}`).then((res) => res.data);
		} catch (err: any) {
			return rejectWithValue(err.response.data.message);
		}
	}
);

export const getPostByTag = createAsyncThunk(
	'search/getPostByTag',
	async (query: string, { rejectWithValue }) => {
		try {
			return await api.get(`/search/tag?${query}`).then((res) => res.data);
		} catch (err: any) {
			return rejectWithValue(err.response.data.message);
		}
	}
);

export const getPostByCategory = createAsyncThunk(
	'search/getPostByCategory',
	async (query: string, { rejectWithValue }) => {
		try {
			return await api.get(`/search/category?${query}`).then((res) => res.data);
		} catch (err: any) {
			return rejectWithValue(err.response.data.message);
		}
	}
);

export const getPostBySubCategory = createAsyncThunk(
	'search/getPostBySubCategory',
	async (query: string, { rejectWithValue }) => {
		try {
			return await api.get(`/search/sub?${query}`).then((res) => res.data);
		} catch (err: any) {
			return rejectWithValue(err.response.data.message);
		}
	}
);
