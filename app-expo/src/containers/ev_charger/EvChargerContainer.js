import { Fab, Icon } from "native-base";
import { View } from "react-native";
import SearchBar from "react-native-dynamic-search-bar";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { AntDesign } from "@expo/vector-icons";

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
            <SearchBar
                placeholder="Search here"
                onPress={() => alert("onPress")}
                onChangeText={(text) => {
                    console.log(text)
                }}
                onClearPress={() => {

                }}
            />
            <Fab
                renderInPortal={false}
                shadow={2}
                size="md"
                style={{ backgroundColor: "#27ae60", }}
                icon={<Icon color="white" as={AntDesign} name="plus" size="md" />}
                onPress={() => props.navigation.navigate('Home')}
            />
        </View>
    )
}
export default EvChargerContainer;