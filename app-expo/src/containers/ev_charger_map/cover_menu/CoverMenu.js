import { Center } from "native-base";
import { View } from "react-native";
import ChargerSearchBar from "./ChargerSearchBar";
import LocationController from "./LocationController";
import MenuStagger from "./MenuStagger";

const CoverMenu = (props) => {


    return (
        <>
            <Center style={{ position: 'absolute', left: 20, top: 30, height: 30 }} >
                <ChargerSearchBar
                    isSmallModalOpen={props.isSmallModalOpen}
                    focusToStation={props.focusToStation}
                />
            </Center>
            <Center style={{ position: 'absolute', left: 20, bottom: 90, height: 30 }} >
                <LocationController
                    mapLocation={props.mapLocation}
                    setLocationAndGetStations={props.setLocationAndGetStations}
                />
            </Center>
            <Center style={{ position: 'absolute', right: 20, bottom: 180, height: 30, }} >
                <MenuStagger
                    navigation={props.navigation}
                    setFilterModalVisible={props.setFilterModalVisible}
                    setStationListModalVisible={props.setStationListModalVisible}
                    mapLocation={props.mapLocation}
                    setLocationAndGetStations={props.setLocationAndGetStations}
                    setThemeModalOpen={props.setThemeModalOpen}
                />
            </Center>
        </>
    )
}

export default CoverMenu;