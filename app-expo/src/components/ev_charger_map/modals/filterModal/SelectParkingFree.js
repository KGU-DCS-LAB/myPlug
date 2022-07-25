import { Box, Button, Heading, HStack, Text, View } from "native-base";
import { StyleSheet } from "react-native";

const SelectParkingFree = (props) => {
    const parkingFree = 'parkingFree';

    return (
        <>
            <Box my={1}>
                <Heading>무료 주차</Heading>
            </Box>
            <HStack>
                {
                    props.selectedType.parkingFree.findIndex((type) => type === "Y") !== -1 ?
                        <Button onPress={() => props.cancleSelect(parkingFree, "Y")} style={styles.selectedButtom} >무료</Button>
                        :
                        <Button style={styles.basicButton} onPress={() => props.selectType(parkingFree, "Y")}>무료</Button>
                }
                {
                    props.selectedType.parkingFree.findIndex((type) => type === "N") !== -1 ?
                        <Button onPress={() => props.cancleSelect(parkingFree, "N")} style={styles.selectedButtom} >유료</Button>
                        :
                        <Button style={styles.basicButton} onPress={() => props.selectType(parkingFree, "N")}>유료</Button>
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

export default SelectParkingFree;