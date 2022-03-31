// import { Stack } from "native-base"
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button } from 'react-native';
import LoginView from '../../views/login/LoginView';
import SignInView from '../../views/login/SignInView';


const Stack = createNativeStackNavigator();

function LoginScreen({navigation}) {
    return (
        <LoginView navigation={navigation} />
    );
}

function SignInScreen() {
    return (
        <SignInView />
    );
}

const LoginRoute = ( props ) => {
    return (
        <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="SignIn" component={SignInScreen} />
        </Stack.Navigator>
    )
}

export default LoginRoute;