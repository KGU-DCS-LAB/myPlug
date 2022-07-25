import { Box, Button, Heading, HStack, Text, View } from "native-base";
import { StyleSheet } from "react-native";

const SelectChgerType = (props) => {
    const chgerType = 'chgerType';
    return (
        <>
            <Box my={1}>
                <Heading>충전기 종류</Heading>
            </Box>
            <HStack>
                {props.chgerType.map((item) =>
                    props.selectedType[chgerType].findIndex((type) => type === item._id) !== -1 ?
                        <Button key={item._id} onPress={() => props.cancleSelect(chgerType, item._id)} style={styles.selectedButtom}>{item._id}</Button>
                        :
                        <Button style={styles.basicButton} key={item._id} onPress={() => props.selectType(chgerType, item._id)}>{item._id}</Button>
                )}
            </HStack></>
    )
}

const styles = StyleSheet.create({
    basicButton: {
        margin: 2,
        backgroundColor: "grey"
    },
    selectedButtom: {
        margin: 2,
    }
})

export default SelectChgerType;