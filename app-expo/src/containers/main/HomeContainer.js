import { Box, Heading, HStack, Spacer, Text } from "native-base";
import { Dimensions, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import PressableButton from "../../components/common/PressableButton";

const HomeContainer = (props) => {
    const windowWidth = Dimensions.get('window').width;
    const colNum2 = 2;
    const colNum3 = 3;
    return (
        <>
            <Heading style={styles.heading}>나만의 충전소</Heading>
            <Box px={2} flex="1">
                <ScrollView>
                    <Box py={1} />
                    <HStack justifyContent="center">
                        <PressableButton
                            numOfCol={colNum2}
                            width={windowWidth / colNum2 * 0.9}
                            height={windowWidth / colNum2 * 0.9}
                            onPress={() => props.navigation.navigate('EvCharger')}
                            title="충전소 지도"
                        />
                        <PressableButton
                            numOfCol={colNum2}
                            width={windowWidth / colNum2 * 0.9}
                            height={windowWidth / colNum2 * 0.9}
                            onPress={() => console.log('ㅇㅇ')}
                            title="충전 기록하기"
                        />
                    </HStack>
                    <HStack justifyContent="center">
                        <PressableButton
                            numOfCol={colNum2}
                            width={windowWidth * 0.92}
                            height={windowWidth / colNum2 * 0.7}
                            onPress={() => console.log('ㅇㅇ')}
                            title="인근 충전소 찾기"
                        />
                    </HStack>
                    <HStack justifyContent="center">
                        <PressableButton
                            numOfCol={colNum3}
                            width={windowWidth / colNum3 * 0.875}
                            height={windowWidth / colNum3 * 0.9}
                            onPress={() => console.log('ㅇㅇ')}
                            // title="충전 기록하기"
                        />
                        <PressableButton
                            numOfCol={colNum3}
                            width={windowWidth / colNum3 * 0.875}
                            height={windowWidth / colNum3 * 0.9}
                            onPress={() => console.log('ㅇㅇ')}
                            // title="충전 기록하기"
                        />
                        <PressableButton
                            numOfCol={colNum3}
                            width={windowWidth / colNum3 * 0.875}
                            height={windowWidth / colNum3 * 0.9}
                            onPress={() => console.log('ㅇㅇ')}
                            // title="충전 기록하기"
                        />
                    </HStack>
                    <HStack justifyContent="center">
                        <PressableButton
                            numOfCol={colNum2}
                            width={windowWidth / colNum2 * 0.9}
                            height={windowWidth / colNum2 * 0.9}
                            onPress={() => console.log('ㅇㅇ')}
                        />
                        <PressableButton
                            numOfCol={colNum2}
                            width={windowWidth / colNum2 * 0.9}
                            height={windowWidth / colNum2 * 0.9}
                            onPress={() => console.log('ㅇㅇ')}
                        />
                    </HStack>
                    <Box py={1} />
                </ScrollView>
            </Box>
        </>
    )
}

export default HomeContainer;

const styles = StyleSheet.create({
    heading: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: '#fff',
    },
});