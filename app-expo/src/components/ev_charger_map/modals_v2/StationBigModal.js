import { Dimensions, Pressable, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { Box, Center, Divider, Heading, HStack, ScrollView, Spacer, Text, VStack } from "native-base";
import { useEffect, useRef, useState } from "react";
import Modal from 'react-native-modalbox'
import AsyncStorage from "@react-native-async-storage/async-storage";
import ChargerCard from "../ChargerCard";
import LogTable from "../LogTable";


var screen = Dimensions.get('window');

const StationBigModal = (props) => {

    const [userId, setUserId] = useState(null);

    const show = useRef()

    const findStationsLog = (chgerId) => {
        const idx = props.stationLogs.findIndex((item, idx) =>{
            return item.chgerId === chgerId
        });
        // console.log(props.stationLogs[idx])
        return props.stationLogs[idx];
    }

    return (
        <>
            {
                props.station
                &&
                <Modal
                    style={styles.flexEndView}
                    position='center'
                    backdrop={true}
                    ref={show}
                    isOpen={props.isBigModalOpen}
                    onClosed={() => props.setBigModalOpen(false)}
                    position={"bottom"}
                    entry={"bottom"}
                    swipeToClose={false}
                >
                    <View style={{ flex: 1 }}>
                        <View>
                            <Heading size="lg">{props.station.statNm + "(" + props.station.statId + ")"}</Heading>
                        </View>
                        <ScrollView>
                            <Text fontSize="lg">{props.station.addr}</Text>
                            <Text fontSize="md">{props.station.location != "null" && props.station.location}</Text>
                            <Divider mt={5} />

                            <Text fontSize="lg">이용가능시간</Text>
                            <Text fontSize="md">{props.station.useTime}</Text>
                            <Divider />

                            <Text fontSize="lg">운영기관명</Text>
                            <Text fontSize="md">{"[" + props.station.busiId + "] " + props.station.bnm + " (" + props.station.busiNm + ")"}</Text>
                            <Divider />

                            <Text fontSize="lg">운영기관 연락처</Text>
                            <Text fontSize="md">{props.station.busiCall}</Text>
                            <Divider />

                            <Text fontSize="lg">주차료</Text>
                            <Text fontSize="md">{props.station.parkingFree == "Y" ? "무료" : "유료"}</Text>
                            <Divider />

                            {
                                props.station.note != null &&
                                <>
                                    <Text fontSize="lg">충전소 안내</Text>
                                    <Text fontSize="md">{props.station.note}</Text>
                                    <Divider />
                                </>
                            }

                            <Text fontSize="lg">이용자 제한</Text>
                            <Text fontSize="md">{props.station.limitYn == "Y" ? ("이용 제한 (" + props.station.limitDetail + ")") : "제한없음"}</Text>
                            <Divider />

                            {/* <Text>{JSON.stringify(props.stationLogs)}</Text> */}

                            <Heading size="md" mt={5}>충전소 사용 분석</Heading>
                            <LogTable/>
                            {/* <Text>{JSON.stringify(props.stationLogs.logs)}</Text> */}
                            <Divider mt={5} />

                            <Heading size="md" mt={5}>충전기 목록</Heading>
                            {props.chargers.map((charger) => (
                                <ChargerCard key={charger._id} charger={charger} stationLog = {findStationsLog(charger.chgerId)}/>
                            ))}
                            <Spacer />

                        </ScrollView>
                        <Spacer />
                        <Center>
                            <Pressable
                                onPress={() => props.setBigModalOpen(false)}

                            >
                                <Box
                                    height="30"
                                    width="150"
                                    borderWidth="1"
                                    borderColor="coolGray.300"
                                    shadow="3"
                                    bg="red.300"
                                    px="5"
                                    rounded="8"
                                >
                                    <Center>
                                        <Heading size="md">닫 기</Heading>
                                    </Center>
                                </Box>
                            </Pressable>
                        </Center>
                    </View>
                </Modal>
            }
        </>
    )
}

export default StationBigModal;

const styles = StyleSheet.create({
    flexEndView: {
        // flex: 1,
        height: screen.height - 40,
        width: screen.width - 20,
        // flexDirection: 'column',
        // justifyContent: 'flex-end',
        backgroundColor: "white",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        padding: 15,
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