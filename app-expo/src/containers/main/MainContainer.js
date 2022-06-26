// import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
// import HomeView from "../../views/main/HomeView";
import EvChargerContainer from "../ev_charger_map/EvChargerMapContainer";
import HomeContainer from "./HomeContainer";

const MainContainer = () => {

    const HomeScreen = ({ navigation }) => {
        return (
            <HomeContainer navigation={navigation} />
        );
    }

    const EvChargerScreen = ({ navigation }) => {
        return (
            <EvChargerContainer navigation={navigation} />
        );
    }

    const Stack = createStackNavigator();
    return (
        <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen
                name="EvCharger"
                component={EvChargerScreen}
                options={{
                    cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
                }}
            />
        </Stack.Navigator>
    )
}
export default MainContainer;