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
                    focuseToStation={props.focuseToStation}
                />
            </Center>
            <Center style={{ position: 'absolute', left: 20, bottom: 90, height: 30 }} >
                <LocationController
                    location={props.location}
                    setLocation={props.setLocation}
                />
            </Center>
            <Center style={{ position: 'absolute', right: 20, bottom: 150, height: 30, }} >
                <MenuStagger
                    navigation={props.navigation}
                    location={props.location}
                    setLocation={props.setLocation}
                    setFilterModalVisible={props.setFilterModalVisible}
                    setStationListModalVisible={props.setStationListModalVisible}
                    getStations={props.getStations}
                />
            </Center>
        </>
    )
}

export default CoverMenu;