import { Modal, Pressable, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { Box, ScrollView, Spacer, Text } from "native-base";


const StationBigModal = (props) => {
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
                                            <Text>{charger.chgerType}</Text>
                                            <Text>{charger.stat}</Text>
                                            <Text>{charger.statUpdDt}</Text>
                                            <Text>작업하다 말음... 여기서 부터 더 보여줘야함</Text>
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