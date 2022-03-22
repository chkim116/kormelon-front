import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
		setThemeMode: (state, { payload }: PayloadAction<'dark' | 'light'>) => {
			state.themeMode = payload;
		},
	},
});

export const { setThemeMode } = themeMode.actions;

export default themeMode.reducer;
