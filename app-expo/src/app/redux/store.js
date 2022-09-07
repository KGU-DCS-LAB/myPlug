import { configureStore } from '@reduxjs/toolkit';
import exampleReducer from './example/exampleSlice.js';
import mapReducer from './map/mapSlice.js';

export const store = configureStore({
  reducer: {
    map : mapReducer,
    example: exampleReducer,
  },
});
