import { useEffect, useRef, useState } from "react";
import { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import MapView from "react-native-map-clustering";
import * as Location from 'expo-location';
import { config } from '../../../config'
import axios from 'axios';
import { Box, Center, HStack, Spacer, Text, View } from "native-base";
import CoverMenu from "./cover_menu/CoverMenu";
import LoadingSpinner from "../../components/Loading/LoadingSpinner";
import FilterModal from "../../components/ev_charger_map/modals/FilterModal";
import { Image } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import StationListModal from "../../components/ev_charger_map/modals/StationListModal";
import StationSmallModal from "../../components/ev_charger_map/modals/StationSmallModal";
import { sortStations, getDistance } from '../../app/api/STATIONS';
import * as API from "../../app/api/API";
import * as STATIONS from '../../app/api/STATIONS';
import { mapStyles } from "../../app/api/GOOGLEMAP";
import ThemeModal from "../../components/ev_charger_map/modals/ThemeModal";
import { useNavigationState } from "@react-navigation/native";
import { setStationsAndChargers, selectChargers, selectMapLocation, selectStations, selectUserLocation, setMapLocation, setSmallModalVisible, setStationListModalVisible, setUserLocation, setSelectedLogs, selectSelectedLogs, selectSelectedChargers, setSelectedChargers, setSelectedStationInfo, selectSelectedStation, setStatusLoading } from "../../app/redux/map/mapSlice";
import { useDispatch, useSelector } from "react-redux";

const EvChargerContainer = (props) => {

    const mapLocation = useSelector(selectMapLocation); // 현재 지도의 중심 위치
    const userLocation = useSelector(selectUserLocation); // 사용자의 실제 위치

    const [didCancel, setCancel] = useState(false); // clean up 용
    const [isLoaded, setLoaded] = useState(false); // GPS 로딩 여부 검사용
    const [mapStytle, setMapStyle] = useState([]);

    const stations = useSelector(selectStations);
    const chargers = useSelector(selectChargers);

    const mapRef = useRef(); // 지도 조작에 사용되는 기능
    const new_routes = useNavigationState(state => state.routes);

    // const selectedStation = useSelector(selectSelectedStation);
    // const selectedChargers = useSelector(selectSelectedChargers);
    // const selectedLogs = useSelector(selectSelectedLogs);

    const dispatch = useDispatch();

    // Get current location information 
    useEffect(() => {
        setCancel(false);
        const now = new Date().getHours();
        if (now < 7 || now >= 19) {
            setMapStyle(mapStyles('aubergine'));
        }

        if (!didCancel) {
            (async () => {
                const idx = new_routes.findIndex(r => r.name === "EvCharger")
                if (new_routes[idx].params !== undefined) { // 외부에서 같이 전달된 인자가 있다면
                    console.log('외부에서 stations과 함께 실행 요청');
                    initLocation = {
                        longitude: Number(new_routes[idx].params.station.lng),
                        latitude: Number(new_routes[idx].params.station.lat),
                        latitudeDelta: 0.007,
                        longitudeDelta: 0.007,
                    }
                    Promise.all([
                        focusToStation(new_routes[idx].params.station),
                        setLocationAndGetStations(initLocation),
                    ]);
                    setLoaded(true);
                }
                let { status } = await Location.requestForegroundPermissionsAsync(); //GPS 사용 권한 물어봄
                if (status !== 'granted') {
                    console.log('Permission to access location was denied');
                    return;  //권한 거부 시 그대로 종료
                }
                let location = await Location.getCurrentPositionAsync({}); //현 위치 수신
                let initLocation = null;

                if (new_routes[idx].params === undefined) { // 아무런 전달 인자가 없다면
                    initLocation = {
                        longitude: location.coords.longitude,
                        latitude: location.coords.latitude,
                        latitudeDelta: 0.007,
                        longitudeDelta: 0.007,
                    }
                    setLocationAndGetStations(initLocation);
                    setLoaded(true);
                }

                // 실시간으로 위치 변화 감지 (권한 거부 시 아예 동작하지 않음 / 델타 값 관련 버그가 있어서 일단 주석 처리. 동작 자체는 아무 이상 없음)
                Location.watchPositionAsync({ accuracy: Location.Accuracy.Balanced, timeInterval: 100, distanceInterval: 1 },
                    position => {
                        dispatch(setUserLocation({ longitude: position.coords.longitude, latitude: position.coords.latitude }));
                    }
                );

            })();
        }
        return () => {
            setCancel(true);
        }
    }, []);

    const setLocationAndGetStations = async (region) => {
        dispatch(setMapLocation(region));
        dispatch(setStationsAndChargers(region));
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
        // dispatch(setStatusLoading());
        setLocationAndGetStations(stationLocation);
        dispatch(setSelectedStationInfo(station.statId));
        dispatch(setStationListModalVisible(false));
        dispatch(setSmallModalVisible(true));
    }

    return (
        <>
            {
                isLoaded && mapLocation //GPS 수신이 안되면 로딩 Spinner 띄울 목적
                    ?
                    <>
                        <View style={{ flex: 1 }}>
                            {/* <FilterModal
                                setChargingStations={setStations}
                                mapLocation={mapLocation}
                                userLocation={userLocation}
                                type={'getFiltering'}
                            /> */}

                            <StationListModal
                                stations={stations}
                                focusToStation={focusToStation}
                            />

                            <ThemeModal
                                setMapStyle={setMapStyle}
                            />

                            <StationSmallModal
                                navigation={props.navigation}
                                focusToStation={focusToStation}
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
                                onRegionChange={region => {

                                }}
                                onRegionChangeComplete={(region) => { //손가락이 지도에서 떨어지는 순간 처리할 일 + 굳이 손가락을 대지 않아도 위치 변경 시 이것을 통해 동작하기도 하는 것을 발견함.
                                    setLocationAndGetStations(region);
                                }}
                                onMapReady={() => {
                                    // const idx = new_routes.findIndex(r => r.name === "EvCharger")
                                    // if(new_routes[idx].params!==undefined){
                                    //     focusToStation(new_routes[idx].params.station);
                                    // }
                                }}
                                clusterColor="yellowgreen"
                                customMapStyle={mapStytle}
                                maxZoom={13}
                            >

                                {
                                    stations.length > 0 && //사이즈가 0 이상일때맏 마커 찍는 시도함 (오류 방지)
                                    stations.map((marker, index) => (
                                        <Marker
                                            key={index}
                                            coordinate={{
                                                latitude: Number(marker.lat),
                                                longitude: Number(marker.lng)
                                            }}
                                            onPress={
                                                () => {
                                                    focusToStation(marker)
                                                }}
                                            image={STATIONS.markerImage(marker)}
                                        />
                                    ))
                                }

                            </MapView>
                            {/* 테스트 로그를 쉽게 확인하기 위한 처리 */}
                            {/* <HStack><Text>{mapLocation.latitude}</Text><Spacer /><Text>{mapLocation.longitude}</Text></HStack>
                            <HStack><Text>{mapLocation.latitudeDelta}</Text><Spacer /><Text>{mapLocation.longitudeDelta}</Text></HStack> */}
                            {/* <HStack><Text>{JSON.stringify(selectedStation)}</Text></HStack> */}
                            {/* 테스트 로그를 쉽게 확인하기 위한 처리 */}

                        </View>
                        <CoverMenu
                            mapRef={mapRef}
                            navigation={props.navigation}
                        // focusToStation={focusToStation}
                        // mapLocation={mapLocation}
                        // setLocationAndGetStations={setLocationAndGetStations}
                        />
                    </>
                    :
                    <>
                        <LoadingSpinner description="디바이스가 어디에 있는지 찾고 있어요..." />
                    </>
            }
        </>
    )
}
export default EvChargerContainer;