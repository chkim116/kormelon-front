import { createSlice } from '@reduxjs/toolkit';

interface InitialState {}

const initialState: InitialState = {};

const auth = createSlice({
  initialState,
  name: 'auth',
  reducers: {},
});

export const {} = auth.actions;

export default auth.reducer;
