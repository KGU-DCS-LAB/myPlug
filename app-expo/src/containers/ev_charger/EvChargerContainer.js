import { Fab, Icon } from "native-base";
import { View } from "react-native";
import SearchBar from "react-native-dynamic-search-bar";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { AntDesign } from "@expo/vector-icons";
import { useEffect, useState } from "react";
//location
import * as Location from 'expo-location';
const EvChargerContainer = (props) => {

    const [location, setLocation] = useState({
        latitude: 37.3012,
        longitude: 127.0355,
    });
    const [errorMsg, setErrorMsg] = useState(null);

    // Get current location information 
    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;  //권한 거부 시 그대로 종료
            }

            let location = await Location.getCurrentPositionAsync({});
            console.log(location);

            // 실시간으로 위치 변화 감지 (권한 거부 시 아예 동작하지 않음)
            Location.watchPositionAsync({ accuracy: Location.Accuracy.Balanced, timeInterval: 100, distanceInterval: 1 },
                position => {
                    console.log(position.coords);
                    setLocation({ longitude: position.coords.longitude, latitude: position.coords.latitude });
                }
            );

        })();

    }, []);


    return (
        <>
            <View style={{ flex: 1 }}>
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
                        // latitudeDelta: 0.0922,
                        // longitudeDelta: 0.0421,
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01,
                    }}
                    onMapReady={() => {
                        // updateMapStyle()
                    }}
                />
            </View>
            <Fab
                renderInPortal={false}
                shadow={2}
                size="sm"
                style={{ backgroundColor: "#27ae60", }}
                icon={<Icon color="white" as={AntDesign} name="home" size="sm" />}
                onPress={() => props.navigation.navigate('Home')}
            />
        </>
    )
}
export default EvChargerContainer;