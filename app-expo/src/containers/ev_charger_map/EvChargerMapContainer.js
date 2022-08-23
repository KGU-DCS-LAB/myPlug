import { useEffect, useRef, useState } from "react";
import { Circle, Marker, PROVIDER_GOOGLE } from "react-native-maps";
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
import StationBigModal from "../../components/ev_charger_map/modals/StationBigModal";
import { sortStations, getDistance } from '../../api/STATIONS';
import * as API from "../../api/API";
import * as STATIONS from '../../api/STATIONS';
import { mapStyles } from "../../api/GOOGLEMAP";
import ThemeModal from "../../components/ev_charger_map/modals/ThemeModal";

const EvChargerContainer = (props) => {

    const [mapLocation, setMapLocation] = useState({
        latitude: 37.3012,
        longitude: 127.0355,
        latitudeDelta: 0,
        longitudeDelta: 0,
    }); // 지도 중심 위치 (지도 view 이동용)

    const [userLocation, setUserLocation] = useState({
        latitude: 37.3012,
        longitude: 127.0355,
    }); // 실제 사용자 위치 (거리 계산용)

    const [didCancel, setCancel] = useState(false); // clean up 용
    const [isLoaded, setLoaded] = useState(false); // GPS 로딩 여부 검사용
    const [mapStytle, setMapStyle] = useState([]);

    const [stations, setStations] = useState([]); //서버로 부터 받아온 충전소 데이터 리스트
    const [chargers, setChargers] = useState([]); //서버로 부터 받아온 충전소 데이터들의 충전기 데이터 리스트
    const [stationLogs, setStationLogs] = useState([]); //서버로 부터 받아온 특정 충전소의 충전 분석 로그

    const [selectedStation, setSelectedStation] = useState(null); //마커 선택 시 모달에 띄워줄 데이터
    const [selectedChargers, setSelectedChargers] = useState([]); // 서버로 부터 받아온 특정 충전소의 충전기 리스트

    const [filterModalVisible, setFilterModalVisible] = useState(false); // 필터 모달 온오프
    const [stationListModalVisible, setStationListModalVisible] = useState(false); // 충전소 목록 모달 온오프
    const [isThemeModalOpen, setThemeModalOpen] = useState(false);
    const [isSmallModalOpen, setSmallModalOpen] = useState(false);
    const [isBigModalOpen, setBigModalOpen] = useState(false);

    // const source = useRef(); //취소 토큰 용
    const mapRef = useRef(); //몰라

    // Get current location information 
    useEffect(() => {
        setCancel(false);
        const now = new Date().getHours();
        if(now<7 || now>=19){
            setMapStyle(mapStyles('aubergine'));
        }

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
                // console.log(location);
                setLocationAndGetStations(initLocation);
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
        setMapLocation(region);
        if (region.latitudeDelta < 0.13 && region.longitudeDelta < 0.13) { //단, 델타 값이 적당히 작은 상태에서만 서버로 요청
            const receivedStationData = await API.getRegionData(region)
            const receivedChargerData = await API.getChargersByManyStation(receivedStationData.map((station)=>station.statId))
            setStations(STATIONS.countChargers(sortStations(userLocation, receivedStationData), receivedChargerData));
            setChargers(receivedChargerData)
        }
        else { // 델타 값이 너무 크면 값을 그냥 비워버림
            setStations([]);
            setChargers([]);
        }
    }

    const focusToStation = async (station) => { // 검색하거나 선택된 충전소를 관리해주기 위한 통합 메소드
        // console.log(station)
        const stationLocation = {
            longitude: Number(station.lng),
            latitude: Number(station.lat),
            latitudeDelta: 0.007,
            longitudeDelta: 0.007,
        }
        setStationListModalVisible(false)
        setSmallModalOpen(true);
        setBigModalOpen(false);
        setLocationAndGetStations(stationLocation);
        let temp_chargers = chargers.filter((charger)=>charger.statId == station.statId)
        if(temp_chargers.length==0){
            temp_chargers = await API.getChargersByOneStation(station.statId) //선택한 충전소 id에 속한 충전기를 요청
        }
        setSelectedChargers(temp_chargers) //선택한 충전소 id에 속한 충전기를 요청
        setSelectedStation(STATIONS.countChargers(sortStations(userLocation, [{...station}]), temp_chargers)[0]);
        setStationLogs(await API.getStationLogsByStatId(station.statId)); //선택한 충전소id에 속한 충전기록을 요청 
    }

    return (
        <>
            {
                isLoaded //GPS 수신이 안되면 로딩 Spinner 띄울 목적
                    ?
                    <>
                        <View style={{ flex: 1 }}>
                            <FilterModal
                                setChargingStations={setStations}
                                filterModalVisible={filterModalVisible}
                                setFilterModalVisible={setFilterModalVisible}
                                mapLocation={mapLocation}
                                userLocation={userLocation}
                                type={'getFiltering'}
                            />

                            <StationListModal
                                location={mapLocation}
                                stations={stations}
                                stationListModalVisible={stationListModalVisible}
                                setStationListModalVisible={setStationListModalVisible}
                                focusToStation={focusToStation}
                            />

                            <ThemeModal
                                setMapStyle={setMapStyle}
                                isThemeModalOpen={isThemeModalOpen}
                                setThemeModalOpen={setThemeModalOpen}
                            />

                            <StationSmallModal
                                isSmallModalOpen={isSmallModalOpen}
                                setSmallModalOpen={setSmallModalOpen}
                                selectedStation={selectedStation}
                                setBigModalOpen={setBigModalOpen}
                                selectedChargers={selectedChargers}
                            />

                            <StationBigModal //작은 모달에서 상세보기 클릭 시 큰 모달 띄우기 용
                                isBigModalOpen={isBigModalOpen}
                                setBigModalOpen={setBigModalOpen}
                                selectedStation={selectedStation}
                                selectedChargers={selectedChargers}
                                stationLogs={stationLogs}
                                stations={stations}
                                focusToStation={focusToStation}
                            />

                            <MapView
                                ref={mapRef}
                                initialRegion={{ //초기 값
                                    latitude: 37.3012,
                                    longitude: 127.0355,
                                    latitudeDelta: 0.0922,
                                    longitudeDelta: 0.0421,
                                }}
                                style={{ flex: 1 }}
                                provider={PROVIDER_GOOGLE} // Apple 지도가 뜨지 않도록 방지함
                                showsUserLocation={true}
                                showsMyLocationButton={false} // 현위치를 맵에서 직접 관리하지 않도록 제한함 (Stagger에서 처리)
                                region={{ //현 위치를 state가 관리하도록 함
                                    latitude: mapLocation.latitude,
                                    longitude: mapLocation.longitude,
                                    latitudeDelta: mapLocation.latitudeDelta,
                                    longitudeDelta: mapLocation.longitudeDelta,
                                }}
                                onRegionChange={region => {

                                }}
                                onRegionChangeComplete={(region) => { //손가락이 지도에서 떨어지는 순간 처리할 일 + 굳이 손가락을 대지 않아도 위치 변경 시 이것을 통해 동작하기도 하는 것을 발견함.
                                    setLocationAndGetStations(region);
                                }}
                                onMapReady={() => {
                                    // updateMapStyle()
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
                            {/* 테스트 로그를 쉽게 확인하기 위한 처리 */}

                        </View>
                        <CoverMenu
                            navigation={props.navigation}
                            focusToStation={focusToStation}
                            mapLocation={mapLocation}
                            setLocationAndGetStations={setLocationAndGetStations}
                            isSmallModalOpen={isSmallModalOpen}
                            setThemeModalOpen={setThemeModalOpen}
                            setFilterModalVisible={setFilterModalVisible}
                            setStationListModalVisible={setStationListModalVisible}
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