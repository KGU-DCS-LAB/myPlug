import { Center } from "native-base";
import { View } from "react-native";
import ChargerSearchBar from "./ChargerSearchBar";
import MenuStagger from "./MenuStagger";

const BottomMenu = (props) => {


    return (
        <>
            <Center style={{ position: 'absolute', left: 20, bottom: 30, height: 30 }} >
                <ChargerSearchBar setLocation={props.setLocation}/>
            </Center>
            <Center style={{ position: 'absolute', right: 20, bottom: 240, height: 30, }} >
                <MenuStagger navigation={props.navigation} location={props.location} setLocation={props.setLocation} setFilterModalVisible={props.setFilterModalVisible} getStations={props.getStations}/>
            </Center>
        </>
    )
}

export default BottomMenu;