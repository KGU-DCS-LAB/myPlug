import { useEffect, useRef, useState } from "react";
import { Circle, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import MapView from "react-native-map-clustering";
import * as Location from 'expo-location';
import { config } from '../../../config'
import axios from 'axios';
import { Box, Button, Center, HStack, Spacer, Text, View } from "native-base";
import LoadingSpinner from "../../components/Loading/LoadingSpinner";
import { Image } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { sortStations, getDistance } from '../../app/api/STATIONS';
import * as API from "../../app/api/API";
import * as STATIONS from '../../app/api/STATIONS';
import { useNavigationState } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { getStationsAsync, selectStations, selectStatus } from "../../app/redux/example/exampleSlice";
import GoogleMapStationListModal from "./GoogleMapStationListModal";

const GoogleMapExample = (props) => {

  const [mapLocation, setMapLocation] = useState(null); // 지도 중심 위치 (지도 view 이동용)

  const [userLocation, setUserLocation] = useState({
    latitude: 37.3012,
    longitude: 127.0355,
  }); // 실제 사용자 위치 (거리 계산용)

  const [didCancel, setCancel] = useState(false); // clean up 용
  const [isLoaded, setLoaded] = useState(false); // GPS 로딩 여부 검사용

  const [stationListModalVisible, setStationListModalVisible] = useState(false); // 충전소 목록 모달 온오프

  const stations = useSelector(selectStations);
  const status = useSelector(selectStatus);

  const mapRef = useRef(); // 지도 조작에 사용되는 기능
  const dispatch = useDispatch();

  // Get current location information 
  useEffect(() => {
    setCancel(false);

    if (!didCancel) {
      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync(); //GPS 사용 권한 물어봄
        if (status !== 'granted') {
          console.log('Permission to access location was denied');
          return;  //권한 거부 시 그대로 종료
        }
        let location = await Location.getCurrentPositionAsync({}); //현 위치 수신
        let initLocation = {
          longitude: location.coords.longitude,
          latitude: location.coords.latitude,
          latitudeDelta: 0.007,
          longitudeDelta: 0.007,
        }
        await setLocationAndGetStations(initLocation);
        setLoaded(true);

        // 실시간으로 위치 변화 감지 (권한 거부 시 아예 동작하지 않음 / 델타 값 관련 버그가 있어서 일단 주석 처리. 동작 자체는 아무 이상 없음)
        Location.watchPositionAsync({ accuracy: Location.Accuracy.Balanced, timeInterval: 100, distanceInterval: 1 },
          position => {
            setUserLocation({ longitude: position.coords.longitude, latitude: position.coords.latitude });
          }
        );

      })();
    }
    return () => {
      setCancel(true);
    }
  }, []);

  const setLocationAndGetStations = async (region) => {
    // console.log(region)
    setMapLocation(region);
    if (region.latitudeDelta < 0.13 && region.longitudeDelta < 0.13) { //단, 델타 값이 적당히 작은 상태에서만 서버로 요청
      dispatch(getStationsAsync(region));
    }
    else { // 델타 값이 너무 크면 값을 그냥 비워버림

    }
  }

  const focusToStation = async (station) => { // 검색하거나 선택된 충전소를 관리해주기 위한 통합 메소드
    // console.log(JSON.stringify(station))
    const stationLocation = {
      longitude: Number(station.lng),
      latitude: Number(station.lat),
      latitudeDelta: 0.007,
      longitudeDelta: 0.007,
    }
    mapRef?.current?.animateToRegion(stationLocation); // 지도 이동을 도와주는 메소드
    setLocationAndGetStations(stationLocation);
  }

  return (
    <>
      {
        isLoaded && mapLocation //GPS 수신이 안되면 로딩 Spinner 띄울 목적
          ?
          <>
            <View style={{ flex: 1 }}>
              <GoogleMapStationListModal
                stationListModalVisible={stationListModalVisible}
                setStationListModalVisible={setStationListModalVisible}
              />

              <MapView
                ref={mapRef}
                initialRegion={
                  { //초기 위치를 state가 관리하도록 함
                    latitude: mapLocation.latitude,
                    longitude: mapLocation.longitude,
                    latitudeDelta: mapLocation.latitudeDelta,
                    longitudeDelta: mapLocation.longitudeDelta,
                  }
                }
                style={{ flex: 1 }}
                provider={PROVIDER_GOOGLE} // Apple 지도가 뜨지 않도록 방지함
                showsUserLocation={true}
                showsMyLocationButton={false} // 현위치를 맵에서 직접 관리하지 않도록 제한함 (Stagger에서 처리)
                onRegionChangeComplete={(region) => { //손가락이 지도에서 떨어지는 순간 처리할 일 + 굳이 손가락을 대지 않아도 위치 변경 시 이것을 통해 동작하기도 하는 것을 발견함.
                  setLocationAndGetStations(region);
                }}
                clusterColor="yellowgreen"
                maxZoom={13}
              >
                {
                  stations && //사이즈가 0 이상일때맏 마커 찍는 시도함 (오류 방지)
                  stations.map((marker, index) => (
                    <Marker
                      key={index}
                      coordinate={{
                        latitude: Number(marker.lat),
                        longitude: Number(marker.lng)
                      }}
                      onPress={
                        () => {
                          console.log(JSON.stringify(marker))
                        }}
                    />
                  ))
                }
              </MapView>
              <Center><Button onPress={()=>setStationListModalVisible(true)}>ㅇㅇ</Button></Center>
              {/* 테스트 로그를 쉽게 확인하기 위한 처리 */}
              <HStack><Text>{mapLocation.latitude}</Text><Spacer /><Text>{mapLocation.longitude}</Text></HStack>
              <HStack><Text>{mapLocation.latitudeDelta}</Text><Spacer /><Text>{mapLocation.longitudeDelta}</Text></HStack>
              <HStack><Text>{status}</Text></HStack>
              {/* 테스트 로그를 쉽게 확인하기 위한 처리 */}

            </View>

          </>
          :
          <>
            <LoadingSpinner description="디바이스가 어디에 있는지 찾고 있어요..." />
          </>
      }
    </>
  )
}
export default GoogleMapExample;