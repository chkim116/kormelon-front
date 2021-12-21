import { createSlice } from '@reduxjs/toolkit';

interface Asider {
  isShowAsider: boolean;
}

const initialState: Asider = {
  isShowAsider: false,
};

const asider = createSlice({
  initialState,
  name: 'asider',
  reducers: {
    toggleIsShowAsider: (state) => {
      state.isShowAsider = !state.isShowAsider;
    },
  },
});

export const { toggleIsShowAsider } = asider.actions;

export default asider.reducer;
