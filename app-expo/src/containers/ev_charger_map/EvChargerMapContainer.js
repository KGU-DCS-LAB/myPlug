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

const EvChargerContainer = (props) => {

    const [location, setLocation] = useState({
        latitude: 37.3012,
        longitude: 127.0355,
        latitudeDelta: 0,
        longitudeDelta: 0,
    });

    const [isLoaded, setLoaded] = useState(false);
    const [chargingStations, setChargingStations] = useState([]);
    const [count, setCount] = useState(0); // 테스트용
    const [requestTime, setRequestTime] = useState(new Date().getTime()); //제스처 검출용

    const [selectedStation, setSelectedStation] = useState();
    const [smallModalVisible, setSmallModalVisible] = useState(false);
    const [bigModalVisible, setBigModalVisible] = useState(false);

    const mapRef = useRef();


    // Get current location information 
    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.log('Permission to access location was denied');
                return;  //권한 거부 시 그대로 종료
            }

            let location = await Location.getCurrentPositionAsync({});
            // console.log(location);
            setLocation({
                longitude: location.coords.longitude,
                latitude: location.coords.latitude,
                latitudeDelta: 0.015,
                longitudeDelta: 0.015,
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

    const getRegionStations = (region) => {
        if (isLoaded) {
            setCount(count + 1)
            const newTime = new Date().getTime();
            console.log('--------')
            console.log(requestTime);
            setRequestTime(newTime);
            console.log(newTime);
            console.log('diff : ', newTime - requestTime);
            if (newTime - requestTime > 300) {
                console.log('updated at count:', count);
                setLocation(region)
            }
        }
    }

    useEffect(() => {
        if (location && location.latitudeDelta < 0.13 && location.longitudeDelta < 0.13) {
            axios.post(config.ip + ':5000/stationsRouter/keco/find/regionStations', {
                data: {
                    x1: location.longitude - (location.longitudeDelta / 2),
                    x2: location.longitude + (location.longitudeDelta / 2),
                    y1: location.latitude - (location.latitudeDelta / 2),
                    y2: location.latitude + (location.latitudeDelta / 2),
                }
            }).then((response) => {
                setChargingStations(response.data);
            }).catch(function (error) {
                console.log(error);
            })
        }
        else {
            setChargingStations([]);
        }
    }, [location]);

    return (
        <>
            {
                isLoaded
                    ?
                    <>
                        <View style={{ flex: 1 }}>
                            <StationSmallModal
                                station={selectedStation}
                                smallModalVisible={smallModalVisible}
                                setSmallModalVisible={setSmallModalVisible}
                                bigModalVisible={bigModalVisible}
                                setBigModalVisible={setBigModalVisible}
                            />
                            <StationBigModal
                                station={selectedStation}
                                smallModalVisible={smallModalVisible}
                                setSmallModalVisible={setSmallModalVisible}
                                bigModalVisible={bigModalVisible}
                                setBigModalVisible={setBigModalVisible}
                            />
                            <HStack><Text>Log</Text></HStack>
                            <HStack><Text>{location.latitude}</Text><Spacer /><Text>{count}</Text><Spacer /><Text>{location.longitude}</Text></HStack>
                            <HStack><Text>{location.latitudeDelta}</Text><Spacer /><Text>{location.longitudeDelta}</Text></HStack>
                            <MapView
                                // ref={mapRef}
                                initialRegion={{
                                    latitude: 37.3012,
                                    longitude: 127.0355,
                                    latitudeDelta: 0.0922,
                                    longitudeDelta: 0.0421,
                                }}
                                style={{ flex: 1 }}
                                provider={PROVIDER_GOOGLE}
                                showsUserLocation={true}
                                showsMyLocationButton={true}
                                region={{
                                    latitude: location.latitude,
                                    longitude: location.longitude,
                                    latitudeDelta: location.latitudeDelta,
                                    longitudeDelta: location.longitudeDelta,
                                }}
                                onRegionChange={region => {

                                }}
                                onRegionChangeComplete={(region, gesture) => {
                                    getRegionStations(region)
                                }}
                                onMapReady={() => {
                                    // updateMapStyle()
                                }}
                            >

                                {
                                    chargingStations.length > 0 &&
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
                        <BottomMenu navigation={props.navigation} />
                    </>
                    :
                    <LoadingSpinner />
            }
        </>
    )
}
export default EvChargerContainer;