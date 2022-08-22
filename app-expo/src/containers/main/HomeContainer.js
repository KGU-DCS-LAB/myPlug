import React, { useState, useEffect } from 'react';
import { Box, Heading, HStack, Spacer, Text, View, Avatar } from "native-base";
import { Dimensions, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import PressableButton from "../../components/common/PressableButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FavoritesButton from '../../components/common/FavoritesButton';
import { useIsFocused } from '@react-navigation/native';
import { config } from '../../../config';
import axios from 'axios';

const HomeContainer = (props) => {
    const windowWidth = Dimensions.get('window').width;
    const colNum2 = 2;
    const colNum3 = 3;
    const isFocused = useIsFocused();
    const [user, setUser] = useState(false);

    const userCheck = async () => {
        if (await AsyncStorage.getItem('userInfo') != null) {
            props.navigation.navigate('MyPage')
        } else {
            props.navigation.navigate('Login')
        }
    }

    React.useEffect(() => {
        try {
            AsyncStorage.getItem('userInfo')
                .then(value => {
                    if (value != null) {
                        setUser(true);
                        // console.log("true");
                    } else {
                        setUser(false);
                        // console.log("false");
                    }
                }
                )
        } catch (error) {
            console.log(error);
        }

    }, [isFocused])


    return (
        <>
            <Box style={styles.headingBackground}>
                <HStack alignItems={"center"} px={5} py={2}>
                    <Heading>나만의 충전소</Heading>
                    <Spacer />
                    <TouchableOpacity onPress={() => userCheck()}>
                        <Avatar
                            height={8}
                            width={8}
                            source={{
                                uri: "https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png"
                            }}
                        />
                    </TouchableOpacity>
                </HStack>

            </Box>

            <Box px={2} flex="1" bg="white">
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
                            onPress={() => props.navigation.navigate('AdvancedSearch')}
                            title="테마별 충전소 검색"
                        />
                    </HStack>
                    <HStack justifyContent="center">
                        <PressableButton
                            numOfCol={colNum2}
                            width={windowWidth * 0.92}
                            height={windowWidth / colNum2 * 0.7}
                            onPress={() => props.navigation.navigate('example')}
                            title="나만의 필터링"
                        />
                    </HStack>
                    <HStack justifyContent="center">
                        {
                            user == true &&
                            <ScrollView horizontal={true}>
                                <FavoritesButton />
                            </ScrollView>
                        }

                    </HStack>
                    <HStack justifyContent="center">
                        <PressableButton
                            numOfCol={colNum2}
                            width={windowWidth / colNum2 * 0.9}
                            height={windowWidth / colNum2 * 0.9}
                            onPress={() => props.navigation.navigate('Schedule')}
                            title="충전 스케쥴 관리"
                        />
                        <PressableButton
                            numOfCol={colNum2}
                            width={windowWidth / colNum2 * 0.9}
                            height={windowWidth / colNum2 * 0.9}
                            onPress={() => props.navigation.navigate('MyCar')}
                            title="나의 자동차"
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
    headingBackground: {
        backgroundColor: '#fff',
    },
});