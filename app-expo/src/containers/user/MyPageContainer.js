import { View, Button, Text, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import FilterModal from "../../components/ev_charger_map/modals/FilterModal";
import { Avatar, Box, Heading, HStack, Spacer } from "native-base";

const MyPageContainer = (props) => {
    // const [filterModalVisible, setFilterModalVisible] = useState(false)

    const logout = () => {
        AsyncStorage.removeItem('userInfo');
        props.navigation.navigate('Home')
    }

    return (
        <View>
            <Box bg="white">
                <HStack alignItems={"center"} px={5} py={2}>
                    <Heading>마이 페이지</Heading>
                </HStack>
            </Box>
            <Button
                title="홈으로"
                onPress={() => props.navigation.navigate('Home')}>홈으로</Button>
            <Button
                title="로그아웃"
                onPress={() => logout()}>로그아웃</Button>
            {/* <Button
                title="나만의 필터링"
                onPress={() => setFilterModalVisible(true)}>나만의 필터링</Button>
            <FilterModal
                filterModalVisible={filterModalVisible}
                setFilterModalVisible={setFilterModalVisible}
                type={'saveFilter'}
            /> */}
        </View>
    )
}
export default MyPageContainer;