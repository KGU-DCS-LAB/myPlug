import { Box, Button, Heading, HStack, Text, View } from "native-base";
import { StyleSheet } from "react-native";

const SelectOutput = (props) => {
    '3', '7', '50', '100', '200'
    const output = [
        {
            _id: '3',
            label: '3kW'
        },
        {
            _id: '7',
            label: '7kW'
        },
        {
            _id: '50',
            label: '50kW'
        },
        {
            _id: '100',
            label: '100kW'
        },
        {
            _id: '200',
            label: '200kW'
        },
    ]
    const type = 'output';
    return (
        <>
            <Box my={1}>
                <Heading>충전 용량</Heading>
            </Box>
            <HStack>
                {output.map((item) =>
                    props.selectedType[type].findIndex((type) => type === item._id) !== -1 ?
                        <Button key={item._id} onPress={() => props.cancelSelect(type, item._id)} style={styles.selectedButtom}>{item.label}</Button>
                        :
                        <Button style={styles.basicButton} key={item._id} onPress={() => props.selectType(type, item._id)}>{item.label}</Button>
                )}
            </HStack>
        </>
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

export default SelectOutput;