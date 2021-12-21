import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DarkMode {
  mode: 'dark' | 'white';
}

const initialState: DarkMode = {
  mode: 'dark',
};

const darkMode = createSlice({
  initialState,
  name: 'darkMode',
  reducers: {
    setDarkMode: (state, { payload }: PayloadAction<'dark' | 'white'>) => {
      state.mode = payload;
    },
  },
});

export const { setDarkMode } = darkMode.actions;

export default darkMode.reducer;
