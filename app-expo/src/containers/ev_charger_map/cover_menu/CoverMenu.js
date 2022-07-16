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
                    smallModalVisible={props.smallModalVisible}
                    focusToStation={props.focusToStation}
                />
            </Center>
            <Center style={{ position: 'absolute', left: 20, bottom: 90, height: 30 }} >
                <LocationController
                    location={props.location}
                    setLocation={props.setLocation}
                    setLocationAndGetStations={props.setLocationAndGetStations}
                />
            </Center>
            <Center style={{ position: 'absolute', right: 20, bottom: 150, height: 30, }} >
                <MenuStagger
                    navigation={props.navigation}
                    setFilterModalVisible={props.setFilterModalVisible}
                    setStationListModalVisible={props.setStationListModalVisible}
                    getStations={props.getStations}
                    refresh={props.refresh}
                />
            </Center>
        </>
    )
}

export default CoverMenu;