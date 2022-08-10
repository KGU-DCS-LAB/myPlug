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
import StationSmallModal from "../../components/ev_charger_map/modals_v2/StationSmallModal";
import StationBigModal from "../../components/ev_charger_map/modals_v2/StationBigModal";
import {sortStations, getDistance} from '../../api/DISTANCE';
import { getChargersByOneStation, getRegionData } from "../../api/API";

const EvChargerContainer = (props) => {

    const [mapLocation, setMapLocation] = useState({
        latitude: 37.3012,
        longitude: 127.0355,
        latitudeDelta: 0,
        longitudeDelta: 0,
    }); // 지도 중심 위치

    const [userLocation, setUserLocation] = useState({
        latitude: 37.3012,
        longitude: 127.0355,
    }); // 실제 사용자 위치

    const [isLoaded, setLoaded] = useState(false); // GPS 로딩 여부 검사용

    const [chargingStations, setChargingStations] = useState([]); //서버로 부터 받아온 충전소 데이터 리스트
    const [chargers, setChargers] = useState([]); // 서버로 부터 받아온 특정 충전소의 충전기 리스트
    const [stationLogs, setStationLogs] = useState([]); //서버로 부터 받아온 특정 충전소의 충전 분석 로그

    const [chgerType, setChgerType] = useState([]); // 서버로 부터 받아온 충전기 타입
    const [busiNm, setBusiNm] = useState([]); // 서버로 부터 받아온 충전소 회사 리스트
    const [selectedType, setSelectedType] = useState({ chgerType: [], parkingFree: [], busiNm: [] });
    const [selectedStation, setSelectedStation] = useState([lat = 0, lng = 0]); //마커 선택 시 모달에 띄워줄 데이터

    const [smallModalVisible, setSmallModalVisible] = useState(false); //작은 모달 온오프
    const [bigModalVisible, setBigModalVisible] = useState(false); //큰 모달 온오프
    const [filterModalVisible, setFilterModalVisible] = useState(false); // 필터 모달 온오프
    const [stationListModalVisible, setStationListModalVisible] = useState(false); // 충전소 목록 모달 온오프
    const [didCancel, setCancel] = useState(false);
    const [isFiltering, setIsFiltering] = useState(false);


    const [isSmallModalOpen, setSmallModalOpen] = useState(false);
    const [isBigModalOpen, setBigModalOpen] = useState(false);


    // const source = useRef(); //취소 토큰 용
    const mapRef = useRef(); //몰라

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
                // console.log(location);
                setLocationAndGetStations(initLocation);
                setLoaded(true);
                // 실시간으로 위치 변화 감지 (권한 거부 시 아예 동작하지 않음 / 델타 값 관련 버그가 있어서 일단 주석 처리. 동작 자체는 아무 이상 없음)
                Location.watchPositionAsync({ accuracy: Location.Accuracy.Balanced, timeInterval: 100, distanceInterval: 1 },
                    position => {
                        setUserLocation({ longitude: position.coords.longitude, latitude: position.coords.latitude });
                    }
                );

                // getFilterRange(); //영업시간을 group으로 묶어 받아오기
                // group으로 묶은 결과 126개 데이터가 있어서 버튼을 생성하기 부적합하다고 생각 -> 0시, 1시, ... 으로 버튼 만들기로 함
                getchgerType();
                getbusiNm();
            })();
        }
        return () => {
            setCancel(true);
        }
    }, []);

    
    const setLocationAndGetStations = (region) => {
        setMapLocation(region);
        if (region.latitudeDelta < 0.13 && region.longitudeDelta < 0.13) { //단, 델타 값이 적당히 작은 상태에서만 서버로 요청
            getStations(region);
        }
        else { // 델타 값이 너무 크면 값을 그냥 비워버림
            setChargingStations([]);
        }
    }

    const getbusiNm = async () => {
        let key = "busiNm";
        axios.get(config.ip + ':5000/stationsRouter/keco/filteredStations/' + key
        ).then((response) => {
            setBusiNm(response.data);
        }).catch(function (error) {
            console.log(error);
        })
    }

    const getchgerType = () => {
        let key = "chgerType";
        console.log(key);
        axios.get(config.ip + ':5000/stationsRouter/keco/filteredCharger/' + key
        ).then((response) => {
            setChgerType(response.data);
            // console.log(response.data)
        }).catch(function (error) {
            console.log(error);
        })
    }

    const dataFiltering = () => {
        setIsFiltering(true);
        getFilteredData(mapLocation);
        setFilterModalVisible(false);
    }

    const selectType = (type, selected) => {
        let select = selectedType[type];
        select.push(selected)
        setSelectedType({ ...selectedType, [type]: select })
    }

    const cancleSelect = (type, selected) => {
        let select = selectedType[type];
        select = select.filter(item => item !== selected)
        console.log(select)
        setSelectedType({ ...selectedType, [type]: select })
    }

    const refresh = async () => {
        setIsFiltering(false);
        setSelectedType([]);
        setChargingStations(sortStations(userLocation, await getRegionData(mapLocation)));
    }

    const getStations = async (location) => {
        if (isFiltering) { //필터모드라면
            await getFilteredData(location);
        }
        else { //필터모드가 아니라면
            setChargingStations(sortStations(userLocation, await getRegionData(mapLocation)));
        }
    }

    
    const getFilteredData = (location) => {
        axios.post(config.ip + ':5000/stationsRouter/filterStations', {
            data: {
                x1: location.longitude - (location.longitudeDelta / 2),
                x2: location.longitude + (location.longitudeDelta / 2),
                y1: location.latitude - (location.latitudeDelta / 2),
                y2: location.latitude + (location.latitudeDelta / 2),
                types: selectedType
            }
        }).then((response) => {
            // console.log(response.data);
            setChargingStations(sortStations(userLocation, response.data));
        }).catch(function (error) {
            console.log(error);
        })
    }

    const getStationChargers = async (statId) => {
        setChargers(await getChargersByOneStation(statId))
    }

    const getStationLogs = (statId) => {
        //선택한 충전소id에 속한 충전기를 요청 
        console.log("getstationlogs : " + statId)

        axios.post(config.ip + ':5000/stationsRouter/keco/find/stationLogs', {
            data: statId
        }).then((response) => {
            // console.log(response.data)
            setStationLogs(response.data)
        }).catch(function (error) {
            console.log(error);
        })
    }

    const focusToStation = (station) => { // 검색하거나 선택된 충전소를 관리해주기 위한 통합 메소드
        // setSmallModalVisible(true)
        const stationLocation = {
            longitude: Number(station.lng),
            latitude: Number(station.lat),
            latitudeDelta: 0.007,
            longitudeDelta: 0.007,
        }
        setStationListModalVisible(false)
        setSelectedStation(station)
        setMapLocation(stationLocation);
        getStations(stationLocation);
        setSmallModalOpen(true);
        getStationChargers(station.statId)
        getStationLogs(station.statId)
    }

    return (
        <>
            {
                isLoaded //GPS 수신이 안되면 로딩 Spinner 띄울 목적
                    ?
                    <>
                        <View style={{ flex: 1 }}>
                            <FilterModal
                                filterModalVisible={filterModalVisible}
                                selectedType={selectedType}
                                setSelectedType={setSelectedType}
                                dataFiltering={dataFiltering}
                                cancleSelect={cancleSelect}
                                selectType={selectType}
                                chgerType={chgerType}
                                busiNm={busiNm}
                                setFilterModalVisible={setFilterModalVisible}
                            />

                            <StationListModal
                                location={mapLocation}
                                chargingStations={chargingStations}
                                stationListModalVisible={stationListModalVisible}
                                setStationListModalVisible={setStationListModalVisible}
                                focusToStation={focusToStation}
                            />

                            <StationSmallModal
                                isSmallModalOpen={isSmallModalOpen}
                                setSmallModalOpen={setSmallModalOpen}
                                station={selectedStation}
                                setBigModalOpen={setBigModalOpen}
                                chargers={chargers}
                            />

                            <StationBigModal //작은 모달에서 상세보기 클릭 시 큰 모달 띄우기 용
                                isBigModalOpen={isBigModalOpen}
                                setBigModalOpen={setBigModalOpen}
                                station={selectedStation}
                                chargers={chargers}
                                stationLogs={stationLogs}
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
                                clusterColor="green"
                                maxZoom={13}
                            >

                                {
                                    chargingStations.length > 0 && //사이즈가 0 이상일때맏 마커 찍는 시도함 (오류 방지)
                                    chargingStations.map((marker, index) => (
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
                                            pinColor={
                                                ((marker.statId == selectedStation.statId) ? "green" : "red")
                                            }
                                        >
                                            {/* <MaterialIcons name="location-pin" size={40} color="red" /> */}
                                        </Marker>
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
                            location={mapLocation}
                            setLocation={setMapLocation}
                            setLocationAndGetStations={setLocationAndGetStations}
                            smallModalVisible={smallModalVisible}
                            setFilterModalVisible={setFilterModalVisible}
                            setStationListModalVisible={setStationListModalVisible}
                            getStations={getStations}
                            focusToStation={focusToStation}
                            refresh={refresh}
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