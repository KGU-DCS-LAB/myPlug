import { Alert, Modal, Pressable, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View, Icon, ScrollViewBase } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { Avatar, Box, Button, Center, Flex, Heading, HStack, ScrollView, Spacer, Text, VStack } from "native-base";
import { useState } from "react";
import StationCard from "../cards/StationCard";
import { selectStationListModalVisible, setStationListModalVisible } from "../../../app/redux/map/mapSlice";
import { useDispatch, useSelector } from "react-redux";

const StationListModal = (props) => {

    const dispatch = useDispatch();
    const stationListModalVisible = useSelector(selectStationListModalVisible);

    return (
        <>
            {

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={stationListModalVisible}
                    onRequestClose={() => {
                        dispatch(setStationListModalVisible(false));
                    }}
                >
                    <View style={styles.flexEndView}>
                        <View style={styles.bigModalView}>
                            <View style={{ flex: 1 }}>
                                <HStack>
                                    <Heading>인근 충전소 목록으로 보기</Heading>
                                    <Spacer />
                                    {/* <Text>X</Text> */}
                                </HStack>
                                <Text>{props.stations.length}개의 충전소를 로드했습니다.</Text>
                                <ScrollView>
                                    {
                                        props.stations.length < 0
                                            ?
                                            <><Text>근처에 충전소가 없습니다.</Text></>
                                            :
                                            props.stations.map((station) => (
                                                <StationCard key={station.statId} station={station} onPress={()=>props.focusToStation(station)}/>
                                            ))
                                    }
                                </ScrollView>
                                <Box my={3}>
                                    <Pressable
                                        style={[styles.button, styles.buttonClose]}
                                        onPress={() => dispatch(setStationListModalVisible(false))}
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
        paddingHorizontal: 25,
        paddingTop: 20,
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