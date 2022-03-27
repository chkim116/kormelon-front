import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { api } from 'src/lib/api';

const initialState = {
	today: 0,
	total: 0,
	isView: false,
};

const view = createSlice({
	name: 'view',
	initialState,
	reducers: {},
	extraReducers: (build) =>
		build.addCase(
			getView.fulfilled,
			(state, { payload }: PayloadAction<{ today: number; total: number }>) => {
				state.today = payload.today;
				state.total = payload.total;
				state.isView = true;
			}
		),
});

export default view.reducer;

export const getView = createAsyncThunk('view/getView', async () => {
	try {
		return await api.get('/view').then((res) => res.data);
	} catch (err) {
		console.log(err);
	}
});
