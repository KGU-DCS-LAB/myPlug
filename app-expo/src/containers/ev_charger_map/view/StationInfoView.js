export default (props) => {
    return (
        <>
            {/* <View style={{ flex: 1 }}>
                <View>
                    <Heading size="lg">{props.selectedStation.statNm + " (" + props.selectedStation.statId + ")"}</Heading>
                </View>
                <ScrollView>
                    <Text fontSize="lg">{props.selectedStation.addr}</Text>
                    <Text fontSize="md">{props.selectedStation.location != "null" && props.selectedStation.location}</Text>
                    <Divider mt={5} />

                    <Text fontSize="lg">이용가능시간</Text>
                    <Text fontSize="md">{props.selectedStation.useTime}</Text>
                    <Divider />

                    <Text fontSize="lg">운영기관명</Text>
                    <Text fontSize="md">{"[" + props.selectedStation.busiId + "] " + props.selectedStation.bnm + " (" + props.selectedStation.busiNm + ")"}</Text>
                    <Divider />

                    <Text fontSize="lg">운영기관 연락처</Text>
                    <Text fontSize="md">{props.selectedStation.busiCall}</Text>
                    <Divider />

                    <Text fontSize="lg">주차료</Text>
                    <Text fontSize="md">{props.selectedStation.parkingFree == "Y" ? "무료" : "유료"}</Text>
                    <Divider />

                    {
                        props.selectedStation.note != null &&
                        <>
                            <Text fontSize="lg">충전소 안내</Text>
                            <Text fontSize="md">{props.selectedStation.note}</Text>
                            <Divider />
                        </>
                    }

                    <Text fontSize="lg">이용자 제한</Text>
                    <Text fontSize="md">{props.selectedStation.limitYn == "Y" ? ("이용 제한 (" + props.selectedStation.limitDetail + ")") : "제한없음"}</Text>
                    <Divider />

                    <Heading size="md" mt={5}>충전소 사용 분석</Heading>
                    <LogTable stationLog={logStatistic(props.stationLogs)} />

                    <Divider mt={5} />

                    <Heading size="md" mt={5}>충전기 목록</Heading>
                    {props.selectedChargers.map((charger) => (
                        <ChargerCard key={charger._id} charger={charger} stationLog={findStationsLog(charger.chgerId)} />
                    ))}
                    <Spacer />
                    <Divider mt={5} />

                    <Heading size="md" mt={5}>가까운 충전소 조회</Heading>
                    {
                        sortStations({ latitude: props.selectedStation.lat, longitude: props.selectedStation.lng }, props.stations)
                            .filter((station) => station.distance <= 300)
                            .map((station) => (
                                <StationCard
                                    key={station.statId}
                                    station={station}
                                    onPress={() => props.focusToStation(station)}
                                />
                            ))
                    }
                    <Box mt={5} />

                </ScrollView>
                <Spacer />
                <Center>
                    <HStack>
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
                        <FindFavorites user_id={userId} statId={props.selectedStation.statId} />
                    </HStack>
                </Center>
            </View> */}
        </>
    )
}