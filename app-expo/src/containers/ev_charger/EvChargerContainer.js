import { View } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

const EvChargerContainer = (props) => {
    return (
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
                onMapReady={() => {
                    // updateMapStyle()
                }}
            >
            </MapView>
        </View>
    )
}
export default EvChargerContainer;