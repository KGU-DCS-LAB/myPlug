import { Box, Button, Heading, HStack, Text, View } from "native-base";
import { StyleSheet } from "react-native";

const SelectChgerType = (props) => {
    const chgerType = [
        {
            _id: '01',
            label: 'DC차데모'
        },
        {
            _id: '02',
            label: 'AC완속'
        },
        {
            _id: '03',
            label: 'DC차데모+AC3상'
        },
        {
            _id: '04',
            label: 'DC콤보'
        },
        {
            _id: '05',
            label: 'DC차데모+DC콤보'
        },
        {
            _id: '06',
            label: 'DC차데모+AC3상+DC콤보'
        },
        {
            _id: '07',
            label: 'AC3상'
        },
    ]
    const type = 'chgerType';
    return (
        <>
            <Box my={1}>
                <Heading>충전기 종류</Heading>
            </Box>
            <View style={styles.container}>
                {chgerType.map((item) =>
                    props.selectedType[type].findIndex((type) => type === item._id) !== -1 ?
                        <Button key={item._id} onPress={() => props.cancelSelect(type, item._id)} style={styles.selectedButtom}>{item.label}</Button>
                        :
                        <Button style={styles.basicButton} key={item._id} onPress={() => props.selectType(type, item._id)}>{item.label}</Button>
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
})

export default SelectChgerType;