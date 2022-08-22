import { Box, Button, Divider, Heading, HStack, ScrollView, View } from "native-base"
import { useState } from "react";
import { StyleSheet } from "react-native";
import * as STATIONS from '../../api/STATIONS';

const AdvancedSearch = () => {
    const [selectedType, setSelectedType] = useState({ zcode: [], kind: [], kindDetail: [] });
    const [kindDetailToSelect, setKindDeatilToSelect] = useState([])

    const selectType = (type, selected) => {
        let select = selectedType[type];
        select.push(selected)
        setSelectedType({ ...selectedType, [type]: select })
    }

    const cancelSelect = (type, selected) => {
        let select = selectedType[type];
        select = select.filter(item => item !== selected)
        setSelectedType({ ...selectedType, [type]: select })
    }
    
    return (
        <View>
            <Heading style={styles.heading}>테마별 충전소 검색</Heading>

            <ScrollView style={styles.container}>
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
                        <View>
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
                <Button>검색</Button>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    heading: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: '#fff',
    },
    container: {
        margin: 5,
        marginBottom: 0,
        paddingHorizontal: 25,
        paddingTop: 20,
    },
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

export default AdvancedSearch;