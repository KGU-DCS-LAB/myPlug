import { configureStore } from '@reduxjs/toolkit';
import exampleReducer from './example/exampleSlice.js';
import mapReducer from './map/mapSlice.js';
import modalReducer from './modal/modalSlice.js';

export const store = configureStore({
  reducer: {
    map : mapReducer,
    modal : modalReducer,
    example: exampleReducer,
  },
});
