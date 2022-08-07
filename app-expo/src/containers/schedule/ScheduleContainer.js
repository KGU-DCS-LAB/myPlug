import { Heading, HStack, View } from "native-base"
import { StyleSheet } from "react-native";

export default () => {
    return (
        <View>
            <Heading style={styles.heading}>충전 일정 등록하기</Heading>

        </View>
    )
}

const styles = StyleSheet.create({
    heading: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: '#fff',
    },
});