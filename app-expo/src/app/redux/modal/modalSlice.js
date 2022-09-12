import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as API from "../../api/API";
import * as STATIONS from '../../api/STATIONS';


const initialState = {
  stationListModalVisible: false,
  themeModalVisible: false,
  smallModalVisible: false,
  filterModalVisible: false,
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    reset: (state) => state = initialState,
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
  reset,
  setStationListModalVisible,
  setThemeModalVisible,
  setSmallModalVisible,
  setFilterModalVisible
} = modalSlice.actions;

export const selectStationListModalVisible = (state) => state.modal.stationListModalVisible;
export const selectThemeModalVisible = (state) => state.modal.themeModalVisible;
export const selectSmallModalVisible = (state) => state.modal.smallModalVisible;
export const selectFilterModalVisible = (state) => state.modal.filterModalVisible;

export default modalSlice.reducer;
