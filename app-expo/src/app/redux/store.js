import { configureStore } from '@reduxjs/toolkit';
// import counterReducer from '../features/counter/counterSlice';
import exampleReducer from './example/exampleSlice.js';

export const store = configureStore({
  reducer: {
    // counter: counterReducer,
    example: exampleReducer,
  },
});
