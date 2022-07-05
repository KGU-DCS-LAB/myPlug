import { useEffect, useRef, useState } from "react";
import { Circle, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import MapView from "react-native-map-clustering";
import * as Location from 'expo-location';
import { config } from '../../../config'
import axios from 'axios';
import { Box, Center, HStack, Spacer, Text, View } from "native-base";

import CoverMenu from "./cover_menu/CoverMenu";
import LoadingSpinner from "../../components/Loading/LoadingSpinner";
import StationSmallModal from "../../components/ev_charger_map/modals/StationSmallModal";
import StationBigModal from "../../components/ev_charger_map/modals/StationBigModal";
import FilterModal from "../../components/ev_charger_map/modals/FilterModal";
import { Image } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import StationListModal from "../../components/ev_charger_map/modals/StationListModal";

const EvChargerContainer = (props) => {

    const [location, setLocation] = useState({
        latitude: 37.3012,
        longitude: 127.0355,
        latitudeDelta: 0,
        longitudeDelta: 0,
    }); // 기본 위치 데이터 (비상용)

    const [isLoaded, setLoaded] = useState(false); // GPS 로딩 여부 검사용

    const [chargingStations, setChargingStations] = useState([]); //서버로 부터 받아온 충전소 데이터 리스트
    const [chargers, setChargers] = useState([]); // 서버로 부터 받아온 충전기 리스트
    const [chgerType, setChgerType] = useState([]); // 서버로 부터 받아온 충전기 타입

    const [count, setCount] = useState(0); // 리프레시 횟수 검사 용 (테스트 할 때 사용됨)
    const [requestTime, setRequestTime] = useState(new Date().getTime()); //제스처 검출용 (손 끝에서 지도를 탈출했을 때, 특정 상황에서 부드러운 화면 업데이트를 위해 위치 상태 값이 강제러 리프레시 되는 현상이 있어 서버에 과도한 데이터 요청을 하는 것을 발견함. 따라서 이를 방지하기 위해 특정한 로직을 추가하여 위치 값이 수정될 때 마다 이 값이 갱신되도록 함)

    // const [searchedStation, setSearchedStation] = useState([]); // 검색하고 선택한 충전소
    const [selectedStation, setSelectedStation] = useState([lat = 0, lng = 0]); //마커 선택 시 모달에 띄워줄 데이터
    const [filterKeyword, setFilterKeyword] = useState({});

    const [smallModalVisible, setSmallModalVisible] = useState(false); //작은 모달 온오프
    const [bigModalVisible, setBigModalVisible] = useState(false); //큰 모달 온오프
    const [filterModalVisible, setFilterModalVisible] = useState(false); // 필터 모달 온오프
    const [stationListModalVisible, setStationListModalVisible] = useState(false); // 충전소 목록 모달 온오프
    const [didCancel, setCancel] = useState(false);

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
                // console.log(location);
                setLocation({
                    longitude: location.coords.longitude,
                    latitude: location.coords.latitude,
                    latitudeDelta: 0.007,
                    longitudeDelta: 0.007,
                });
                setLoaded(true);
                // 실시간으로 위치 변화 감지 (권한 거부 시 아예 동작하지 않음 / 델타 값 관련 버그가 있어서 일단 주석 처리. 동작 자체는 아무 이상 없음)
                // Location.watchPositionAsync({ accuracy: Location.Accuracy.Balanced, timeInterval: 100, distanceInterval: 1 },
                //     position => {
                //         console.log(position.coords);
                //         setLocation({ longitude: position.coords.longitude, latitude: position.coords.latitude });
                //     }
                // );

                // getFilterRange(); //영업시간을 group으로 묶어 받아오기
                // group으로 묶은 결과 126개 데이터가 있어서 버튼을 생성하기 부적합하다고 생각 -> 0시, 1시, ... 으로 버튼 만들기로 함
                getchgerType();
            })();
        }
        return () => {
            setCancel(true);
        }
    }, []);

    //현 위치의 충전소 데이터 수신
    const getRegionStations = (region) => {
        if (isLoaded) {
            setCount(count + 1)
            const newTime = new Date().getTime();
            // console.log('--------')
            // console.log(requestTime); //마지막 위치 요청 시간
            setRequestTime(newTime);
            // console.log(newTime); //새로운 위치 요청 시간
            console.log('diff : ', newTime - requestTime);
            if (newTime - requestTime > 300) { //두 요청 시간 차이가 300보다 큰 경우에만 정상적인 요청임 (그 이하는 지도 화면이 자동으로 부드럽게 밀리는 과정에서 위치 값을 갱신하는 것으로 간주함)
                console.log('updated at count:', count); //실제로 서버로 요청이 들어간 refresh count 값이 얼마인지 확인하기 위해 추가
                setLocation(region); //위치 값 갱신
            }
        }
    }

    const getFilterRange = async () => {
        let key = "useTime";
        console.log("key", key);
        let result = await fetch(config.ip + `:5000/stationsRouter/keco/filteredStations/${key}`);
        result = await result.json();
        console.log("size", result.length);
    }

    const getchgerType = () => {
        let key = "chgerType";
        console.log(key);
        axios.get(config.ip + ':5000/stationsRouter/keco/filteredStations/' + key
        ).then((response) => {
            setChgerType(response.data);
            console.log(response.data)
        }).catch(function (error) {
            console.log(error);
        })
    }

    //위치 값이 변할 때 마다 서버로 데이터 요청을 함
    useEffect(() => {
        // console.log(mapRef?.current?.getCamera());
        if (location && location.latitudeDelta < 0.13 && location.longitudeDelta < 0.13) { //단, 델타 값이 적당히 작은 상태에서만 서버로 요청
            getStations();
        }
        else { // 델타 값이 너무 크면 값을 그냥 비워버림
            setChargingStations([]);
        }
        
    }, [location]);

    const getStations = async () => {

        // if(source.current !== undefined && source.current !== null) { // already exists request
        //     console.log('취소점여')
        //     source.current.cancel();
        //   }
        //   source.current = axios.CancelToken.source();

        await axios.post(config.ip + ':5000/stationsRouter/keco/find/regionStations', {
            // cancelToken: source.current.token,
            data: { // 현재 화면 모서리의 좌표 값을 전송함. 같은 축이여도 숫자가 작을 수록 값이 작음 (ex. x1<x2,  y1<y2)
                x1: location.longitude - (location.longitudeDelta / 2),
                x2: location.longitude + (location.longitudeDelta / 2),
                y1: location.latitude - (location.latitudeDelta / 2),
                y2: location.latitude + (location.latitudeDelta / 2),
                count:count,
            }
        }).then((response) => {
            setChargingStations(response.data); //서버에서 받아온 충전소 데이터 리스트를 업데이트
        }).catch(function (error) {
            console.log(error);
        })
    }

    const getChargers = (statId) => {
        //선택한 충전소id에 속한 충전기를 요청 
        // console.log(statId)
        axios.post(config.ip + ':5000/stationsRouter/keco/find/chargers', {
            data: statId
        }).then((response) => {
            console.log(response.data.length)
            setChargers(response.data)
        }).catch(function (error) {
            console.log(error);
        })
    }

    const focuseToStation = (station) => { // 검색하거나 선택된 충전소를 관리해주기 위한 통합 메소드
        setSmallModalVisible(true)
        setStationListModalVisible(false)
        setSelectedStation(station)
        setLocation({
            longitude: Number(station.lng),
            latitude: Number(station.lat),
            latitudeDelta: 0.007,
            longitudeDelta: 0.007,
            // latitudeDelta: location.latitudeDelta,
            // longitudeDelta: location.longitudeDelta,
        });
        getChargers(station.statId)
    }

    return (
        <>
            {
                isLoaded //GPS 수신이 안되면 로딩 Spinner 띄울 목적
                    ?
                    <>
                        <View style={{ flex: 1 }}>

                            <StationSmallModal //마커 클릭 시 작은 모달 띄우기 용
                                station={selectedStation}
                                smallModalVisible={smallModalVisible}
                                setSmallModalVisible={setSmallModalVisible}
                                bigModalVisible={bigModalVisible}
                                setBigModalVisible={setBigModalVisible}
                                chargers={chargers}
                            />
                            <StationBigModal //작은 모달에서 상세보기 클릭 시 큰 모달 띄우기 용
                                station={selectedStation}
                                smallModalVisible={smallModalVisible}
                                setSmallModalVisible={setSmallModalVisible}
                                bigModalVisible={bigModalVisible}
                                setBigModalVisible={setBigModalVisible}
                                chargers={chargers}
                            />
                            <FilterModal
                                filterModalVisible={filterModalVisible}
                                chgerType={chgerType}
                                setFilterModalVisible={setFilterModalVisible}
                                setFilterKeyword={setFilterKeyword}
                            />

                            <StationListModal
                                chargingStations={chargingStations}
                                stationListModalVisible={stationListModalVisible}
                                setStationListModalVisible={setStationListModalVisible}
                                focuseToStation={focuseToStation}
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
                                    latitude: location.latitude,
                                    longitude: location.longitude,
                                    latitudeDelta: location.latitudeDelta,
                                    longitudeDelta: location.longitudeDelta,
                                }}
                                onRegionChange={region => {

                                }}
                                onRegionChangeComplete={(region, gesture) => { //손가락이 지도에서 떨어지는 순간 처리할 일
                                    getRegionStations(region)
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
                                                    focuseToStation(marker)
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
                            <HStack><Text>{location.latitude}</Text><Spacer /><Text>{count}</Text><Spacer /><Text>{location.longitude}</Text></HStack>
                            <HStack><Text>{location.latitudeDelta}</Text><Spacer /><Text>{location.longitudeDelta}</Text></HStack>
                            {/* 테스트 로그를 쉽게 확인하기 위한 처리 */}

                        </View>
                        <CoverMenu
                            navigation={props.navigation}
                            location={location}
                            setLocation={setLocation}
                            smallModalVisible={smallModalVisible}
                            setFilterModalVisible={setFilterModalVisible}
                            setStationListModalVisible={setStationListModalVisible}
                            getStations={getStations}
                            focuseToStation={focuseToStation}
                        />
                    </>
                    :
                    <>
                        <LoadingSpinner description="디바이스가 어디에 있는지 찾고 있어요..." />
                        {/* <LoadingSpinner/> */}
                    </>
            }
        </>
    )
}
export default EvChargerContainer;