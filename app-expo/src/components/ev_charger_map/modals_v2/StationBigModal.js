import { Dimensions, Pressable, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { Box, Center, Heading, ScrollView, Spacer, Text } from "native-base";
import { useRef } from "react";
import Modal from 'react-native-modalbox'


var screen = Dimensions.get('window');

const StationBigModal = (props) => {

    const show = useRef()

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
                            <Heading>충전소 상세보기</Heading>
                        </View>
                        <ScrollView>

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