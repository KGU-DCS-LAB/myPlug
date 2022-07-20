import React, { useRef } from 'react'
// import { Text, View, Dimensions, StyleSheet, ScrollView } from 'react-native'
import { Alert, Dimensions, Pressable, ScrollView, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { Box, Button, Center, Heading, HStack, Spacer, Text, VStack } from "native-base";
import Modal from 'react-native-modalbox'
import { useState } from 'react'
import { config } from '../../../../config';
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from '@react-navigation/native';
import FindFavorites from '../FindFavorites';

var screen = Dimensions.get('window')

const StationSmallModal = (props) => {

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
                isOpen={props.isSmallModalOpen}
                onClosed={() => props.setSmallModalOpen(false)}
                position={"bottom"}
                entry={"bottom"}
            >
                <View style={styles.smallModalView}>
                    <ScrollView>
                        <HStack>
                            <Heading size="md" isTruncated >
                                {props.station.statNm}({props.station.statId})
                            </Heading>
                        </HStack>
                        <HStack>
                            <VStack>
                                <Heading size="sm">{props.station.addr}</Heading>
                                <Text>{props.station.location}</Text>
                            </VStack>
                            <Spacer />
                            <VStack py={1}>
                                <FindFavorites user_id={userId} statNm={props.station.statNm} />
                            </VStack>
                        </HStack>
                        <Text>운영 시간 : {props.station.useTime}</Text>
                        <Center>[[충전기 목록]]</Center>
                        <HStack space={1} justifyContent="center">
                            {props.chargers.map((charger) => (
                                <Text key={charger._id}>[충전기{charger.chgerId}]</Text>
                            ))}
                        </HStack>
                    </ScrollView>
                    <Center>
                        <HStack>
                            <Pressable
                                onPress={() => {
                                    // props.setBigModalVisible(!props.bigModalVisible);
                                    props.setSmallModalOpen(false);
                                }}

                            >
                                <Box
                                    height="30"
                                    width="150"
                                    borderWidth="1"
                                    borderColor="coolGray.300"
                                    shadow="3"
                                    bg="red.300"
                                    px="5"
                                    mx="2"
                                    rounded="8"
                                >
                                    <Center>
                                        <Heading size="md">닫 기</Heading>
                                    </Center>
                                </Box>
                            </Pressable>
                            <Pressable
                                onPress={() => {
                                    // props.setBigModalVisible(!props.bigModalVisible);
                                    props.setBigModalOpen(true);

                                }}

                            >
                                <Box
                                    height="30"
                                    width="150"
                                    borderWidth="1"
                                    borderColor="coolGray.300"
                                    shadow="3"
                                    bg="green.300"
                                    px="5"
                                    mx="2"
                                    rounded="8"
                                >
                                    <Center>
                                        <Heading size="md">상세보기</Heading>
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
        padding: 15,
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