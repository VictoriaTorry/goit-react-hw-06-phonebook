import { createSlice } from '@reduxjs/toolkit';
import { initState } from './initState';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: initState.contacts,
  reducers: {
    onAddingAction: (state, { payload }) => {
      state.contacts = [...state.contacts, payload];
    },
    onDeleteAction: (state, { payload }) => {
      state.contacts = state.contacts.filter(item => item.id !== payload);
    },
  },
});

const persistConfig = {
  key: 'contacts',
  storage,
  whitelist: ['contacts'],
};

export const persistedReducer = persistReducer(persistConfig, contactsSlice.reducer);

export const { onAddingAction, onDeleteAction } = contactsSlice.actions;
