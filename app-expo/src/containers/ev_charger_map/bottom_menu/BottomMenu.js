import { Center } from "native-base";
import { View } from "react-native";
import ChargerSearchBar from "./ChargerSearchBar";
import MenuStagger from "./MenuStagger";

const BottomMenu = (props) => {


    return (
        <>
            <Center style={{ position: 'absolute', left: 20, bottom: 30, height: 30 }} >
                <ChargerSearchBar
                    smallModalVisible={props.smallModalVisible}
                    focuseToStation={props.focuseToStation}
                />
            </Center>
            <Center style={{ position: 'absolute', right: 20, bottom: 240, height: 30, }} >
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

export default BottomMenu;