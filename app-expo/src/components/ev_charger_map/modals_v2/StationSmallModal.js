import React, { useRef } from 'react'
// import { Text, View, Dimensions, StyleSheet, ScrollView } from 'react-native'
import { Alert, Dimensions, Pressable, ScrollView, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { Badge, Box, Button, Center, Heading, HStack, Spacer, Text, VStack } from "native-base";
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

    const isFocused = useIsFocused();
    const [favorites, setFavorites] = useState([]);

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
                                {props.station.statNm} ({props.station.statId})
                            </Heading>
                            <Spacer />
                        </HStack>

                        <HStack>

                        </HStack>
                        <HStack>
                            <VStack>
                                <Heading size="sm">{props.station.addr}</Heading>
                                <Text>{props.station.location}</Text>
                            </VStack>
                            <Spacer />
                        </HStack>
                        <Text>{props.station.useTime}</Text>
                        <Heading size="sm">충전기 상태</Heading>
                        <HStack space={1}>
                            {props.chargers.map((charger) => (
                                <Box
                                    key={charger._id}
                                    borderWidth="1"
                                    borderColor="coolGray.300"
                                    backgroundColor={statColor(charger.stat)}
                                    width={"5"}
                                >
                                    <Center>
                                        <Text>{charger.chgerId}</Text>
                                    </Center>
                                </Box>
                            ))}
                        </HStack>
                        <HStack mt={1}>
                            <Badge
                                colorScheme="blue"
                                _text={{
                                    color: "white"
                                }}
                                // key={tag}
                                variant="solid"
                                rounded="4"
                                mr="1"
                            >
                                {props.station.busiNm}
                            </Badge>
                            <Badge
                                colorScheme={props.station.parkingFree == "Y" ? "green" : "red"}
                                _text={{
                                    color: "white"
                                }}
                                // key={tag}
                                variant="solid"
                                rounded="4"
                                mr="1"
                            >
                                {props.station.parkingFree == "Y" ? "무료주차" : "유료주차"}
                            </Badge>
                            <Badge
                                colorScheme={props.station.limitYn == "Y" ? "red" : "green"}
                                _text={{
                                    color: "white"
                                }}
                                // key={tag}
                                variant="solid"
                                rounded="4"
                                mr="1"
                            >
                                {props.station.limitYn == "Y" ? ("이용 제한") : "누구나 사용가능"}
                            </Badge>
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

const statColor = (stat) => {
    // (1: 통신이상, 2: 충전대기, 3: 충전중, 4: 운영중지, 5: 점검중, 9: 상태미확인)
    switch (stat) {
        case "1":
            return "yellow.500";
        case "2":
            return "green.500";
        case "3":
            return "red.500";
        case "4":
            return "black.500";
        case "5":
            return "yellow.500";
        default:
            return "gray.300";
    }
}

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