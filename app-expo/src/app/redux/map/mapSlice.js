import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as API from "../../api/API";

const initialState = {
  status: 'idle',
  mapLocation:null,
  userLocation:{
    latitude: 37.3012,
    longitude: 127.0355,
    latitudeDelta: 0.007,
    longitudeDelta: 0.007
  },
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
    setMapLocation: (state, action) => {
      state.mapLocation = action.payload
    },
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
  setMapLocation,
  setStationListModalVisible,
  setThemeModalVisible,
  setSmallModalVisible,
  setFilterModalVisible
} = mapSlice.actions;

export const selectMapLocation = (state) => state.map.mapLocation;
export const selectStationListModalVisible = (state) => state.map.stationListModalVisible;
export const selectThemeModalVisible = (state) => state.map.themeModalVisible;
export const selectSmallModalVisible = (state) => state.map.smallModalVisible;
export const selectFilterModalVisible = (state) => state.map.filterModalVisible;

export default mapSlice.reducer;
