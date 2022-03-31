// import { Stack } from "native-base"
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginView from '../../views/login/LoginView';

const Stack = createNativeStackNavigator();

function LoginScreen() {
    return (
        <LoginView />
    );
}

const LoginRoute = ({ props }) => {
    return (
        <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name="Login" component={LoginScreen} />
        </Stack.Navigator>
    )
}

export default LoginRoute;