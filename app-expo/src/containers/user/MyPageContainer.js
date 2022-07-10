import { View, Button, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const MyPageContainer = (props) => {

    const logout = () => {
        AsyncStorage.removeItem('userInfo');
        props.navigation.navigate('Home')
    }

    return (
        <View>
            <Text>마이페이지</Text>
            <Button 
            title="홈으로" 
            onPress={() => props.navigation.navigate('Home')}>홈으로</Button>
            <Button 
            title="로그아웃" 
            onPress={() => logout()}>로그아웃</Button>
        </View>
    )
}
export default MyPageContainer;