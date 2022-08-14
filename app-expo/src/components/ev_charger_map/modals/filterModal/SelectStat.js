import { Box, Button, Heading, HStack, Text, View } from "native-base";
import { StyleSheet } from "react-native";

const SelectStat = (props) => {
    const stat = [
        {
            _id: '1',
            label: '통신이상'
        },
        {
            _id: '2',
            label: '충전대기'
        },
        {
            _id: '3',
            label: '충전 중'
        },
        {
            _id: '4',
            label: '운영중지'
        },
        {
            _id: '5',
            label: '점검 중'
        },
        {
            _id: '9',
            label: '상태미확인'
        },
    ]

    const type = 'stat';

    return (
        <>
            <Box my={1}>
                <Heading>충전기 상태</Heading>
            </Box>
            <View style={styles.container}>
                {stat.map((item) =>
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

export default SelectStat;