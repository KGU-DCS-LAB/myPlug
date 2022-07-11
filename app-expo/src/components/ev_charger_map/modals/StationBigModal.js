import { Modal, Pressable, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { Box, ScrollView, Spacer, Text } from "native-base";


const StationBigModal = (props) => {

    const chargerStat = (n) => {
        if (n == '1') { return "통신이상" }
        else if (n == '2') { return "충전대기" }
        else if (n == '3') { return "충전중" }
        else if (n == '4') { return "운영중지" }
        else if (n == '5') { return "점검중" }
        else if (n == '9') { return "상태미확인" }
        else { return "?" }
    }

    const chargerType = (n) => {
        if (n == '01') { return "DC차데모" }
        else if (n == '02') { return "AC완속" }
        else if (n == '03') { return "DC차데모+AC3상" }
        else if (n == '04') { return "DC콤보" }
        else if (n == '05') { return "DC차데모+DC콤보" }
        else if (n == '06') { return "DC차데모+AC3상+DC콤보" }
        else if (n == '07') { return "AC3상" }
        else { return "?" }            
    }

    return (
        <>
            {
                props.station
                &&
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={props.bigModalVisible}
                    onRequestClose={() => {
                        props.setBigModalVisible(!props.smallModalVisible);
                    }}
                >
                    <TouchableWithoutFeedback onPress={() => props.setBigModalVisible(!props.smallModalVisible)}>
                        <View style={styles.flexEndView}>
                            <View style={styles.bigModalView}>
                                {/* <Text>This is Big Modal</Text> */}
                                <Text style={styles.modalText}>{props.station.statNm + "(" + props.station.statId + ")"}</Text>
                                <Text>주소 : {props.station.addr}</Text>
                                <Text>상세주소 : {props.station.location}</Text>
                                <Text>이용시간 : {props.station.useTime}</Text>
                                <Text>사업자 코드? : {props.station.busiId}</Text>
                                <Text>사업자 이름? : {props.station.bnm}</Text>
                                <Text>사업자 이름 : {props.station.busiNm}</Text>
                                <Text>사업자 전화번호 : {props.station.busiCall}</Text>
                                <Text>주차무료여부 : {props.station.parkingFree}</Text>
                                <Text>추가설명 : {props.station.note}</Text>
                                <Text>제한사유 : {props.station.limitYn}</Text>
                                <Text>제한사유상세 : {props.station.limitDetail}</Text>
                                <Text>-------------------</Text>
                                <ScrollView>
                                    <Text>[[충전기 목록]]</Text>
                                    {props.chargers.map((charger) => (
                                        <Box key={charger._id}>
                                            <Text>[충전기{charger.chgerId}]</Text>
                                            <Text>충전기타입: {chargerType(charger.chgerType)}</Text>
                                            <Text>충전기상태: {chargerStat(charger.stat)}</Text>
                                            <Text>충전용량: {charger.output}kW</Text>
                                            <Text>충전방식: {charger.method}</Text>
                                            <Text>statUpdDt,lastTsdt,lastTedt,nowTsdt</Text>
                                        </Box>
                                    ))}

                                </ScrollView>
                                <Spacer />
                                <View>
                                    <Pressable
                                        style={[styles.button, styles.buttonClose]}
                                        onPress={() => props.setBigModalVisible(!props.bigModalVisible)}
                                    >
                                        <Text style={styles.textStyle}>Hide Modal</Text>
                                    </Pressable>
                                </View>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>
            }
        </>
    )
}

export default StationBigModal;

const styles = StyleSheet.create({
    flexEndView: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end'
    },
    bigModalView: {
        height: '95%',
        margin: 5,
        marginBottom: 0,
        backgroundColor: "white",
        borderRadius: 10,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        padding: 35,
        // alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    modalText: {
        marginBottom: 20,
        textAlign: "center",
        fontSize: 20,

    },
    modalTextAddress: {
        marginBottom: 28,
        textAlign: "center",
        fontSize: 15,

    },
    button: {
        borderRadius: 10,
        padding: 10,
        elevation: 2
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"

    },
});