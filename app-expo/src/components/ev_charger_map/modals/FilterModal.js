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
    const chgerType = 'chgerType';
    const parkingFree = 'parkingFree';
    const busiNm = 'busiNm';

    const timeChanged = (value) => {
        console.log(value);
        setSelected(value);
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
                    <ScrollView>
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
                                {/* <TimeSlider selected={selected} timeChanged={timeChanged} /> */}

                                <View style={styles.wrapper}>
                                    <Text>충전기 종류</Text>
                                    <HStack>
                                        {props.chgerType.map((item) =>
                                            props.selectedType[chgerType].findIndex((type) => type === item._id) !== -1 ?
                                                <Button key={item._id} onPress={() => props.cancleSelect(chgerType, item._id)}>{item._id}</Button>
                                                :
                                                <Button style={{ backgroundColor: "grey" }} key={item._id} onPress={() => props.selectType(chgerType, item._id)}>{item._id}</Button>
                                        )}
                                    </HStack>
                                    <Text>주차무료</Text>
                                    <HStack>
                                        {
                                            props.selectedType[parkingFree].findIndex((type) => type === "무료") !== -1 ?
                                                <Button onPress={() => props.cancleSelect(parkingFree, item._id)}>무료</Button>
                                                :
                                                <Button style={{ backgroundColor: "grey" }} onPress={() => props.selectType(parkingFree, "Y")}>무료</Button>
                                        }
                                        {
                                            props.selectedType[parkingFree].findIndex((type) => type === "유료") !== -1 ?
                                                <Button onPress={() => props.cancleSelect(parkingFree, item._id)}>유료</Button>
                                                :
                                                <Button style={{ backgroundColor: "grey" }} onPress={() => props.selectType(parkingFree, "N")}>유료</Button>
                                        }
                                    </HStack>
                                    <Text>회사명</Text>
                                    <View style={styles.container}>
                                        {props.busiNm.map((item) =>
                                            props.selectedType[busiNm].findIndex((type) => type === item._id) !== -1 ?
                                                <Button key={item._id} onPress={() => props.cancleSelect(busiNm, item._id)}>{item._id}</Button>
                                                :
                                                <Button style={{ backgroundColor: "grey" }} key={item._id} onPress={() => props.selectType(busiNm, item._id)}>{item._id}</Button>
                                        )}
                                    </View>
                                </View>

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
                    </ScrollView>
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
        // width: "95%"
        // maxHeight: 3700,
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
        marginVertical:6
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"

    },
    wrapper: {
        flex: 1,
        width: "90%",
        justifyContent: "center",
        alignItems: "center",
    },
    modalCloseIcon: {
        height: 80,
        elevation: 5
    }
});