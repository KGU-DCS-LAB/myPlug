import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as API from "../../api/API";
import * as STATIONS from '../../api/STATIONS';


const initialState = {
  status: 'idle',
  mapLocation: null, // 현재 지도의 중심 위치
  userLocation: null, // 사용자의 실제 위치
  stations: [], //서버로 부터 받아온 충전소 데이터 리스트
  chargers: [], //서버로 부터 받아온 충전소 데이터들의 충전기 데이터 리스트
  selectedLogs: [], //서버로 부터 받아온 특정 충전소의 충전 분석 로그
  selectedStation: null,  //마커 선택 시 모달에 띄워줄 데이터
  selectedChargers: [],  // 서버로 부터 받아온 특정 충전소의 충전기 리스트
  stationListModalVisible: false,
  themeModalVisible: false,
  smallModalVisible: false,
  filterModalVisible: false,
};

export const setStationsAndChargers = createAsyncThunk(
  'map/setStationsAndChargers',
  async (region) => {
    // The value we return becomes the `fulfilled` action payload
    if (region.latitudeDelta < 0.13 && region.longitudeDelta < 0.13) { //단, 델타 값이 적당히 작은 상태에서만 서버로 요청
      const response = await API.getRegionData(region);
      return response;
    }
    else { // 델타 값이 너무 크면 값을 그냥 비워버림
      return [[], []];
    }
  }
);

export const setSelectedStationInfo = createAsyncThunk(
  'map/setSelectedStationInfo',
  async (statId) => {
    // The value we return becomes the `fulfilled` action payload
    const station = await API.getOneStation(statId);
    const chargers = await API.getChargersByOneStation(statId);
    const logs = await API.getStationLogsByStatId(statId);
    return [station, chargers, logs];
  }
);

export const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    setStatusLoading: (state) => {
      state.mapLocation = 'loading';
    },
    setMapLocation: (state, action) => {
      state.mapLocation = action.payload
    },
    setUserLocation: (state, action) => {
      state.userLocation = action.payload
    },
    setStations: (state, action) => {
      state.stations = action.payload
    },
    setChargers: (state, action) => {
      state.chargers = action.payload
    },
    setSelectedLogs: (state, action) => {
      state.selectedLogs = action.payload
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
  extraReducers: (builder) => {
    builder
      // .addCase(setStationsAndChargers.pending, (state) => {
      //   state.status = 'loading';
      // })
      .addCase(setStationsAndChargers.fulfilled, (state, action) => {
        state.status = 'idle';
        state.stations = STATIONS.countChargers(STATIONS.sortStations(state.userLocation, action.payload[0]), action.payload[1]);
        state.chargers = action.payload[1];
      })
      .addCase(setSelectedStationInfo.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(setSelectedStationInfo.fulfilled, (state, action) => {
        state.selectedStation = STATIONS.countChargers([action.payload[0]], action.payload[1])[0][0];
        state.selectedChargers = action.payload[1];
        state.selectedLogs = action.payload[2];
        state.status = 'idle';
      })
      ;
  },
});

export const {
  setStatusLoading,
  setMapLocation,
  setUserLocation,
  setStations,
  setChargers,
  setStationListModalVisible,
  setThemeModalVisible,
  setSmallModalVisible,
  setFilterModalVisible
} = mapSlice.actions;

export const selectStatus = (state) => state.map.status;
export const selectMapLocation = (state) => state.map.mapLocation;
export const selectUserLocation = (state) => state.map.userLocation;
export const selectStations = (state) => state.map.stations;
export const selectChargers = (state) => state.map.chargers;
export const selectSelectedLogs = (state) => state.map.selectedLogs;
export const selectSelectedChargers = (state) => state.map.selectChargers;
export const selectSelectedStation = (state) => state.map.selectedStation;
export const selectStationListModalVisible = (state) => state.map.stationListModalVisible;
export const selectThemeModalVisible = (state) => state.map.themeModalVisible;
export const selectSmallModalVisible = (state) => state.map.smallModalVisible;
export const selectFilterModalVisible = (state) => state.map.filterModalVisible;

export default mapSlice.reducer;
