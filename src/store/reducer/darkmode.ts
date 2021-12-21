import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DarkMode {
  theme: 'dark' | 'white';
}

const initialState: DarkMode = {
  theme: 'dark',
};

const darkMode = createSlice({
  initialState,
  name: 'darkMode',
  reducers: {
    setDarkMode: (state, { payload }: PayloadAction<'dark' | 'white'>) => {
      state.theme = payload;
    },
  },
});

export const { setDarkMode } = darkMode.actions;

export default darkMode.reducer;
