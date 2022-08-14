import { Box, Button, Heading, HStack, Text, View } from "native-base";
import { StyleSheet } from "react-native";

const SelectMethod = (props) => {
    const method = [
        {
            _id: '단독',
            label: '단독 충전'
        },
        {
            _id: '동시',
            label: '동시 충전'
        }
    ]
    const type = 'method';
    return (
        <>
            <Box my={1}>
                <Heading>충전 방식</Heading>
            </Box>
            <HStack>
                {method.map((item) =>
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

export default SelectMethod;