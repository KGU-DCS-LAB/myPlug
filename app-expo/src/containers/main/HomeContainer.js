import React, { useState, useEffect } from 'react';
import { Box, Heading, HStack, Spacer, Text, View, Avatar, useBreakpointValue } from "native-base";
import { Dimensions, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import PressableButton from "../../components/common/PressableButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from '@react-navigation/native';
import { config } from '../../../config';
import axios from 'axios';
import { MasonaryLayout } from '../../components/layout/MansonaryLayout';
import { getUserFavoriteStations } from '../../api/API';

const HomeContainer = (props) => {
    const isFocused = useIsFocused();
    const [bookmarked, setBookmarked] = useState([]);

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
                        const UserInfo = JSON.parse(value);
                        getFavorites(UserInfo[0]);
                    }
                }
                )
        } catch (error) {
            console.log(error);
        }

    }, [isFocused])

    const getFavorites = async (user) => {
        const favoriteStations = await getUserFavoriteStations(user);
        setBookmarked(favoriteStations);
    }

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

                    <MasonaryLayout
                        column={useBreakpointValue({
                            base: [1, 1],
                            sm: [1, 1],
                            md: [1, 1, 1],
                            // lg: [1, 1, 1, 1],
                            // xl: [1, 1, 1, 1, 1],
                        })}
                        _hStack={{
                            space: 4,
                            mb: 4,
                            // pt: '70px',
                        }}
                        _vStack={{ space: 4 }}
                    >
                        <PressableButton
                            key={0}
                            onPress={() => props.navigation.navigate('EvCharger')}
                            title="충전소 지도"
                        />
                        <PressableButton
                            key={1}
                            onPress={() => props.navigation.navigate('AdvancedSearch')}
                            title="테마별 충전소 검색"
                        />
                        <PressableButton
                            key={2}
                            onPress={() => props.navigation.navigate('example')}
                            title="나만의 필터링"
                        />
                        <PressableButton
                            key={3}
                            onPress={() => props.navigation.navigate('Schedule')}
                            title="충전 스케쥴 관리"
                        />
                        <PressableButton
                            key={4}
                            onPress={() => props.navigation.navigate('MyCar')}
                            title="나의 자동차"
                        />
                        <PressableButton
                            key={5}
                            onPress={() => props.navigation.navigate('example')}
                            title="테스트"
                        />
                        {
                            bookmarked.map((bookmark) =>
                                <PressableButton
                                    key={bookmark}
                                    onPress={() => console.log('ㅇㅇ')}
                                    title={bookmark}
                                />
                            )
                        }
                    </MasonaryLayout>
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