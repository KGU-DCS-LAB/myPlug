import { Box, Button, Heading, Text, View } from "native-base";
import { StyleSheet } from "react-native";

const SelectBusiNm = (props) => {
    const busiNm = 'busiNm';

    return (
        <>
            <Box my={1}>
                <Heading>충전기 회사</Heading>
            </Box>
            <View style={styles.container}>
                {props.busiNm.map((item) =>
                    props.selectedType.busiNm.findIndex((type) => type === item._id) !== -1 ?
                        <Button key={item._id} onPress={() => props.cancleSelect(busiNm, item._id)} style={styles.selectedButtom} >{item._id}</Button>
                        :
                        <Button style={styles.basicButton} key={item._id} onPress={() => props.selectType(busiNm, item._id)}>{item._id}</Button>
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
        width: "95%"
    },
    basicButton: {
        margin: 2,
        backgroundColor: "grey"
    },
    selectedButtom: {
        margin: 2,
    }
});

export default SelectBusiNm;