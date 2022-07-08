import React, { useState, useEffect } from 'react';
import { Alert, Modal, Pressable, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { Box, Button, HStack, Spacer } from "native-base";
import PressableButton from "../../common/PressableButton";
import { config } from '../../../../config';
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from '@react-navigation/native';
import FindFavorites from '../FindFavorites';

const StationSmallModal = (props) => {
    const [star, setStar] = useState('star-border');
    const [userId, setUserId] = useState('unknown');
    const isFocused = useIsFocused();
    const [favorites, setFavorites] = useState([]);
    
    React.useEffect(() => {
        try {
          AsyncStorage.getItem('userInfo')
            .then(value => {
              if (value != null) {
                const UserInfo = JSON.parse(value);
                setUserId(UserInfo[0].user_id);
              }
            }
            )
        } catch (error) {
          console.log(error);
        }
      }, []);

    return (
        <>
            {
                props.station
                &&
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={props.smallModalVisible}
                    onRequestClose={() => {
                        props.setSmallModalVisible(!props.smallModalVisible);
                    }}
                >
                    <TouchableWithoutFeedback onPress={() => props.setSmallModalVisible(!props.smallModalVisible)}>
                        <View style={styles.flexEndView}>
                            <View style={styles.smallModalView}>
                                <Text style={styles.modalText}>{props.station.statNm}
                                    <FindFavorites user_id={userId} statNm={props.station.statNm}/>
                                    {/* <TouchableOpacity activeOpacity={0.8} onPress={() => addToFavorites()}>
                                        <MaterialIcons name={star} size={24} color={"black"} />
                                    </TouchableOpacity> */}
                                </Text>
                                <Text>{props.station.addr}</Text>
                                <Text>[[충전기 목록]]</Text>
                                {props.chargers.map((charger)=>(
                                    <Text key={charger._id}>충전기 번호 : {charger.chgerId}</Text>
                                ))}
                                {/* <Text>{JSON.stringify(props.chargers)}</Text> */}
                                <HStack>
                                    <PressableButton
                                        title="닫 기"
                                        onPress={() => {
                                            props.setSmallModalVisible(!props.smallModalVisible);
                                        }}
                                    />
                                    <Spacer />
                                    <PressableButton
                                        title="상세보기"
                                        onPress={() => {
                                            props.setSmallModalVisible(!props.smallModalVisible);
                                            props.setBigModalVisible(!props.bigModalVisible);
                                        }}
                                    />
                                </HStack>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>
            }
        </>
    )
}

export default StationSmallModal;

const styles = StyleSheet.create({
    flexEndView: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end'
    },
    smallModalView: {
        height: 240,
        margin: 10,
        marginBottom: 20,
        backgroundColor: "white",
        borderRadius: 10,
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
});