import { Alert, Modal, Pressable, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View, Icon, ScrollViewBase } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { Button, Center, Divider, Flex, HStack, ScrollView, VStack } from "native-base";
import { useEffect, useState } from "react";
import SelectBusiNm from "./filterModal/SelectBusiNm";
import * as API from "../../../app/api/API";
import * as STATIONS from '../../../app/api/STATIONS';
import AsyncStorage from "@react-native-async-storage/async-storage";
import OptionCard from "../../advancedSearch/card/OptionCard";
import { selectMapLocation, selectUserLocation, setStations } from "../../../app/redux/map/mapSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectFilterModalVisible, setFilterModalVisible } from "../../../app/redux/modal/modalSlice";

const FilterModal = (props) => {

    const dispatch = useDispatch();
    const filterModalVisible = useSelector(selectFilterModalVisible);

    const mapLocation = useSelector(selectMapLocation); // 현재 지도의 중심 위치
    const userLocation = useSelector(selectUserLocation); // 사용자의 실제 위치


    const [busiNm, setBusiNm] = useState([]); // 서버로 부터 받아온 충전소 회사 리스트
    const [selectedType, setSelectedType] = useState({ chgerType: [], parkingFree: [], busiNm: [], output: [], stat: [], limitYn: [], method: [] });
    const [user, setUser] = useState({})

    useEffect(() => {
        init();
        userCheck();
    }, [])

    const init = async () => {
        // getFilterRange(); //영업시간을 group으로 묶어 받아오기
        // group으로 묶은 결과 126개 데이터가 있어서 버튼을 생성하기 부적합하다고 생각 -> 0시, 1시, ... 으로 버튼 만들기로 함
        setBusiNm(await API.getBusiNmByKey("busiNm"));
    }

    const userCheck = async () => {
        if (await AsyncStorage.getItem('userInfo') != null) {
            const userInfo = JSON.parse(await AsyncStorage.getItem('userInfo'))[0]
            setUser(userInfo)
            setSelectedType(userInfo.filterData)
        }
    }

    const dataFiltering = async () => {
        console.log('ㅇㅇ')
        const receivedStationData = await API.getFilteredData(mapLocation, selectedType)
        const receivedChargerData = await API.getChargersByManyStation(receivedStationData.map((station) => station.statId))
        dispatch(setStations(STATIONS.countChargers(STATIONS.sortStations(userLocation, receivedStationData), receivedChargerData)));
        dispatch(setFilterModalVisible(false));
    }

    const saveFiltering = async () => {
        const userInfo = await API.saveFilterData(user.user_id, selectedType);
        await AsyncStorage.setItem('userInfo', JSON.stringify([userInfo]), () => { console.log('유저 정보 재저장') });
        dispatch(setFilterModalVisible(false));
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
                    visible={filterModalVisible}
                    onRequestClose={() => {
                        dispatch(setFilterModalVisible(false));
                    }}
                >
                    <View style={styles.flexEndView}>
                        <View style={styles.bigModalView}>
                            <TouchableWithoutFeedback
                                onPressOut={(e) => {
                                    if (e.nativeEvent.locationY > 20) {
                                        console.log(e.nativeEvent.locationY)
                                        dispatch(setFilterModalVisible(false))
                                    }
                                }}>
                                <View style={styles.modalCloseIcon}>
                                    <MaterialIcons name="drag-handle" size={40} color="black" />
                                </View>
                            </TouchableWithoutFeedback>

                            <ScrollView>
                                <View style={styles.wrapper}>
                                    <Text>{filterModalVisible}</Text>
                                    <OptionCard
                                        header={'무료 주차'}
                                        dataNm={'parkingFree'}
                                        data={STATIONS.parkingFree}
                                        selectedType={selectedType}
                                        selectType={selectType}
                                        cancelSelect={cancelSelect}
                                    />
                                    <Divider my="2" />
                                    <OptionCard
                                        header={'충전기 종류'}
                                        dataNm={'chgerType'}
                                        data={STATIONS.chgerType}
                                        selectedType={selectedType}
                                        selectType={selectType}
                                        cancelSelect={cancelSelect}
                                    />
                                    <Divider my="2" />
                                    <OptionCard
                                        header={'충전 용량'}
                                        dataNm={'output'}
                                        data={STATIONS.output}
                                        selectedType={selectedType}
                                        selectType={selectType}
                                        cancelSelect={cancelSelect}
                                    />
                                    <Divider my="2" />
                                    <OptionCard
                                        header={'충전 방식'}
                                        dataNm={'method'}
                                        data={STATIONS.method}
                                        selectedType={selectedType}
                                        selectType={selectType}
                                        cancelSelect={cancelSelect}
                                    />
                                    <Divider my="2" />
                                    <OptionCard
                                        header={'충전기 상태'}
                                        dataNm={'stat'}
                                        data={STATIONS.stat}
                                        selectedType={selectedType}
                                        selectType={selectType}
                                        cancelSelect={cancelSelect}
                                    />
                                    <Divider my="2" />
                                    <OptionCard
                                        header={'이용자 제한'}
                                        dataNm={'limitYn'}
                                        data={STATIONS.limitYn}
                                        selectedType={selectedType}
                                        selectType={selectType}
                                        cancelSelect={cancelSelect}
                                    />
                                    <Divider my="2" />
                                    <SelectBusiNm busiNm={busiNm} selectedType={selectedType} cancelSelect={cancelSelect} selectType={selectType} />
                                </View>
                            </ScrollView>
                            <HStack space={5}>
                                <Pressable
                                    style={[styles.button, styles.buttonClose]}
                                    onPress={() => dispatch(setFilterModalVisible(false))}
                                >
                                    <Text style={styles.textStyle}>닫 기</Text>
                                </Pressable>
                                {props.type === 'getFiltering' ?
                                    <Pressable
                                        style={[styles.button, styles.buttonClose]}
                                        onPress={() => dataFiltering()}
                                    >
                                        <Text style={styles.textStyle}>검 색</Text>
                                    </Pressable>
                                    :
                                    <Pressable
                                        style={[styles.button, styles.buttonClose]}
                                        onPress={() => saveFiltering()}
                                    >
                                        <Text style={styles.textStyle}>저 장</Text>
                                    </Pressable>
                                }
                            </HStack>
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
        marginHorizontal: 20
    },
    modalCloseIcon: {
        height: 50,
        elevation: 5
    }
});