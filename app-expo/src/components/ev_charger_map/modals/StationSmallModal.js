import React, { useRef } from 'react'
// import { Text, View, Dimensions, StyleSheet, ScrollView } from 'react-native'
import { Alert, Dimensions, Pressable, ScrollView, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { Badge, Box, Button, Center, Divider, Heading, HStack, Spacer, Text, VStack } from "native-base";
import Modal from 'react-native-modalbox'
import { useState } from 'react'
import { config } from '../../../../config';
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from '@react-navigation/native';
import * as STATIONS from '../../../app/api/STATIONS';

var screen = Dimensions.get('window')

const StationSmallModal = (props) => {

    const show = useRef()

    const isFocused = useIsFocused();
    const [favorites, setFavorites] = useState([]);

    return (
        <>
            {
                props.selectedStation &&
                <Modal
                    style={styles.flexEndView}
                    position='center'
                    backdrop={false}
                    ref={show}
                    isOpen={props.isSmallModalOpen}
                    onClosed={() => props.setSmallModalOpen(false)}
                    position={"bottom"}
                    entry={"bottom"}
                    animationDuration={100}
                >
                    <View style={styles.smallModalView}>
                        <ScrollView>
                            <HStack>
                                <Heading size="md" isTruncated >
                                    {props.selectedStation.statNm} ({props.selectedStation.statId})
                                </Heading>
                                <Spacer />
                            </HStack>

                            <HStack>

                            </HStack>
                            <HStack>
                                <VStack>
                                    <Heading size="sm">{props.selectedStation.addr}</Heading>
                                    <Text>{props.selectedStation.location}</Text>
                                </VStack>
                                <Spacer />
                            </HStack>
                            <Text>{props.selectedStation.useTime}</Text>
                            <Divider my={1} />
                            <HStack>
                                <Heading size="sm">충전기 상태</Heading>
                                <Spacer />
                                <HStack space={1}>
                                    <Text>사용 {props.selectedStation.status && props.selectedStation.status.status3} |</Text>
                                    <Text>대기 {props.selectedStation.status && props.selectedStation.status.status2} |</Text>
                                    <Text>기타 {props.selectedStation.status && props.selectedStation.status.status1 + props.selectedStation.status.status4 + props.selectedStation.status.status5 + props.selectedStation.status.status9}</Text>
                                </HStack>
                            </HStack>
                            <HStack space={1}>
                                {props.selectedChargers.map((charger) => (
                                    <Box
                                        key={charger._id}
                                        borderWidth="1"
                                        borderColor="coolGray.300"
                                        backgroundColor={STATIONS.statColor(charger.stat)}
                                        width={"5"}
                                    >
                                        <Center>
                                            <Text>{charger.chgerId}</Text>
                                        </Center>
                                    </Box>
                                ))}
                            </HStack>
                            <Divider my={1} />
                            <HStack mt={1}>
                                <Badge
                                    colorScheme="gray"
                                    _text={{
                                        color: "white"
                                    }}
                                    // key={tag}
                                    variant="solid"
                                    rounded="4"
                                    mr="1"
                                >
                                    {"~" + props.selectedStation.distance + "m"}
                                </Badge>
                                <Badge
                                    colorScheme={"gray"}
                                    _text={{
                                        color: "white"
                                    }}
                                    variant="solid"
                                    rounded="4"
                                    mr="1"
                                >
                                    {STATIONS.kind(props.selectedStation.kind)}
                                </Badge>
                                <Badge
                                    colorScheme={"gray"}
                                    _text={{
                                        color: "white"
                                    }}
                                    variant="solid"
                                    rounded="4"
                                    mr="1"
                                >
                                    {STATIONS.kindDetail(props.selectedStation.kindDetail)}
                                </Badge>
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
                                    {props.selectedStation.busiNm}
                                </Badge>
                                <Badge
                                    colorScheme={props.selectedStation.parkingFree == "Y" ? "green" : "red"}
                                    _text={{
                                        color: "white"
                                    }}
                                    // key={tag}
                                    variant="solid"
                                    rounded="4"
                                    mr="1"
                                >
                                    {props.selectedStation.parkingFree == "Y" ? "무료주차" : "유료주차"}
                                </Badge>
                                <Badge
                                    colorScheme={props.selectedStation.limitYn == "Y" ? "red" : "green"}
                                    _text={{
                                        color: "white"
                                    }}
                                    // key={tag}
                                    variant="solid"
                                    rounded="4"
                                    mr="1"
                                >
                                    {props.selectedStation.limitYn == "Y" ? ("이용 제한") : "누구나 사용가능"}
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

            }
        </>
    )
}

export default StationSmallModal;



const styles = StyleSheet.create({
    flexEndView: {
        // flex: 1,
        height: 280,
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