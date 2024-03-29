import { Center, Icon, IconButton } from "native-base";
import { View } from "react-native";
import ChargerSearchBar from "./ChargerSearchBar";
import LocationController from "./LocationController";
import MenuStagger from "./MenuStagger";
import { MaterialIcons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { setThemeModalVisible } from "../../../app/redux/modal/modalSlice";

const CoverMenu = (props) => {

    const dispatch = useDispatch();

    return (
        <>
            <Center style={{ position: 'absolute', left: 20, top: 30, height: 30 }} >
                <ChargerSearchBar
                    // focusToStation={props.focusToStation}
                />
            </Center>
            <Center style={{ position: 'absolute', right: 20, top: 30, height: 30 }} >
                <IconButton
                    mb="3"
                    my={3}
                    variant="solid"
                    bg="blue.500"
                    colorScheme="indigo"
                    borderRadius="12"

                    icon={
                        <Icon
                            as={MaterialIcons}
                            size="6"
                            name="brightness-high"
                            _dark={{
                                color: "warmGray.50"
                            }}
                            color="warmGray.50"
                        />
                    }
                    onPress={
                        () => dispatch(setThemeModalVisible(true))
                    }
                />
            </Center>
            <Center style={{ position: 'absolute', left: 20, bottom: 90, height: 30 }} >
                <LocationController
                    mapRef={props.mapRef}
                    mapLocation={props.mapLocation}
                    setLocationAndGetStations={props.setLocationAndGetStations}
                />
            </Center>
            <Center style={{ position: 'absolute', right: 20, bottom: 150, height: 30, }} >
                <MenuStagger
                    navigation={props.navigation}
                    mapLocation={props.mapLocation}
                    setLocationAndGetStations={props.setLocationAndGetStations}
                />
            </Center>
        </>
    )
}

export default CoverMenu;