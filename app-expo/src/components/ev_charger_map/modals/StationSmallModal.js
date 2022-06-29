import { Alert, Modal, Pressable, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';

const StationSmallModal = (props) => {
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
                                    <TouchableOpacity activeOpacity={0.8} onPress={() => console.log('ㅇㅇ')}>
                                        <MaterialIcons name={"star-border"} size={24} color={"black"} />
                                    </TouchableOpacity>
                                </Text>
                                <Text style={styles.modalTextAddress}>{props.station.addr}</Text>
                                <View>
                                    <Pressable
                                        style={[styles.button, styles.buttonClose]}
                                        onPress={() => {
                                            props.setSmallModalVisible(!props.smallModalVisible);
                                            props.setBigModalVisible(!props.bigModalVisible);
                                        }}
                                    >
                                        <Text style={styles.textStyle}>상세보기</Text>
                                    </Pressable>
                                </View>
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
});