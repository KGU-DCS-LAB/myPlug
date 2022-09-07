import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as API from "../../api/API";

const initialState = {
  status: 'idle',
  // stations: [],
  // chargers: [],
  stationListModalVisible: false,
  themeModalVisible: false,
  smallModalVisible: false,
  filterModalVisible: false,
};

export const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    setStationListModalVisible: (state, action) => {
      state.stationListModalVisible = action.payload
    },
    setThemeModalVisible: (state, action) => {
      state.themeModalVisible = action.payload
    },
    setSmallModalVisible: (state, action) => {
      state.smallModalVisible = action.payload
    },
    setFilterModalVisible: (state, action) => {
      state.filterModalVisible = action.payload
    },
  },
});

export const {
  setStationListModalVisible,
  setThemeModalVisible,
  setSmallModalVisible,
  setFilterModalVisible
} = mapSlice.actions;

export const selectStationListModalVisible = (state) => state.map.stationListModalVisible;
export const selectThemeModalVisible = (state) => state.map.themeModalVisible;
export const selectSmallModalVisible = (state) => state.map.smallModalVisible;
export const selectFilterModalVisible = (state) => state.map.filterModalVisible;

export default mapSlice.reducer;
