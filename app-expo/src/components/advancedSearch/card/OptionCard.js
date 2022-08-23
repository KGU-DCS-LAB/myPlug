import { Button, Heading, View } from "native-base";
import { StyleSheet } from "react-native";

const OptionCard = (props) => {
    return (
        <>
            <Heading size="sm">{props.header}</Heading>
            <View style={styles.options}>
                {props.data.map((item) =>
                    props.selectedType[props.dataNm].findIndex((type) => type === item.value) !== -1 ?
                        <Button key={item.value} onPress={() => props.cancelSelect(props.dataNm, item.value)} style={styles.selectedButtom}>{item.label}</Button>
                        :
                        <Button style={styles.basicButton} key={item.value} onPress={() => props.selectType(props.dataNm, item.value)}>{item.label}</Button>
                )}
            </View>
        </>

    )
}

export default OptionCard;

const styles = StyleSheet.create({
    options: {
        flex: 1,
        flexWrap: "wrap",
        flexDirection: "row",
        justifyContent: "center",
        alignContent: "stretch"
    },
    basicButton: {
        margin: 2,
        backgroundColor: "grey"
    },
    selectedButtom: {
        margin: 2,
    }
});