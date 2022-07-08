import { View, Button } from "react-native";

const LoginContainer = (props) => {

    return (
        <View>
            <Button 
            title="홈으로" 
            onPress={
                            () => props.navigation.navigate('Home')
                        }>홈으로</Button>
        </View>
    )
}
export default LoginContainer;