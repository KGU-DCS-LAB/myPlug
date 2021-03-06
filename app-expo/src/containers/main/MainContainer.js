// import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
// import HomeView from "../../views/main/HomeView";
import EvChargerContainer from "../ev_charger_map/EvChargerMapContainer";
import HomeContainer from "./HomeContainer";
import LoginContainer from '../user/LoginContainer';
import SignUpContainer from '../user/SignUpContainer';
import MyPageContainer from '../user/MyPageContainer';
import ModalExample from '../example/ModalExample';
import CollapseExample from '../example/CollapseExample';

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

    const LoginScreen = ({ navigation }) => {
        return (
            <LoginContainer navigation={navigation} />
        );
    }

    const SignUpScreen = ({ navigation }) => {
        return (
            <SignUpContainer navigation={navigation} />
        );
    }

    const MyPageScreen = ({ navigation }) => {
        return (
            <MyPageContainer navigation={navigation} />
        );
    }

    const ExampleScreen = ({navigation}) => {
        return(
            // <ModalExample navigation={navigation} />
            <CollapseExample navigation={navigation} />
        )
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
            <Stack.Screen
                name="Login"
                component={LoginScreen}
            />
            <Stack.Screen
                name="SignUp"
                component={SignUpScreen}
            />
            <Stack.Screen
                name="MyPage"
                component={MyPageScreen}
            />
            <Stack.Screen
                name="example"
                component={ExampleScreen}
            />
        </Stack.Navigator>
    )
}
export default MainContainer;