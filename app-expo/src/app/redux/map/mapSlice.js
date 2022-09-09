import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as API from "../../api/API";

const initialState = {
  status: 'idle',
  mapLocation:null, // 현재 지도의 중심 위치
  userLocation:null, // 사용자의 실제 위치
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
    setUserLocation: (state, action) => {
      state.userLocation = action.payload
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
  setUserLocation,
  setStationListModalVisible,
  setThemeModalVisible,
  setSmallModalVisible,
  setFilterModalVisible
} = mapSlice.actions;

export const selectMapLocation = (state) => state.map.mapLocation;
export const selectUserLocation = (state) => state.map.userLocation;
export const selectStationListModalVisible = (state) => state.map.stationListModalVisible;
export const selectThemeModalVisible = (state) => state.map.themeModalVisible;
export const selectSmallModalVisible = (state) => state.map.smallModalVisible;
export const selectFilterModalVisible = (state) => state.map.filterModalVisible;

export default mapSlice.reducer;
