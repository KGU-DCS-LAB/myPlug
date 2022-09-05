import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as API from "../../api/API";

const initialState = {
  status: 'idle',
  stations: [],
};

export const getStationsAsync = createAsyncThunk(
  'example/fetchCount',
  async (region) => {
    const response = await API.getRegionData(region);
    // The value we return becomes the `fulfilled` action payload
    return response;
  }
);

export const exampleSlice = createSlice({
  name: 'example',
  initialState,
  reducers: {
    getStations: async (state, action) => {
      console.log(action)
      // state.stations=await API.getRegionData(action.payload)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getStationsAsync.pending, (state) => {
        // console.log(state.status)
        state.status = 'loading';
      })
      .addCase(getStationsAsync.fulfilled, (state, action) => {
        // console.log(state.status)
        // console.log(state.stations.length)
        state.status = 'idle';
        state.stations = action.payload;
      });
  },
});

export const { getStations } = exampleSlice.actions;
export const selectStations = (state) => state.example.stations;
export const selectStatus = (state) => state.example.status;

export default exampleSlice.reducer;
