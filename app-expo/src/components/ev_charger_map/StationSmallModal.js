import { Modal, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";


const StationSmallModal = (props) => {
    return (
        <>
            {
                props.station
                &&
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={props.modalVisible}
                    onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                        props.setModalVisible(!props.modalVisible);
                    }}
                >
                    <TouchableWithoutFeedback onPress={() => props.setModalVisible(!props.modalVisible)}>
                        <View style={styles.flexEndView}>
                            <View style={styles.smallModalView}>
                                <Text>{props.station.statNm}</Text>
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
});