import { useEffect, useRef, useState } from "react";
import { Circle, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import MapView from "react-native-map-clustering";
import * as Location from 'expo-location';
import { config } from '../../../config'
import axios from 'axios';
import { Box, HStack, Spacer, Text, View } from "native-base";

import BottomMenu from "./bottom_menu/BottomMenu";
import LoadingSpinner from "../../components/Loading/LoadingSpinner";
import StationSmallModal from "../../components/ev_charger_map/StationSmallModal";
import StationBigModal from "../../components/ev_charger_map/StationBigModal";
import FilterModal from "../../components/ev_charger_map/FilterModal";

const EvChargerContainer = (props) => {

    const [location, setLocation] = useState({
        latitude: 37.3012,
        longitude: 127.0355,
        latitudeDelta: 0,
        longitudeDelta: 0,
    }); // 기본 위치 데이터 (비상용)

    const [isLoaded, setLoaded] = useState(false); // GPS 로딩 여부 검사용
    const [chargingStations, setChargingStations] = useState([]); //서버로 부터 받아온 충전소 데이터 리스트
    const [count, setCount] = useState(0); // 리프레시 횟수 검사 용 (테스트 할 때 사용됨)
    const [requestTime, setRequestTime] = useState(new Date().getTime()); //제스처 검출용 (손 끝에서 지도를 탈출했을 때, 특정 상황에서 부드러운 화면 업데이트를 위해 위치 상태 값이 강제러 리프레시 되는 현상이 있어 서버에 과도한 데이터 요청을 하는 것을 발견함. 따라서 이를 방지하기 위해 특정한 로직을 추가하여 위치 값이 수정될 때 마다 이 값이 갱신되도록 함)

    const [selectedStation, setSelectedStation] = useState(); //마커 선택 시 모달에 띄워줄 데이터
    const [smallModalVisible, setSmallModalVisible] = useState(false); //작은 모달 온오프
    const [bigModalVisible, setBigModalVisible] = useState(false); //큰 모달 온오프
    const [filterModalVisible, setFilterModalVisible] = useState(false);

    const mapRef = useRef(); //몰라

    // Get current location information 
    useEffect(() => {
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

        })();

    }, []);

    //현 위치의 충전소 데이터 수신
    const getRegionStations = (region) => {
        if (isLoaded) {
            setCount(count + 1)
            const newTime = new Date().getTime();
            console.log('--------')
            console.log(requestTime); //마지막 위치 요청 시간
            setRequestTime(newTime);
            console.log(newTime); //새로운 위치 요청 시간
            console.log('diff : ', newTime - requestTime);
            if (newTime - requestTime > 300) { //두 요청 시간 차이가 300보다 큰 경우에만 정상적인 요청임 (그 이하는 지도 화면이 자동으로 부드럽게 밀리는 과정에서 위치 값을 갱신하는 것으로 간주함)
                console.log('updated at count:', count); //실제로 서버로 요청이 들어간 refresh count 값이 얼마인지 확인하기 위해 추가
                setLocation(region); //위치 값 갱신
            }
        }
    }

    //위치 값이 변할 때 마다 서버로 데이터 요청을 함
    useEffect(() => {
        console.log(mapRef?.current?.getCamera());
        if (location && location.latitudeDelta < 0.13 && location.longitudeDelta < 0.13) { //단, 델타 값이 적당히 작은 상태에서만 서버로 요청
            axios.post(config.ip + ':5000/stationsRouter/keco/find/regionStations', {
                data: { // 현재 화면 모서리의 좌표 값을 전송함. 같은 축이여도 숫자가 작을 수록 값이 작음 (ex. x1<x2,  y1<y2)
                    x1: location.longitude - (location.longitudeDelta / 2),
                    x2: location.longitude + (location.longitudeDelta / 2),
                    y1: location.latitude - (location.latitudeDelta / 2),
                    y2: location.latitude + (location.latitudeDelta / 2),
                }
            }).then((response) => {
                setChargingStations(response.data); //서버에서 받아온 충전소 데이터 리스트를 업데이트
            }).catch(function (error) {
                console.log(error);
            })
        }
        else { // 델타 값이 너무 크면 값을 그냥 비워버림
            setChargingStations([]);
        }
    }, [location]);

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
                            />
                            <StationBigModal //작은 모달에서 상세보기 클릭 시 큰 모달 띄우기 용
                                station={selectedStation}
                                smallModalVisible={smallModalVisible}
                                setSmallModalVisible={setSmallModalVisible}
                                bigModalVisible={bigModalVisible}
                                setBigModalVisible={setBigModalVisible}
                            />
                            <FilterModal
                                filterModalVisible={filterModalVisible}
                                setFilterModalVisible={setFilterModalVisible}
                            />

                            {/* 테스트 로그를 쉽게 확인하기 위한 처리 */}
                            <HStack><Text>Log</Text></HStack>
                            <HStack><Text>{location.latitude}</Text><Spacer /><Text>{count}</Text><Spacer /><Text>{location.longitude}</Text></HStack>
                            <HStack><Text>{location.latitudeDelta}</Text><Spacer /><Text>{location.longitudeDelta}</Text></HStack>
                            {/* 테스트 로그를 쉽게 확인하기 위한 처리 */}

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
                            >

                                {
                                    chargingStations.length > 0 && //사이즈가 0 이상일때맏 마커 찍는 시도함 (오류 방지)
                                    chargingStations.map((marker, index) => (
                                        <Marker
                                            key={index}
                                            coordinate={{ latitude: Number(marker.lat), longitude: Number(marker.lng) }}
                                            title={marker.statNm}
                                            description={marker.addr}
                                            onPress={
                                                () => {
                                                    setSmallModalVisible(true);
                                                    setSelectedStation(marker);
                                                }
                                            }
                                        />
                                    ))
                                }

                            </MapView>
                        </View>
                        <BottomMenu navigation={props.navigation} setLocation={setLocation} setFilterModalVisible={setFilterModalVisible}/>
                    </>
                    :
                    <LoadingSpinner />
            }
        </>
    )
}
export default EvChargerContainer;