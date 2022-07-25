import { Alert, Modal, Pressable, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View, Icon, ScrollViewBase } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { Button, Center, Flex, HStack, ScrollView, VStack } from "native-base";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import { useEffect, useState } from "react";
import SliderCustomLabel from "../SliderCustomLabel";
import TimeSlider from "../TimeSlider";
import axios from "axios";
import { config } from "../../../../config";
import SelectBusiNm from "./filterModal/SelectBusiNm";
import SelectParkingFree from "./filterModal/SelectParkingFree";
import SelectChgerType from "./filterModal/SelectChgerType";

const FilterModal = (props) => {
    useEffect(() => {
        console.log(props.selectedType)
    }, [props.selectedType])

    return (
        <>
            {
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={props.filterModalVisible}
                    onRequestClose={() => {
                        props.setFilterModalVisible(!props.filterModalVisible);
                    }}
                >
                    <View style={styles.flexEndView}>
                        <View style={styles.bigModalView}>
                            <TouchableWithoutFeedback
                                onPressOut={(e) => {
                                    if (e.nativeEvent.locationY > 20) {
                                        console.log(e.nativeEvent.locationY)
                                        props.setFilterModalVisible(false)
                                    }
                                }}>
                                <View style={styles.modalCloseIcon}>
                                    <MaterialIcons name="drag-handle" size={40} color="black" />
                                </View>
                            </TouchableWithoutFeedback>

                            <ScrollView>
                                <View style={styles.wrapper}>
                                    <SelectChgerType chgerType={props.chgerType} selectedType={props.selectedType} cancleSelect={props.cancleSelect} selectType={props.selectType} />

                                    <SelectParkingFree selectedType={props.selectedType} cancleSelect={props.cancleSelect} selectType={props.selectType} />

                                    <SelectBusiNm busiNm={props.busiNm} selectedType={props.selectedType} cancleSelect={props.cancleSelect} selectType={props.selectType} />
                                </View>
                            </ScrollView>
                            <Pressable
                                    style={[styles.button, styles.buttonClose]}
                                    onPress={() => props.dataFiltering()}
                                >
                                    <Text style={styles.textStyle}>검색</Text>
                                </Pressable>
                                <Pressable
                                    style={[styles.button, styles.buttonClose]}
                                    onPress={() => props.setFilterModalVisible(false)}
                                >
                                    <Text style={styles.textStyle}>Hide Modal</Text>
                                </Pressable>
                        </View>
                    </View>
                </Modal>
            }
        </>
    )
}

export default FilterModal;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexWrap: "wrap",
        flexDirection: "row",
        // width:"95%"
        // ma xHeight: 3700,
    },
    flexEndView: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end'
    },
    bigModalView: {
        // height: '95%',
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
        marginVertical: 6
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    wrapper: {
        flex: 1,
        // height: '95%',
        alignItems: "center",
    },
    modalCloseIcon: {
        height: 50,
        elevation: 5
    }
});