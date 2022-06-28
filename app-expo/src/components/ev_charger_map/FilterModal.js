import { Alert, Modal, Pressable, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View, Icon } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { Center, ScrollView } from "native-base";

const FilterModal = (props) => {
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
                        <TouchableWithoutFeedback
                            onPressOut={(e) => {
                                if (e.nativeEvent.locationY > 150) {
                                    props.setFilterModalVisible(false)
                                }
                            }}>
                            <View style={styles.bigModalView}>
                                <Center>
                                    <MaterialIcons name="drag-handle" size={40} color="black" />
                                </Center>
                                <Text>사용시간 범위 선택</Text>
                                {/* <ScrollView></ScrollView> */}

                                <View>
                                    <Pressable
                                        style={[styles.button, styles.buttonClose]}
                                        onPress={() => props.setFilterModalVisible(!props.filterModalVisible)}
                                    >
                                        <Text style={styles.textStyle}>Hide Modal</Text>
                                    </Pressable>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
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
});