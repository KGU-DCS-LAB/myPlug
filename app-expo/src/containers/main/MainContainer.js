import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeView from "../../views/main/HomeView";

const MainContainer = () => {

    const HomeScreen = ({ navigation }) => {
        return (
          <HomeView navigation={navigation} />
        );
    }

    const EvChargerScreen = ({ navigation }) => {
        return (
          <HomeView navigation={navigation} />
        );
    }
    
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="EvCharger" component={EvChargerScreen} />
        </Stack.Navigator>
    )
}
export default MainContainer;