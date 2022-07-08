import { View, Button, Text } from "react-native";

const MyPageContainer = (props) => {

    return (
        <View>
            <Text>마이페이지</Text>
            <Button 
            title="홈으로" 
            onPress={() => props.navigation.navigate('Home')}>홈으로</Button>
        </View>
    )
}
export default MyPageContainer;