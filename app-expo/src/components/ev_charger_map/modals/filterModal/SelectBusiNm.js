import { Button, Text, View } from "native-base";
import { StyleSheet } from "react-native";

const SelectBusiNm = (props) => {
    const busiNm = 'busiNm';

    return (
        <>
            <Text>회사명</Text>
            <View style={styles.container}>
                {props.busiNm.map((item) =>
                    props.selectedType.busiNm.findIndex((type) => type === item._id) !== -1 ?
                        <Button key={item._id} onPress={() => props.cancleSelect(busiNm, item._id)}>{item._id}</Button>
                        :
                        <Button style={{ backgroundColor: "grey" }} key={item._id} onPress={() => props.selectType(busiNm, item._id)}>{item._id}</Button>
                )}
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexWrap: "wrap",
        flexDirection: "row",
        // width: "95%"
        // maxHeight: 3700,
    }
});

export default SelectBusiNm;