import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as API from "../../api/API";
import * as STATIONS from '../../api/STATIONS';


const initialState = {
  status: 'idle',
  mapLocation: null, // 현재 지도의 중심 위치
  userLocation: null, // 사용자의 실제 위치
  stations: [], //서버로 부터 받아온 충전소 데이터 리스트
  chargers: [], //서버로 부터 받아온 충전소 데이터들의 충전기 데이터 리스트
  selectedStation: null,  //마커 선택 시 모달에 띄워줄 충전소 데이터
  selectedChargers: [],  // 서버로 부터 받아온 특정 충전소의 충전기 리스트
  selectedLogs: [], //서버로 부터 받아온 특정 충전소의 충전 분석 로그
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
    // const logs = await API.getStationLogsByStatId(statId);
    return [station, chargers];
  }
);

export const setSelectedLogs = createAsyncThunk(
  'map/setSelectedLogs',
  async (statId) => {
    // The value we return becomes the `fulfilled` action payload
    const logs = await API.getStationLogsByStatId(statId);
    return logs;
  }
);

export const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    reset: (state) => state = initialState,
    setStatusLoading: (state) => {
      state.mapLocation = 'loading';
    },
    setStatusIdle: (state) => {
      state.mapLocation = 'idle';
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
    setSelectedStation: (state, action) => {
      state.selectedStation = action.payload
    },
    setSelectedChargers: (state, action) => {
      state.selectedChargers = action.payload
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
        state.stations = STATIONS.countChargers(STATIONS.sortStations(state.userLocation, action.payload[0]), action.payload[1]);
        state.chargers = action.payload[1];
      })
      .addCase(setSelectedStationInfo.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(setSelectedStationInfo.fulfilled, (state, action) => {
        const temp = STATIONS.countChargers(STATIONS.sortStations(state.userLocation, action.payload[0]), action.payload[1]);
        state.selectedStation = temp[0];
        state.selectedChargers = action.payload[1];
        state.status = 'idle';
      })
      .addCase(setSelectedLogs.fulfilled, (state, action) => {
        state.selectedLogs = action.payload;
      })
      ;
  },
});

export const {
  reset,
  setStatusLoading,
  setMapLocation,
  setUserLocation,
  setStations,
  setChargers,
  setSelectedStation,
  setSelectedChargers,
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
export const selectSelectedChargers = (state) => state.map.selectedChargers;
export const selectSelectedStation = (state) => state.map.selectedStation;
export const selectStationListModalVisible = (state) => state.map.stationListModalVisible;
export const selectThemeModalVisible = (state) => state.map.themeModalVisible;
export const selectSmallModalVisible = (state) => state.map.smallModalVisible;
export const selectFilterModalVisible = (state) => state.map.filterModalVisible;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
export const incrementIfOdd = (amount) => (dispatch, getState) => {
  const currentValue = selectCount(getState());
  if (currentValue % 2 === 1) {
    dispatch(incrementByAmount(amount));
  }
};

export default mapSlice.reducer;
