import { Alert, Modal, Pressable, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View, Icon, ScrollViewBase } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { Box, Button, Center, Flex, Heading, HStack, ScrollView, Text} from "native-base";
import { useState } from "react";

const StationListModal = (props) => {

    return (
        <>
            {

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={props.stationListModalVisible}
                    onRequestClose={() => {
                        props.setStationListModalVisible(!props.stationListModalVisible);
                    }}
                >
                    <View style={styles.flexEndView}>
                        <View style={styles.bigModalView}>
                            <View>
                                <Box my={3}>
                                    <Heading>인근 충전소 목록으로 보기</Heading>
                                </Box>
                                <Text>{props.stations.length}개의 충전소를 로드했습니다.</Text>
                                <ScrollView>
                                    {
                                        props.stations.length < 0
                                            ?
                                            <><Text>근처에 충전소가 없습니다.</Text></>
                                            :
                                            props.stations.map((stations) => (
                                                <TouchableOpacity key={stations.statId} onPress={() => props.focusToStation(stations)}>
                                                    <Box
                                                        borderBottomWidth="1"
                                                        borderColor="coolGray.200"
                                                        p={1}
                                                    >
                                                        <Heading fontSize="md">{stations.statNm}</Heading>
                                                        <Text>{stations.useTime}</Text>
                                                        <Text>{stations.bnm}({stations.busiNm})</Text>
                                                        <Text>{stations.distance+"m"}</Text>
                                                    </Box>
                                                </TouchableOpacity>
                                                // <Text key={stations.statId}>{stations.statNm}</Text>
                                            ))
                                    }
                                </ScrollView>

                                <Box my={3}>
                                    <Pressable
                                        style={[styles.button, styles.buttonClose]}
                                        onPress={() => props.setStationListModalVisible(!props.stationListModalVisible)}
                                    >
                                        <Text style={styles.textStyle}>닫기</Text>
                                    </Pressable>

                                </Box>

                            </View>

                        </View>
                    </View>
                </Modal>
            }
        </>
    )
}

export default StationListModal;

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
        // padding: 35,
        alignItems: "center",
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
    modalCloseIcon: {
        height: 80,
        elevation: 5
    }
});