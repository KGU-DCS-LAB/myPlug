import { Box, HStack, Spacer, Text } from "native-base";
import { Dimensions, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import PressableButton from "../../components/common/PressableButton";

const HomeContainer = (props) => {
    const windowWidth = Dimensions.get('window').width;
    const numOfCol = 2;
    return (
        <Box px={2} flex="1">
            <ScrollView>
                <Box py={1}/>
                <HStack justifyContent="center">
                    <PressableButton
                        numOfCol={numOfCol}
                        width={windowWidth/numOfCol*0.9}
                        height={windowWidth/numOfCol*0.9}
                        onPress={() => props.navigation.navigate('EvCharger')}
                        title="충전소 지도"
                    />
                    <PressableButton
                        numOfCol={numOfCol}
                        width={windowWidth/numOfCol*0.9}
                        height={windowWidth/numOfCol*0.9}
                        onPress={() => console.log('ㅇㅇ')}
                        title="충전 기록하기"
                    />
                </HStack>
                <HStack justifyContent="center">
                    <PressableButton
                        numOfCol={numOfCol}
                        width={windowWidth*0.92}
                        height={windowWidth/numOfCol*0.9}
                        onPress={() => console.log('ㅇㅇ')}
                        title="인근 충전소 찾기"
                    />
                </HStack>
                <Box py={1}/>
            </ScrollView>
        </Box>
    )
}

export default HomeContainer;