import { Alert, Modal, Pressable, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View, Icon, ScrollViewBase } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { Button, Center, Flex, HStack, ScrollView } from "native-base";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import { useState } from "react";
import SliderCustomLabel from "./SliderCustomLabel";

const TIME = {  min: 0,  max: 24 }
const SliderPad = 12;

const textTransformerTimes = (value) => {
    return value === 0
      ? "12am"
      : (value < 13 ? value : value - 12) + (value < 12 ? "am" : "pm");
  };

const FilterModal = (props) => {
    const { min, max } = TIME;
    const [width, setWidth] = useState(280);
    const [selected, setSelected] = useState(null);

    if (!selected) {
        setSelected([min, max]); 
    }

    const onLayout = (event) => {
        setWidth(event.nativeEvent.layout.width - SliderPad * 2);
    };

    const onValuesChangeFinish = (values) => {
        setSelected(values);
    };

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
                                <View onLayout={onLayout} style={styles.wrapper}>
                                <Text>사용가능시간 범위 선택</Text>
                                    <MultiSlider
                                        min={min}
                                        max={max}
                                        allowOverlap
                                        values={selected}
                                        sliderLength={width}
                                        onValuesChangeFinish={onValuesChangeFinish}
                                        enableLabel={true}
                                        customLabel={SliderCustomLabel(textTransformerTimes)}
                                        trackStyle={{
                                            height: 7,
                                            borderRadius: 8,
                                        }}
                                        markerOffsetY={3}
                                        selectedStyle={{
                                            backgroundColor: "#895CDF",
                                        }}
                                        unselectedStyle={{
                                            backgroundColor: "#EEF3F7",
                                        }}
                                    />
                                </View>

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
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
      },
      wrapper: {
        flex: 1,
        width:"80%",
        margin: SliderPad * 2,
        
        justifyContent: "center",
        alignItems: "center",
      },
});