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
        return props.stationLogs.filter(item => item.chgerId === chgerId);
    }

    const logStatistic = (stationLog) => {
        const day = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
        const defaultTimeLine = { "0": 0, "1": 0, "2": 0, "3": 0, "4": 0, "5": 0, "6": 0, "7": 0, "8": 0, "9": 0, "10": 0, "11": 0, "12": 0, "13": 0, "14": 0, "15": 0, "16": 0, "17": 0, "18": 0, "19": 0, "20": 0, "21": 0, "22": 0, "23": 0 }
    
        // 덧셈 해주는 로직이 필요함
        const sumNewLog = (newLog) => {
            for(let i = 0 ; i < day.length; i++) {
                for(let j = 0 ; j < 24 ; j ++){
                    if(parseInt(newLog[day[i]][j+""])>0){
                        // console.log(day[i], j)
                        logStat = {
                            ...logStat,
                            [day[i]]:{
                                ...logStat[day[i]],
                                [j]:parseInt(logStat[day[i]][j+""])+parseInt(newLog[day[i]][j+""]) 
                            }
                        }
                        
                        //여기서 왜 logStat의 특정 요일만 업데이트 되는 것이 아닌, 전체 요일이 바뀌는지 모르겠음
                    }
                }
            }
        }
        let logStat = {};
        day.map((d)=>logStat[d]=defaultTimeLine);
        stationLog.map((log) => sumNewLog(log.logs))
        return logStat;
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

                            <Heading size="md" mt={5}>충전소 사용 분석</Heading>
                            <LogTable stationLog={logStatistic(props.stationLogs)} />

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