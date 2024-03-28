import { createSlice } from '@reduxjs/toolkit';
import { initState } from './initState';

const filterSlice = createSlice({
  name: 'filter',
  initialState: initState.filter,
  reducers: {
    onFilterAction: (state, { payload }) => {
      return (state = payload);
    },
  },
});

export const { onFilterAction } = filterSlice.actions;

export const filterReducer = filterSlice.reducer;
