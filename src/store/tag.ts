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
}

const initialState: Tag = {
	tags: [],
	isTagSearchDone: false,
	isTagSearchLoad: false,
	isTagSearchErr: null,
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
