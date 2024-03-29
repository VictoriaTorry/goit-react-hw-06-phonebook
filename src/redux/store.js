import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import { filterReducer } from './filter.slice';
import { initState } from './initState';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { contactsReducer } from './contacts.slice';


// const reducer = createReducer(state, builder => {
//   builder
//     .addCase(onAddingAction, (state, {payload}) => ({
//       ...state,
//       contacts: [...state.contacts, payload],
//     }))
//     .addCase(onDeleteAction, (state, {payload}) => ({
//       ...state,
//       contacts: state.contacts.filter(item => item.id !== payload),
//     })).addCase(onFilterAction, (state, {payload}) => ({
//       ...state,
//       filter: payload
//     })

//     )
// });



const mainReducer = combineReducers({
  contacts: contactsReducer,
  filter: filterReducer,
});

const persistConfig = {
  key: 'contacts',
  storage,
  whitelist: ['contacts'],
};

const persistedReducer = persistReducer(persistConfig, mainReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: true,
  preloadedState: initState,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
