import { createSlice } from '@reduxjs/toolkit';

interface Asider {
  showSider: boolean;
}

const initialState: Asider = {
  showSider: false,
};

const asider = createSlice({
  initialState,
  name: 'asider',
  reducers: {
    toggleShowSider: (state) => {
      state.showSider = !state.showSider;
    },
  },
});

export const { toggleShowSider } = asider.actions;

export default asider.reducer;
