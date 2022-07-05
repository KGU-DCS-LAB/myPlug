import { Alert, Modal, Pressable, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View, Icon, ScrollViewBase } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { Button, Center, Flex, HStack, ScrollView, VStack } from "native-base";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import { useState } from "react";
import SliderCustomLabel from "../SliderCustomLabel";
import TimeSlider from "../TimeSlider";
import axios from "axios";
import { config } from "../../../../config";

const FilterModal = (props) => {
    const [selected, setSelected] = useState([0, 24]);
    const [selectedType, setSelectedType] = useState([]);

    const timeChanged = (value) => {
        console.log(value);
        setSelected(value);
    }

    const selectType = (type) => {
        setSelectedType([ ...selectedType, type ])
    }
    const cancleSelect = (type) => {
        setSelectedType(selectedType.filter((item) => item !== type))
    }

    const dataFiltering = () => {
        axios.post(config.ip + ':5000/stationsRouter/filterStations', {
            data: {
                min: selected[0],
                max: selected[1],
                types: selectedType
            }
        }).then((response) => {
            console.log(response);
            props.setFilteredChargingStations(response.data);
        }).catch(function (error) {
            console.log(error);
        })
    }

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
                                    if (e.nativeEvent.locationY > 150) {
                                        console.log(e.nativeEvent.locationY)
                                        props.setFilterModalVisible(false)
                                    }
                                }}>
                                <View style={styles.modalCloseIcon}>
                                    <MaterialIcons name="drag-handle" size={40} color="black" />
                                </View>

                                {/* <TimeSlider />

                                <View>
                                    <Pressable
                                        style={[styles.button, styles.buttonClose]}
                                        onPress={() => props.setFilterModalVisible(!props.filterModalVisible)}
                                    >
                                        <Text style={styles.textStyle}>Hide Modal</Text>
                                    </Pressable>
                                </View> */}
                            </TouchableWithoutFeedback>
                            <TimeSlider selected={selected} timeChanged={timeChanged} />

                            <Text>충전기 종류</Text>
                            <HStack>
                            {props.chgerType.map((item) => 
                            selectedType.findIndex((type) => type === item._id) !== -1 ? 
                            <Button key={item._id} onPress={() => cancleSelect(item._id)}>{item._id}</Button>
                             : 
                            <Button style={{backgroundColor: "grey"}} key={item._id} onPress={() => selectType(item._id)}>{item._id}</Button>
                            // console.log(selectedType.findIndex((type) => type === item._id))
                            )}
                            </HStack>

                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => dataFiltering()}
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