import { Box, Button, Heading, HStack, Text, View } from "native-base";
import { StyleSheet } from "react-native";

const SelectLimitYn = (props) => {
    const limitYn = [
        {
            _id: 'Y',
            label: '이용제한'
        },
        {
            _id: 'N',
            label: '누구나 사용가능'
        }
    ]
    const type = 'limitYn';

    return (
        <>
            <Box my={1}>
                <Heading>이용자 제한</Heading>
            </Box>
            <HStack>
                {limitYn.map((item) =>
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

export default SelectLimitYn;