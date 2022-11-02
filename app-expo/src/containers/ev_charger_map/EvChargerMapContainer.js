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
import { setStationsAndChargers, selectChargers, selectMapLocation, selectStations, selectUserLocation, setMapLocation, setUserLocation, setSelectedLogs, selectSelectedLogs, selectSelectedChargers, setSelectedChargers, setSelectedStationInfo, selectSelectedStation, setStatusLoading, reset } from "../../app/redux/map/mapSlice";
import { useDispatch, useSelector } from "react-redux";
import { setSmallModalVisible, setStationListModalVisible } from "../../app/redux/modal/modalSlice";

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

    const selectedStation = useSelector(selectSelectedStation);
    // const selectedChargers = useSelector(selectSelectedChargers);
    // const selectedLogs = useSelector(selectSelectedLogs);

    const dispatch = useDispatch();

    // Get current location information 
    useEffect(() => {

        const now = new Date().getHours();
        if (now < 7 || now >= 19) {
            setMapStyle(mapStyles('aubergine'));
        }
        
        setCancel(false);
        if (!didCancel) {
            (async () => {
                console.log(`일단 지도가 켜진다${JSON.stringify(selectedStation)}`)
                let { status } = await Location.requestForegroundPermissionsAsync(); //GPS 사용 권한 물어봄
                if (status !== 'granted') {
                    console.log('Permission to access location was denied');
                    return;  //권한 거부 시 그대로 종료
                }
                let location = await Location.getCurrentPositionAsync({}); //현 위치 수신
                if (selectedStation === null) {
                    console.log('단순히 지도 메뉴 진입했을 때')
                    setLocationAndGetStations({
                        longitude: location.coords.longitude,
                        latitude: location.coords.latitude,
                        latitudeDelta: 0.007,
                        longitudeDelta: 0.007,
                    });
                }
                else {
                    console.log('외부에서 특정 충전소를 열고 싶은 경우')
                }
                setLoaded(true);

                // 실시간으로 위치 변화 감지 (권한 거부 시 아예 동작하지 않음 / 델타 값 관련 버그가 있어서 일단 주석 처리. 동작 자체는 아무 이상 없음)
                Location.watchPositionAsync({ accuracy: Location.Accuracy.Balanced, timeInterval: 100, distanceInterval: 1 },
                    position => {
                        dispatch(setUserLocation({ longitude: position.coords.longitude, latitude: position.coords.latitude }));
                    }
                );

            })();
        }
        return () => {
            console.log('clean up!')
            setCancel(true);
            dispatch(reset());
        }
    }, []);

    useEffect(() => {
        console.log(`어어${selectedStation}`)
        if (selectedStation != null) {
            console.log(`selectedStation : ${JSON.stringify(selectedStation)}`)
            const stationLocation = {
                longitude: Number(selectedStation.lng),
                latitude: Number(selectedStation.lat),
                latitudeDelta: 0.007,
                longitudeDelta: 0.007,
            }
            mapRef?.current?.animateToRegion(stationLocation); // 지도 이동을 도와주는 메소드
            dispatch(setStationListModalVisible(false));
            dispatch(setSmallModalVisible(true));
            setLocationAndGetStations(stationLocation);
        }
    }, [selectedStation]);

    const setLocationAndGetStations = async (region) => {
        dispatch(setMapLocation(region));
        dispatch(setStationsAndChargers(region));
    }


    return (
        <>
            {
                isLoaded && mapLocation //GPS 수신이 안되면 로딩 Spinner 띄울 목적
                    ?
                    <>
                        <View style={{ flex: 1 }}>
                            <FilterModal
                                type={'getFiltering'}
                            />

                            <StationListModal />

                            <ThemeModal
                                setMapStyle={setMapStyle}
                            />


                            {/* 현재 redux 사용 이후, 약간 느려진 느낌이 있어서 고전 방식(prop으로 넘겨주는 것)으로 돌아 갈 가능성도 있음. */}
                            <StationSmallModal
                                navigation={props.navigation}
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
                                                    dispatch(setSelectedStationInfo(marker.statId));
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
                            mapLocation={mapLocation}
                            setLocationAndGetStations={setLocationAndGetStations}
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