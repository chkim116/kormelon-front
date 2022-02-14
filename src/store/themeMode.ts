import { createSlice } from '@reduxjs/toolkit';

interface ThemeMode {
	themeMode: 'dark' | 'light';
}

const initialState: ThemeMode = {
	themeMode: 'dark',
};

const themeMode = createSlice({
	initialState,
	name: 'themeMode',
	reducers: {
		toggleThemeMode: (state) => {
			state.themeMode = state.themeMode === 'dark' ? 'light' : 'dark';
		},
	},
});

export const { toggleThemeMode } = themeMode.actions;

export default themeMode.reducer;
