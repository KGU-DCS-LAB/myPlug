import { Box, Button, Heading, HStack, Text, View } from "native-base";
import { StyleSheet } from "react-native";

const SelectLimitYn = (props) => {
    const type = 'limitYn';

    return (
        <>
            <Box my={1}>
                <Heading>이용자 제한</Heading>
            </Box>
            <HStack>
                {
                    props.selectedType.limitYn.findIndex((type) => type === "Y") !== -1 ?
                        <Button onPress={() => props.cancelSelect(type, "Y")} style={styles.selectedButtom} >이용제한</Button>
                        :
                        <Button style={styles.basicButton} onPress={() => props.selectType(type, "Y")}>이용제한</Button>
                }
                {
                    props.selectedType.limitYn.findIndex((type) => type === "N") !== -1 ?
                        <Button onPress={() => props.cancelSelect(type, "N")} style={styles.selectedButtom} >누구나 사용가능</Button>
                        :
                        <Button style={styles.basicButton} onPress={() => props.selectType(type, "N")}>누구나 사용가능</Button>
                }
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

export default SelectLimitYn;