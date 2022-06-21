import ChargerMap from "./charger_map/ChargerMap";
import BottomMenu from "./bottom_menu/BottomMenu";
import { View } from "native-base";
const EvChargerContainer = (props) => {

    return (
        <>
            <View style={{ flex: 1 }}>
                <ChargerMap/>
            </View>
            <BottomMenu navigation={props.navigation}/>
        </>
    )
}
export default EvChargerContainer;