import { Button, HStack, VStack } from "native-base";
import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { mapStyles } from "../../../app/api/GOOGLEMAP";
import { selectThemeModalVisible, setThemeModalVisible } from "../../../app/redux/modal/modalSlice";

const ThemeModal = (props) => {

    const dispatch = useDispatch();
    const themeModalVisible = useSelector(selectThemeModalVisible);

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={themeModalVisible}
            onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                dispatch(setThemeModalVisible(false));
            }}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <VStack space={2} my={2}>
                        <HStack space={2}>
                            <Button onPress={()=>props.setMapStyle(mapStyles('light'))}>light</Button>
                            <Button onPress={()=>props.setMapStyle(mapStyles('silver'))}>silver</Button>
                            <Button onPress={()=>props.setMapStyle(mapStyles('retro'))}>retro</Button>
                        </HStack>
                        <HStack space={2}>
                            <Button onPress={()=>props.setMapStyle(mapStyles('dark'))}>dark</Button>
                            <Button onPress={()=>props.setMapStyle(mapStyles('night'))}>night</Button>
                            <Button onPress={()=>props.setMapStyle(mapStyles('aubergine'))}>aubergine</Button>
                        </HStack>
                    </VStack>
                    <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => dispatch(setThemeModalVisible(false))}
                    >
                        <Text style={styles.textStyle}>Hide Modal</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
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
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
});

export default ThemeModal;