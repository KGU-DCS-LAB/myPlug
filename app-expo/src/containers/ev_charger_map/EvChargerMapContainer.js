import { useEffect, useRef, useState } from "react";
import { Circle, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import MapView from "react-native-map-clustering";
import * as Location from 'expo-location';
import { config } from '../../../config'
import axios from 'axios';
import { Box, HStack, Spacer, Text, View } from "native-base";

import BottomMenu from "./bottom_menu/BottomMenu";

const EvChargerContainer = (props) => {

    const [location, setLocation] = useState({
        latitude: 37.3012,
        longitude: 127.0355,
        latitudeDelta: 0.11211571126961672,
        longitudeDelta: 0.0823817029595375,
    });

    const [isLoaded, setLoaded] = useState(false);
    const [chargingStations, setChargingStations] = useState([]);
    const [count, setCount] = useState(0);
    const [requestTime, setRequestTime] = useState(new Date().getTime());


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
                latitudeDelta: 0.11211571126961672,
                longitudeDelta: 0.0823817029595375,
            });

            // 실시간으로 위치 변화 감지 (권한 거부 시 아예 동작하지 않음 / 델타 값 관련 버그가 있어서 일단 주석 처리. 동작 자체는 아무 이상 없음)
            // Location.watchPositionAsync({ accuracy: Location.Accuracy.Balanced, timeInterval: 100, distanceInterval: 1 },
            //     position => {
            //         console.log(position.coords);
            //         setLocation({ longitude: position.coords.longitude, latitude: position.coords.latitude });
            //     }
            // );

        })();

        // (async () => {
        //     // console.log('stationData')
        //     // // 충전소 데이터 받아오는 작업 시작
        //     await axios.get(config.ip + ':5000/stationsRouter/keco/find/stations')
        //         .then((response) => {
        //             setChargingStations(response.data);
        //             // setLoaded(true);
        //             // console.log(response.data);
        //         }).catch((error) => {
        //             console.log(error);
        //         });
        //     // // 충전소 데이터 받아오는 작업 끝


        // })();


    }, []);

    const getRegionStations = (region) => {
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
            <View style={{ flex: 1 }}>
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
                    {/* <Circle
            center={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}
            radius={5000}
            fillColor="rgba(255, 255, 255, 1)"
            strokeColor="rgba(0,0,0,0.5)"
            zIndex={2}
            strokeWidth={2}
          /> */}
                    {/* <Marker
                    key={0}
                    title="dd"
                    description="22"
                    coordinate={{
                        latitude: location.latitude + (location.latitudeDelta / 2),
                        longitude: location.longitude + (location.longitudeDelta / 2),
                    }}
                />
                <Marker
                    key={1}
                    title="dd"
                    description="22"
                    coordinate={{
                        latitude: location.latitude + (location.latitudeDelta / 2),
                        longitude: location.longitude - (location.longitudeDelta / 2),
                    }}
                />
                <Marker
                    key={2}
                    title="dd"
                    description="22"
                    coordinate={{
                        latitude: location.latitude - (location.latitudeDelta / 2),
                        longitude: location.longitude - (location.longitudeDelta / 2),
                    }}
                />
                <Marker
                    key={3}
                    title="dd"
                    description="22"
                    coordinate={{
                        latitude: location.latitude - (location.latitudeDelta / 2),
                        longitude: location.longitude + (location.longitudeDelta / 2),
                    }}
                /> */}

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
                                        // this.setSmallModalVisible(true);
                                        // this.setChargingStation(marker);
                                    }
                                }
                            />
                        ))
                    }

                </MapView>
            </View>
            <BottomMenu navigation={props.navigation} />
        </>
    )
}
export default EvChargerContainer;