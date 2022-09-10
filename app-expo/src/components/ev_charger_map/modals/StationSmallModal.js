import React, { useEffect, useRef } from 'react'
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
import { useDispatch, useSelector } from 'react-redux';
import { selectSelectedChargers, selectSelectedLogs, selectSelectedStation, selectSmallModalVisible, selectStatus, setSmallModalVisible } from '../../../app/redux/map/mapSlice';
import LoadingSpinner from '../../Loading/LoadingSpinner';

var screen = Dimensions.get('window')

const StationSmallModal = (props) => {

    const show = useRef()
    const isFocused = useIsFocused();

    const dispatch = useDispatch();
    const smallModalVisible = useSelector(selectSmallModalVisible);
    const status = useSelector(selectStatus);

    const selectedStation = useSelector(selectSelectedStation);
    const selectedChargers = useSelector(selectSelectedChargers);

    const [favorites, setFavorites] = useState([]);

    // useEffect(()=>{

    // },[selectedStation,selectedChargers]);

    return (
        <>
            {
                selectedStation &&
                <Modal
                    style={styles.flexEndView}
                    position='center'
                    backdrop={false}
                    ref={show}
                    isOpen={smallModalVisible}
                    onClosed={() => dispatch(setSmallModalVisible(false))}
                    position={"bottom"}
                    entry={"bottom"}
                    animationDuration={100}
                >
                    <View style={styles.smallModalView}>
                        {
                            status == "idle"
                                ?
                                <>
                                    <ScrollView>
                                        <HStack>
                                            <Heading size="md" isTruncated >
                                                {selectedStation.statNm} ({selectedStation.statId})
                                            </Heading>
                                            <Spacer />
                                        </HStack>

                                        <HStack>

                                        </HStack>
                                        <HStack>
                                            <VStack>
                                                <Heading size="sm">{selectedStation.addr}</Heading>
                                                <Text>{selectedStation.location}</Text>
                                            </VStack>
                                            <Spacer />
                                        </HStack>
                                        <Text>{selectedStation.useTime}</Text>
                                        <Divider my={1} />
                                        <HStack>
                                            <Heading size="sm">충전기 상태</Heading>
                                            <Spacer />
                                            <HStack space={1}>
                                                <Text>사용 {selectedStation.status && selectedStation.status.status3} |</Text>
                                                <Text>대기 {selectedStation.status && selectedStation.status.status2} |</Text>
                                                <Text>기타 {selectedStation.status && selectedStation.status.status1 + selectedStation.status.status4 + selectedStation.status.status5 + selectedStation.status.status9}</Text>
                                            </HStack>
                                        </HStack>
                                        <HStack space={1}>
                                            {selectedChargers?.map((charger) => (
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
                                                {"~" + selectedStation.distance + "m"}
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
                                                {STATIONS.kind(selectedStation.kind)}
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
                                                {STATIONS.kindDetail(selectedStation.kindDetail)}
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
                                                {selectedStation.busiNm}
                                            </Badge>
                                            <Badge
                                                colorScheme={selectedStation.parkingFree == "Y" ? "green" : "red"}
                                                _text={{
                                                    color: "white"
                                                }}
                                                // key={tag}
                                                variant="solid"
                                                rounded="4"
                                                mr="1"
                                            >
                                                {selectedStation.parkingFree == "Y" ? "무료주차" : "유료주차"}
                                            </Badge>
                                            <Badge
                                                colorScheme={selectedStation.limitYn == "Y" ? "red" : "green"}
                                                _text={{
                                                    color: "white"
                                                }}
                                                // key={tag}
                                                variant="solid"
                                                rounded="4"
                                                mr="1"
                                            >
                                                {selectedStation.limitYn == "Y" ? ("이용 제한") : "누구나 사용가능"}
                                            </Badge>
                                        </HStack>
                                    </ScrollView>
                                    <Center>
                                        <HStack>
                                            <Pressable
                                                onPress={() => {
                                                    dispatch(setSmallModalVisible(false));
                                                }}

                                            >
                                                <Box
                                                    height="35"
                                                    width="150"
                                                    borderWidth="1"
                                                    borderColor="coolGray.300"
                                                    shadow="3"
                                                    bg="red.500"
                                                    px="5"
                                                    mx="2"
                                                    rounded="8"
                                                >
                                                    <Center>
                                                        <Heading size="md" color={"white"} py={1}>닫 기</Heading>
                                                    </Center>
                                                </Box>
                                            </Pressable>
                                            <Pressable
                                                onPress={() => {
                                                    props.navigation.navigate("EvChargerStationInfo")
                                                }}
                                            >
                                                {({
                                                    isHovered,
                                                    isFocused,
                                                    isPressed
                                                }) => {
                                                    return (
                                                        <Box
                                                            height="35"
                                                            width="150"
                                                            borderWidth="1"
                                                            borderColor="coolGray.300"
                                                            shadow="3"
                                                            bg="green.500"
                                                            px="5"
                                                            mx="2"
                                                            rounded="8"
                                                        >
                                                            <Center>
                                                                <Heading size="md" color={"white"} py={1}>상세보기</Heading>
                                                            </Center>
                                                        </Box>
                                                    )
                                                }}
                                            </Pressable>
                                        </HStack>
                                    </Center>
                                </>
                                :
                                <LoadingSpinner description={status} />
                        }

                    </View>
                </Modal>

            }
        </>
    )
}

export default React.memo(StationSmallModal);



const styles = StyleSheet.create({
    flexEndView: {
        // flex: 1,
        height: 280,
        maxWidth: screen.width - 20,
        width: 400,
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