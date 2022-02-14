import { createSlice } from '@reduxjs/toolkit';

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
		toggleIsGnbOpen: (state) => {
			state.isGnbOpen = !state.isGnbOpen;
		},
	},
});

export const { toggleIsGnbOpen } = gnb.actions;

export default gnb.reducer;
