import MultiSlider from "@ptomasroos/react-native-multi-slider";
import { Text, View } from "native-base";
import { useState } from "react";
import { StyleSheet } from "react-native";
import SliderCustomLabel from "./SliderCustomLabel";

const TIME = { min: 0, max: 24 }
const SliderPad = 12;

const textTransformerTimes = (value) => {
    return value === 0
        ? "12am"
        : (value < 13 ? value : value - 12) + (value < 12 ? "am" : "pm");
};

const TimeSlider = () => {
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
    )
}

export default TimeSlider;

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        width: "80%",
        margin: SliderPad * 2,

        justifyContent: "center",
        alignItems: "center",
    },
})