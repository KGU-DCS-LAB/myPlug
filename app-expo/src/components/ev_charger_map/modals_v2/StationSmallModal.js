import React, { useRef } from 'react'
// import { Text, View, Dimensions, StyleSheet, ScrollView } from 'react-native'
import { Alert, Dimensions, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { Box, Button, Center, HStack, Spacer, VStack } from "native-base";
import Modal from 'react-native-modalbox'
import { useState } from 'react'
import { config } from '../../../../config';
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from '@react-navigation/native';
import FindFavorites from '../FindFavorites';

var screen = Dimensions.get('window')

const StationSmallModal = (props) => {

    var screen = Dimensions.get('window');
    const show = useRef()

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
            <Modal
                style={styles.flexEndView}
                position='center'
                backdrop={true}
                ref={show}
                isOpen={props.isOpen}
                onClosed={() => props.setOpen(false)}
                position={"bottom"}
                entry={"bottom"}
            >
                {/* <View style={styles.flexEndView}> */}
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
                    </ScrollView>
                    <Center>
                        <HStack>
                            <Pressable
                                onPress={() => {
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
            </Modal>
        </>
    )
}

export default StationSmallModal;

const styles = StyleSheet.create({
    flexEndView: {
        // flex: 1,
        height: 240,
        width: screen.width - 20,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        backgroundColor: "white",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,

    },
});