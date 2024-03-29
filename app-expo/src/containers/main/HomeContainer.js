import React, { useState, useEffect, Fragment } from 'react';
import { Box, Heading, HStack, Spacer, Text, View, Avatar, useBreakpointValue } from "native-base";
import { Dimensions, Image, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { AntDesign, FontAwesome5, Foundation, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import PressableButton from "../../components/common/PressableButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from '@react-navigation/native';
import { config } from '../../../config';
import axios from 'axios';
import { MasonaryLayout } from '../../components/layout/MansonaryLayout';
import { getUserFavoriteStations } from '../../app/api/API';
import FilterModal from '../../components/ev_charger_map/modals/FilterModal';
import { setSelectedStation } from '../../app/redux/map/mapSlice';
import { useDispatch } from 'react-redux';
import { setFilterModalVisible } from '../../app/redux/modal/modalSlice';

const HomeContainer = (props) => {
    const dispatch = useDispatch();
    const isFocused = useIsFocused();
    const [user, setUser] = useState(null);
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
                        setUser(UserInfo[0]);
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
            <Box style={styles.headingBackground} borderBottomColor="gray.200" borderBottomWidth={1}>
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

            <Box px={2} flex="1" bg="light.50">
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
                            space: 2,
                            mb: 4,
                        }}
                        _vStack={{ space: 2 }}
                    >
                        <PressableButton
                            key={0}
                            icon={<Image
                                style={{ resizeMode: 'center', width: '80%', height: '80%' }}
                                source={require('../../../assets/home-map.png')}
                            />}
                            onPress={() => props.navigation.navigate('EvCharger')}
                            title="충전소 지도"
                        />
                        <PressableButton
                            key={1}
                            icon={<Image
                                style={{ resizeMode: 'center', width: '80%', height: '80%' }}
                                source={require('../../../assets/home-search.png')}
                            />}
                            onPress={() => props.navigation.navigate('AdvancedSearch')}
                            title="충전소 상세 검색"
                        />
                        <PressableButton
                            key={2}
                            icon={<Image
                                style={{ resizeMode: 'center', width: '80%', height: '80%' }}
                                source={require('../../../assets/home-filter.png')}
                            />}
                            onPress={() => user ? dispatch(setFilterModalVisible(true)) : console.log('로그인 안됨')}
                            title="나만의 필터링"
                        />
                        <PressableButton
                            key={3}
                            icon={<Image
                                style={{ resizeMode: 'center', width: '80%', height: '80%' }}
                                source={require('../../../assets/home-schedule.png')}
                            />}
                            onPress={() => user ? props.navigation.navigate('Schedule') : console.log('로그인 안됨')}
                            title="충전 일정 관리"
                        />
                        <PressableButton
                            key={4}
                            icon={<Image
                                style={{ resizeMode: 'center', width: '80%', height: '80%' }}
                                source={require('../../../assets/home-car.png')}
                            />}
                            onPress={() => user ? props.navigation.navigate('MyCar') : console.log('로그인 안됨')}
                            title="나의 자동차"
                        />

                        <PressableButton
                            key={5}
                            icon={<Image
                                style={{ resizeMode: 'center', width: '80%', height: '80%' }}
                                source={require('../../../assets/home-settings.png')}
                            />}
                            onPress={() => props.navigation.navigate('example')}
                            title="테스트"
                        />
                        {
                            bookmarked.map((bookmark) =>
                                <PressableButton
                                    key={bookmark.statId}
                                    icon={<Image
                                        style={{ resizeMode: 'center', width: '80%', height: '80%' }}
                                        source={require('../../../assets/home-charging-station.png')}
                                    />}
                                    onPress={() => {
                                        dispatch(setSelectedStation(bookmark))
                                        props.navigation.navigate('EvCharger')
                                    }}
                                    title={bookmark.statNm}
                                />
                            )
                        }
                    </MasonaryLayout>
                </ScrollView>
            </Box>

            <FilterModal
                type={'saveFilter'}
            />
        </>
    )
}

export default HomeContainer;

const styles = StyleSheet.create({
    headingBackground: {
        backgroundColor: '#fff',
    },
});