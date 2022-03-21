import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { api } from 'src/lib/api';

export type Tags = {
	id: string;
	value: string;
	count: number;
}[];

interface Tag {
	tags: Tags;

	isTagSearchDone: boolean;
	isTagSearchLoad: boolean;
	isTagSearchErr: null | any;

	isTagsSearchDone: boolean;
	isTagsSearchLoad: boolean;
	isTagsSearchErr: null | any;
}

const initialState: Tag = {
	tags: [],
	isTagSearchDone: false,
	isTagSearchLoad: false,
	isTagSearchErr: null,

	isTagsSearchDone: false,
	isTagsSearchLoad: false,
	isTagsSearchErr: null,
};

const tag = createSlice({
	name: 'tag',
	initialState,
	reducers: {},
	extraReducers: (build) =>
		build
			.addCase(postSearchTag.pending, (state) => {
				state.isTagSearchLoad = true;
				state.isTagSearchDone = false;
				state.isTagSearchErr = null;
			})
			.addCase(
				postSearchTag.fulfilled,
				(state, { payload }: PayloadAction<Tags>) => {
					state.isTagSearchLoad = false;
					state.isTagSearchDone = true;
					state.tags = payload;
				}
			)
			.addCase(postSearchTag.rejected, (state, { payload }) => {
				state.isTagSearchLoad = false;
				state.isTagSearchErr = payload;
			})

			.addCase(getTags.pending, (state) => {
				state.isTagsSearchLoad = true;
				state.isTagsSearchDone = false;
				state.isTagsSearchErr = null;
			})
			.addCase(getTags.fulfilled, (state, { payload }: PayloadAction<Tags>) => {
				state.isTagsSearchLoad = false;
				state.isTagsSearchDone = true;
				state.tags = payload;
			})
			.addCase(getTags.rejected, (state, { payload }) => {
				state.isTagsSearchLoad = false;
				state.isTagsSearchErr = payload;
			}),
});

export default tag.reducer;

export const postSearchTag = createAsyncThunk(
	'tag/postSearchTag',
	async (value: string, { rejectWithValue }) => {
		try {
			const tags = await api
				.post('/tags/search', { value })
				.then((res) => res.data);
			return tags;
		} catch (err: any) {
			return rejectWithValue(err.response.data.message);
		}
	}
);

export const getTags = createAsyncThunk(
	'tag/getTags',
	async (_, { rejectWithValue }) => {
		try {
			return await api.get('/tags').then((res) => res.data);
		} catch (err) {
			return rejectWithValue(err);
		}
	}
);
