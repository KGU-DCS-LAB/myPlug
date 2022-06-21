import { useEffect, useState } from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from 'expo-location';
import { config } from '../../../../config'
import axios from 'axios';

const ChargerMap = (props) => {

    const [location, setLocation] = useState({
        latitude: 37.3012,
        longitude: 127.0355,
    });

    const [chargingStations, setChargingStations] = useState([]);

    // Get current location information 
    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.log('Permission to access location was denied');
                return;  //권한 거부 시 그대로 종료
            }

            let location = await Location.getCurrentPositionAsync({});
            console.log(location);
            setLocation({ longitude: location.coords.longitude, latitude: location.coords.latitude });

            // 실시간으로 위치 변화 감지 (권한 거부 시 아예 동작하지 않음 / 델타 값 관련 버그가 있어서 일단 주석 처리. 동작 자체는 아무 이상 없음)
            // Location.watchPositionAsync({ accuracy: Location.Accuracy.Balanced, timeInterval: 100, distanceInterval: 1 },
            //     position => {
            //         console.log(position.coords);
            //         setLocation({ longitude: position.coords.longitude, latitude: position.coords.latitude });
            //     }
            // );

        })();



        // console.log('stationData')
        // // 충전소 데이터 받아오는 작업 시작
        // axios.get(config.ip + ':5000/stationsRouter/keco/find/stations')
        //     .then((response) => {
        //         setChargingStations(JSON.stringify(response.data));
        //         console.log(response.data);
        //     }).catch((error) => {
        //         console.log(error);
        //     });
        // // 충전소 데이터 받아오는 작업 끝


    }, []);

    return (
        <MapView
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
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            }}
            onMapReady={() => {
                // updateMapStyle()
            }}
        >

            {
            // chargingStations.length > 0 && chargingStations.map((marker, index) => (
            //     <Marker
            //         key={index}
            //         coordinate={{ latitude: Number(marker.lat), longitude: Number(marker.lng) }}
            //         title={marker.statNm}
            //         description={marker.addr}
            //         onPress={
            //             () => {
            //                 // this.setSmallModalVisible(true);
            //                 // this.setChargingStation(marker);
            //             }
            //         }
            //     />
            // ))
            }

        </MapView>
    )
}

export default ChargerMap;