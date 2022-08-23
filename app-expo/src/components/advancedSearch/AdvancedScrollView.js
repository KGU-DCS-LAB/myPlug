import { Button, Divider, Heading, ScrollView, Text, View } from "native-base";
import { StyleSheet } from "react-native";
import * as STATIONS from "../../api/STATIONS";
import StationCard from "../ev_charger_map/cards/StationCard";

const AdvancedScrollView = ({ showList, searchedStations, selectedType, selectType, cancelSelect }) => {
    return (
        <ScrollView>
            {showList ?
                <>
                    {
                        searchedStations.length < 0
                            ?
                            <><Text>검색된 충전소가 없습니다.</Text></>
                            :
                            searchedStations.map((station) => (
                                <StationCard key={station.statId} station={station} onPress={() => console.log(station.statNm)} /> //props.focusToStation(station)
                            ))
                    }
                </>
                :
                <>
                    <Heading size="sm">지역코드</Heading>
                    <View style={styles.options}>
                        {STATIONS.zCode.map((item) =>
                            selectedType["zcode"].findIndex((type) => type === item.value) !== -1 ?
                                <Button key={item.value} onPress={() => cancelSelect("zcode", item.value)} style={styles.selectedButtom}>{item.label}</Button>
                                :
                                <Button style={styles.basicButton} key={item.value} onPress={() => selectType("zcode", item.value)}>{item.label}</Button>
                        )}
                    </View>
                    <Divider my="2" />
                    <Heading size="sm">충전소 구분 코드</Heading>
                    <View style={styles.options}>
                        {STATIONS.getKind.map((item) =>
                            selectedType["kind"].findIndex((type) => type === item.value) !== -1 ?
                                <Button key={item.value} onPress={() => cancelSelect("kind", item.value)} style={styles.selectedButtom}>{item.label}</Button>
                                :
                                <Button style={styles.basicButton} key={item.value} onPress={() => selectType("kind", item.value)}>{item.label}</Button>
                        )}
                    </View>
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