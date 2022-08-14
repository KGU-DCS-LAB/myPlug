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
import * as API from "../../../api/API";
import { sortStations } from "../../../api/DISTANCE";
import SelectOutput from "./filterModal/SelectOutput";
import SelectStat from "./filterModal/SelectStat";
import SelectLimitYn from "./filterModal/SelectLimitYn";
import SelectMethod from "./filterModal/SelectMethod";

const FilterModal = (props) => {

    const [busiNm, setBusiNm] = useState([]); // 서버로 부터 받아온 충전소 회사 리스트
    const [selectedType, setSelectedType] = useState({ chgerType: [], parkingFree: [], busiNm: [], output:[], stat:[], limitYn:[], method:[] });



    useEffect(() => {
        init();
    }, [])

    const init = async () => {
        // getFilterRange(); //영업시간을 group으로 묶어 받아오기
        // group으로 묶은 결과 126개 데이터가 있어서 버튼을 생성하기 부적합하다고 생각 -> 0시, 1시, ... 으로 버튼 만들기로 함
        setBusiNm(await API.getBusiNmByKey("busiNm"));
    }


    const dataFiltering = async () => {
        // setIsFiltering(true);
        props.setChargingStations(sortStations(props.userLocation, await API.getFilteredData(props.mapLocation, selectedType)));
        props.setFilterModalVisible(false);
    }

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
                                    <SelectParkingFree selectedType={selectedType} cancelSelect={cancelSelect} selectType={selectType} />

                                    <SelectChgerType selectedType={selectedType} cancelSelect={cancelSelect} selectType={selectType} />

                                    <SelectOutput selectedType={selectedType} cancelSelect={cancelSelect} selectType={selectType} />

                                    <SelectMethod selectedType={selectedType} cancelSelect={cancelSelect} selectType={selectType} />

                                    <SelectStat selectedType={selectedType} cancelSelect={cancelSelect} selectType={selectType} />

                                    <SelectLimitYn selectedType={selectedType} cancelSelect={cancelSelect} selectType={selectType} />
                                    
                                    <SelectBusiNm busiNm={busiNm} selectedType={selectedType} cancelSelect={cancelSelect} selectType={selectType} />
                                </View>
                            </ScrollView>
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
        marginVertical: 6
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    wrapper: {
        // flex: 1,
        // height: '95%',
        alignItems: "center",
    },
    modalCloseIcon: {
        height: 50,
        elevation: 5
    }
});