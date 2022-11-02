import { Button, Divider, Heading, ScrollView, Text, View } from "native-base";
import { StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import * as STATIONS from "../../app/api/STATIONS";
import { setSelectedStationInfo } from "../../app/redux/map/mapSlice";
import StationCard from "../ev_charger_map/cards/StationCard";
import LoadingSpinner from "../Loading/LoadingSpinner";
import OptionCard from "./card/OptionCard";

const AdvancedScrollView = ({ showList, searchedStations, selectedType, selectType, cancelSelect, navigation }) => {
    const dispatch = useDispatch();
    return (
        <ScrollView>
            {showList ?

                searchedStations.length === 0
                    ?
                    <LoadingSpinner description={"충전소를 검색하는 중입니다."} />
                    :
                    searchedStations.length < 0 ?
                        <><Text>검색된 충전소가 없습니다.</Text></>
                        :
                        <>
                            <WhatISelected selectedType={selectedType} />
                            {searchedStations.map((station) => (
                                <StationCard
                                    key={station.statId}
                                    station={station}
                                    // onPress={() => navigation.navigate('EvCharger',{
                                    //     station:station
                                    // })}
                                    onPress={() => {
                                        dispatch(setSelectedStationInfo(station.statId))
                                        navigation.navigate('EvCharger');
                                    }}
                                /> //props.focusToStation(station)
                            ))}
                        </>

                :
                <>
                    <OptionCard
                        header={'지역코드'}
                        dataNm={'zcode'}
                        data={STATIONS.zCode}
                        selectedType={selectedType}
                        selectType={selectType}
                        cancelSelect={cancelSelect}
                    />

                    <Divider my="2" />

                    <OptionCard
                        header={'충전소 구분 코드'}
                        dataNm={'kind'}
                        data={STATIONS.getKind}
                        selectedType={selectedType}
                        selectType={selectType}
                        cancelSelect={cancelSelect}
                    />

                    <Divider my="2" />

                    <Heading size="sm">충전소 구분 상세 코드</Heading>
                    {
                        selectedType["kind"].map((kind) =>
                            <View key={kind}>
                                <Heading size="xs">{kind}</Heading>
                                <View style={styles.options}>
                                    {STATIONS.getKindDetail[kind].map((item) =>
                                        selectedType["kindDetail"].findIndex((type) => type === item.value) !== -1 ?
                                            <Button key={item.value} onPress={() => cancelSelect("kindDetail", item.value)} style={styles.selectedButtom}>{item.label}</Button>
                                            :
                                            <Button style={styles.basicButton} key={item.value} onPress={() => selectType("kindDetail", item.value)}>{item.label}</Button>
                                    )}
                                </View>
                            </View>
                        )
                    }

                </>
            }
        </ScrollView>
    )
}

const WhatISelected = ({ selectedType }) => {
    return (
        <Text>
            {selectedType.zcode.length !== 0 ? <Text>{selectedType.zcode.map((z) => STATIONS.zCode.find((type) => type.value === z).label + '  ')}</Text> : null}

            {selectedType.zcode.length !== 0 && selectedType.kind.length !== 0 ? <Text>{">"}  </Text> : null}

            {selectedType["kind"].map((kind, index) =>
                <Text key={kind}>
                    {STATIONS.getKind.find((type) => type.value === kind).label + '  '}
                    {STATIONS.getKindDetail[kind].length !== 0 ? <Text>{">"}  </Text> : null}
                    <Text>
                        {selectedType["kindDetail"].map((item) =>
                            STATIONS.getKindDetail[kind].findIndex((type) => type.value === item) !== -1 ?
                                <Text>{STATIONS.getKindDetail[kind].find((type) => type.value === item).label + "  "}</Text> : null)}
                    </Text>
                    {index === selectedType["kind"].length - 1 ? null : <Text>/{"  "}</Text>}
                </Text>
            )}
        </Text>
    )
}

export default AdvancedScrollView;

const styles = StyleSheet.create({
    options: {
        flex: 1,
        flexWrap: "wrap",
        flexDirection: "row",
        justifyContent: "center",
        alignContent: "stretch"
    },
    basicButton: {
        margin: 2,
        backgroundColor: "grey"
    },
    selectedButtom: {
        margin: 2,
    }
});