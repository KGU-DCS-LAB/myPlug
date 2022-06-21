import { Center } from "native-base";
import { View } from "react-native";
import ChargerSearchBar from "./ChargerSearchBar";
import MenuStagger from "./MenuStagger";

const BottomMenu = (props) => {


    return (
        <>
            <Center style={{ position: 'absolute', left: 20, bottom: 30, height: 30 }} >
                <ChargerSearchBar/>
            </Center>
            <Center style={{ position: 'absolute', right: 20, bottom: 90, height: 30, }} >
                <MenuStagger/>
            </Center>
        </>
    )
}

export default BottomMenu;