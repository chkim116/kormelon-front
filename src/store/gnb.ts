import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Gnb {
	isGnbOpen: boolean;
}

const initialState: Gnb = {
	isGnbOpen: false,
};

const gnb = createSlice({
	initialState,
	name: 'gnb',
	reducers: {
		toggleIsGnbOpen: (
			state,
			{ payload }: PayloadAction<boolean | undefined>
		) => {
			state.isGnbOpen = payload !== undefined ? payload : !state.isGnbOpen;
		},
	},
});

export const { toggleIsGnbOpen } = gnb.actions;

export default gnb.reducer;
