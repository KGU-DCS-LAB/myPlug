import { Box, Button, Heading, HStack, Text, View } from "native-base";
import { StyleSheet } from "react-native";

const SelectParkingFree = (props) => {
    const parkingFree = [
        {
            _id: 'Y',
            label: '무료'
        },
        {
            _id: 'N',
            label: '유료'
        }
    ]
    const type = 'parkingFree';

    return (
        <>
            <Box my={1}>
                <Heading>무료 주차</Heading>
            </Box>
            <HStack>
                {parkingFree.map((item) =>
                    props.selectedType[type].findIndex((type) => type === item._id) !== -1 ?
                        <Button key={item._id} onPress={() => props.cancelSelect(type, item._id)} style={styles.selectedButtom}>{item.label}</Button>
                        :
                        <Button style={styles.basicButton} key={item._id} onPress={() => props.selectType(type, item._id)}>{item.label}</Button>
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

export default SelectParkingFree;