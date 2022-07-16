import { Alert, Modal, Pressable, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View, Icon, ScrollViewBase } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { Box, Button, Center, Flex, Heading, HStack, ScrollView } from "native-base";
import { useState } from "react";

const StationListModal = (props) => {
    const lat1 = props.location.latitude;
    const lon1 = props.location.longitude;
    
    const sortDistance = () => {
        if ((lat1 == props.chargingStations.lat) && (lon1 == props.chargingStations.lng))
            return 0;

        var radLat1 = Math.PI * lat1 / 180;
        var radLat2 = Math.PI * props.chargingStations.lat / 180;
        var theta = lon1 - props.chargingStations.lng;
        var radTheta = Math.PI * theta / 180;
        var dist = Math.sin(radLat1) * Math.sin(radLat2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.cos(radTheta);
        if (dist > 1)
            dist = 1;

        dist = Math.acos(dist);
        dist = dist * 180 / Math.PI;
        dist = dist * 60 * 1.1515 * 1.609344 * 1000;
        if (dist < 100) dist = Math.round(dist / 10) * 10;
        else dist = Math.round(dist / 100) * 100;

        console.log('거리: '+dist);
        return dist;
    }

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
                                <Text>{props.chargingStations.length}개의 충전소를 로드했습니다.</Text>
                                <ScrollView>
                                    {
                                        props.chargingStations.length < 0
                                            ?
                                            <><Text>근처에 충전소가 없습니다.</Text></>
                                            :
                                            props.chargingStations.map((stations) => (
                                                <TouchableOpacity key={stations.statId} onPress={() => props.focuseToStation(stations)}>
                                                    <Box
                                                        borderBottomWidth="1"
                                                        borderColor="coolGray.200"
                                                        p={1}
                                                    >
                                                        <Text fontSize="md">{stations.statNm}</Text>
                                                        <Text>{stations.useTime}</Text>
                                                        <Text>{stations.busiNm}</Text>
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