import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import EvChargerContainer from "../ev_charger_map/EvChargerMapContainer";
import HomeContainer from "./HomeContainer";
import LoginContainer from '../user/LoginContainer';
import SignUpContainer from '../user/SignUpContainer';
import MyPageContainer from '../user/MyPageContainer';
import ModalExample from '../example/ModalExample';
import CollapseExample from '../example/CollapseExample';
import ScheduleContainer from '../schedule/ScheduleContainer';
import ButtonsLayoutExample from '../example/ButtonsLayoutExample';
import MyCarContainer from '../my_car/MyCarContainer';
import AdvancedSearch from '../advancedSearch/AdvancedSearchContainer';
import GoogleMapExample from '../example/GoogleMapExample';
import CheckBoxExample from '../example/CheckBoxExample';
import StationInfoView from '../ev_charger_map/view/StationInfoView';

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

    const EvChargerStationInfoScreen = ({ navigation }) => {
        return (
            <StationInfoView navigation={navigation} />
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

    const ScheduleScreen = ({ navigation }) => {
        return (
            <ScheduleContainer navigation={navigation} />
        );
    }

    const AdvancedSearchScreen = ({ navigation }) => {
        return (
            <AdvancedSearch navigation={navigation} />
        );
    }

    const ExampleScreen = ({ navigation }) => {
        return (
            // <ModalExample navigation={navigation} />
            // <CollapseExample navigation={navigation} />
            // <ButtonsLayoutExample navigation={navigation} />
            <GoogleMapExample navigation={navigation} />
            // <CheckBoxExample navigation={navigation} />
        )
    }

    const MyCarScreen = ({ navigation }) => {
        return (
            <MyCarContainer navigation={navigation} />
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
                name='EvChargerStationInfo'
                component={EvChargerStationInfoScreen}
                options={{
                    cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS,
                }}
            />
            <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{
                    cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS,
                }}
            />
            <Stack.Screen
                name="SignUp"
                component={SignUpScreen}
                options={{
                    cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS,
                }}
            />
            <Stack.Screen
                name="MyPage"
                component={MyPageScreen}
                options={{
                    cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS,
                }}
            />
            <Stack.Screen
                name="AdvancedSearch"
                component={AdvancedSearchScreen}
                options={{
                    cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS,
                }}
            />
            <Stack.Screen
                name="Schedule"
                component={ScheduleScreen}
                options={{
                    cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS,
                }}
            />
            <Stack.Screen
                name="example"
                component={ExampleScreen}
                options={{
                    cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS,
                }}
            />
            <Stack.Screen
                name="MyCar"
                component={MyCarScreen}
                options={{
                    cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS,
                }}
            />
        </Stack.Navigator>
    )
}
export default MainContainer;