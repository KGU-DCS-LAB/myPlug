import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as API from "../../api/API";

const initialState = {
  status: 'idle',
  // stations: [],
  // chargers: [],
  stationListModalVisible:false,
};

export const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    setStationListModalVisible:(state, action)=>{
      state.stationListModalVisible=action.payload
    }
  },
});

export const { setStationListModalVisible } = mapSlice.actions;
export const selectStationListModalVisible = (state) => state.map.stationListModalVisible;

export default mapSlice.reducer;
