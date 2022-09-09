import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigationState } from "@react-navigation/native";
import { Box, Center, Divider, Heading, HStack, ScrollView, Spacer, Text, View } from "native-base";
import React, { useEffect, useState } from "react";
import { Pressable } from "react-native";
import { useSelector } from "react-redux";
import { sortStations } from "../../../app/api/STATIONS";
import { selectSelectedLogs, selectStations } from "../../../app/redux/map/mapSlice";
import ChargerCard from "../../../components/ev_charger_map/cards/ChargerCard";
import StationCard from "../../../components/ev_charger_map/cards/StationCard";
import FindFavorites from "../../../components/ev_charger_map/FindFavorites";
import LogTable from "../../../components/ev_charger_map/LogTable";
import LoadingSpinner from "../../../components/Loading/LoadingSpinner";

const StationInfoView = (props) => {

    const new_routes = useNavigationState(state => state.routes);
    const idx = new_routes?.findIndex(r => r.name === "EvChargerStationInfo");
    const selectedStation = new_routes[idx]?.params.selectedStation;
    const selectedChargers = new_routes[idx]?.params.selectedChargers;
    const stations = useSelector(selectStations);
    const stationLogs = useSelector(selectSelectedLogs);

    const findStationsLog = (chgerId) => {
        return stationLogs?.filter(item => item.chgerId === chgerId);
    }

    const logStatistic = (stationLog) => {
        const day = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
        const defaultTimeLine = { "0": 0, "1": 0, "2": 0, "3": 0, "4": 0, "5": 0, "6": 0, "7": 0, "8": 0, "9": 0, "10": 0, "11": 0, "12": 0, "13": 0, "14": 0, "15": 0, "16": 0, "17": 0, "18": 0, "19": 0, "20": 0, "21": 0, "22": 0, "23": 0 }

        // 덧셈 해주는 로직이 필요함
        const sumNewLog = (newLog) => {
            for (let i = 0; i < day.length; i++) {
                for (let j = 0; j < 24; j++) {
                    if (parseInt(newLog[day[i]][j + ""]) > 0) {
                        // console.log(day[i], j)
                        logStat = {
                            ...logStat,
                            [day[i]]: {
                                ...logStat[day[i]],
                                [j]: parseInt(logStat[day[i]][j + ""]) + parseInt(newLog[day[i]][j + ""])
                            }
                        }

                        //여기서 왜 logStat의 특정 요일만 업데이트 되는 것이 아닌, 전체 요일이 바뀌는지 모르겠음
                    }
                }
            }
        }
        let logStat = {};
        day.map((d) => logStat[d] = defaultTimeLine);
        stationLog?.map((log) => sumNewLog(log.logs))
        return logStat;
    }

    return (
        <>
            {
                <Box
                    style={{ flex: 1 }}
                    p={5}
                >
                    <View>
                        <Heading size="lg">{selectedStation?.statNm + " (" + selectedStation?.statId + ")"}</Heading>
                    </View>
                    <ScrollView
                        borderBottomColor={"gray.300"}
                        borderBottomWidth={2}
                    >
                        <Text fontSize="lg">{selectedStation?.addr}</Text>
                        <Text fontSize="md">{selectedStation?.location != "null" && selectedStation?.location}</Text>
                        <Divider mt={5} />

                        <Text fontSize="lg">이용가능시간</Text>
                        <Text fontSize="md">{selectedStation?.useTime}</Text>
                        <Divider />

                        <Text fontSize="lg">운영기관명</Text>
                        <Text fontSize="md">{"[" + selectedStation?.busiId + "] " + selectedStation?.bnm + " (" + selectedStation?.busiNm + ")"}</Text>
                        <Divider />

                        <Text fontSize="lg">운영기관 연락처</Text>
                        <Text fontSize="md">{selectedStation?.busiCall}</Text>
                        <Divider />

                        <Text fontSize="lg">주차료</Text>
                        <Text fontSize="md">{selectedStation?.parkingFree == "Y" ? "무료" : "유료"}</Text>
                        <Divider />

                        {
                            selectedStation?.note != null &&
                            <>
                                <Text fontSize="lg">충전소 안내</Text>
                                <Text fontSize="md">{selectedStation?.note}</Text>
                                <Divider />
                            </>
                        }

                        <Text fontSize="lg">이용자 제한</Text>
                        <Text fontSize="md">{selectedStation?.limitYn == "Y" ? ("이용 제한 (" + selectedStation?.limitDetail + ")") : "제한없음"}</Text>
                        <Divider />

                        <Heading size="md" mt={5}>충전소 사용 분석</Heading>
                        <LogTable stationLog={logStatistic(stationLogs)} />

                        <Divider mt={5} />

                        <Heading size="md" mt={5}>충전기 목록</Heading>
                        {selectedChargers?.map((charger) => (
                            <ChargerCard key={charger._id} charger={charger} stationLog={findStationsLog(charger.chgerId)} />
                        ))}
                        <Spacer />
                        <Divider mt={5} />

                        <Heading size="md" mt={5}>가까운 충전소 조회</Heading>
                        {
                            sortStations({ latitude: selectedStation?.lat, longitude: selectedStation?.lng }, stations)
                                .filter((station) => station.distance <= 300)
                                .map((station) => (
                                    <StationCard
                                        key={station.statId}
                                        station={station}
                                        onPress={() => props.navigation.navigate('EvCharger',{ //useEffect가 []으로 잡혀있어서 아무런 효과를 일으키지 못하고 있는 문제가 있음
                                            station:station
                                        })}
                                    />
                                ))
                        }
                        <Box mt={5} />

                    </ScrollView>
                    <Spacer />
                    <Center>
                        <HStack
                            mt="2"
                        >
                            <Pressable
                                onPress={() => props.navigation.goBack()}

                            >
                                <Box
                                    height="35"
                                    width="150"
                                    borderWidth="1"
                                    borderColor="coolGray.300"
                                    shadow="3"
                                    bg="red.500"
                                    px="5"
                                    rounded="8"
                                >
                                    <Center>
                                        <Heading size="md" color={"white"} py={1}>닫 기</Heading>
                                    </Center>
                                </Box>
                            </Pressable>
                            <FindFavorites statId={selectedStation?.statId} />
                        </HStack>
                    </Center>
                </Box>
            }
        </>
    )
}

export default React.memo(StationInfoView);