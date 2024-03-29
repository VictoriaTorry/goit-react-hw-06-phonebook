import { createSlice } from '@reduxjs/toolkit';
import { initState } from './initState';

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: initState.contacts,
  reducers: {
    onAddingAction: (state, { payload }) => {
      return (state = [...state, payload]);
    },
    onDeleteAction: (state, { payload }) => {
      return (state = state.filter(item => item.id !== payload));
    },
  },
});

export const { onAddingAction, onDeleteAction } = contactsSlice.actions;

export const contactsReducer = contactsSlice.reducer;
