import React, { useState, useEffect } from 'react';
import { Alert, Modal, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { Box, Button, Center, HStack, Spacer, VStack } from "native-base";
import PressableButton from "../../common/PressableButton";
import { config } from '../../../../config';
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from '@react-navigation/native';
import FindFavorites from '../FindFavorites';

const StationSmallModal = (props) => {
    const [star, setStar] = useState('star-border');
    const [userId, setUserId] = useState('unknown');
    const isFocused = useIsFocused();
    const [favorites, setFavorites] = useState([]);

    React.useEffect(() => {
        try {
            AsyncStorage.getItem('userInfo')
                .then(value => {
                    if (value != null) {
                        const UserInfo = JSON.parse(value);
                        setUserId(UserInfo[0].user_id);
                    }
                }
                )
        } catch (error) {
            console.log(error);
        }
    }, []);

    return (
        <>
            {
                props.station
                &&
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={props.smallModalVisible}
                    onRequestClose={() => {
                        props.setSmallModalVisible(!props.smallModalVisible);
                    }}
                >
                    {/* <TouchableWithoutFeedback onPress={() => props.setSmallModalVisible(!props.smallModalVisible)}> */}
                        <View style={styles.flexEndView}>
                            <View style={styles.smallModalView}>
                                <ScrollView>
                                    <Text style={styles.modalText}>
                                        충전소명 : {props.station.statNm}({props.station.statId})
                                        <FindFavorites user_id={userId} statNm={props.station.statNm} />
                                    </Text>
                                    <Text>도로명 주소 : {props.station.addr}</Text>
                                    <Text>상세 위치 : {props.station.location}</Text>
                                    <Text>운영 시간 : {props.station.useTime}</Text>
                                    <Center>[[충전기 목록]]</Center>
                                    <HStack space={3} justifyContent="center">
                                        {props.chargers.map((charger) => (
                                            <Text key={charger._id}>[충전기{charger.chgerId}]</Text>
                                        ))}
                                    </HStack>
                                    {/* <Text>{JSON.stringify(props.chargers)}</Text> */}
                                </ScrollView>
                                <Center>
                                    <HStack>
                                        {/* <PressableButton
                                        title="닫 기"
                                        onPress={() => {
                                            props.setSmallModalVisible(!props.smallModalVisible);
                                        }}
                                    />
                                    <Spacer />
                                    <PressableButton
                                        title="상세보기"
                                        onPress={() => {
                                            props.setSmallModalVisible(!props.smallModalVisible);
                                            props.setBigModalVisible(!props.bigModalVisible);
                                        }}
                                    /> */}

                                        <Pressable
                                            onPress={() => {
                                                props.setSmallModalVisible(!props.smallModalVisible);
                                            }}
                                        >
                                            <Box
                                                width="150"
                                                borderWidth="1"
                                                borderColor="coolGray.300"
                                                shadow="3"
                                                bg="red.300"
                                                px="5"
                                                rounded="8"
                                            >
                                                <Center>
                                                    <Text>닫 기</Text>
                                                </Center>
                                            </Box>
                                        </Pressable>
                                        <Spacer />
                                        <Pressable
                                            onPress={() => {
                                                props.setSmallModalVisible(!props.smallModalVisible);
                                                props.setBigModalVisible(!props.bigModalVisible);
                                            }}

                                        >
                                            <Box
                                                width="150"
                                                borderWidth="1"
                                                borderColor="coolGray.300"
                                                shadow="3"
                                                bg="green.300"
                                                px="5"
                                                rounded="8"
                                            >
                                                <Center>
                                                    <Text>상세보기</Text>
                                                </Center>
                                            </Box>
                                        </Pressable>
                                    </HStack>
                                </Center>
                            </View>
                        </View>
                    {/* </TouchableWithoutFeedback> */}
                </Modal>
            }
        </>
    )
}

export default StationSmallModal;

const styles = StyleSheet.create({
    flexEndView: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end'
    },
    smallModalView: {
        height: 240,
        margin: 10,
        marginBottom: 20,
        backgroundColor: "white",
        borderRadius: 10,
        padding: 35,
        // alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
});