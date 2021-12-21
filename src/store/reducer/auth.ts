import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Auth {
  id: number;
  username: string;
  admin: boolean;
}

const initialState: Auth = {
  username: '',
  id: 0,
  admin: false,
};

const auth = createSlice({
  initialState,
  name: 'auth',
  reducers: {
    getAuth: (state, { payload }: PayloadAction<Auth>) => {
      state = payload;
    },
    removeAuth: (state) => {
      state = initialState;
    },
  },
});

export const { getAuth, removeAuth } = auth.actions;

export default auth.reducer;
