import { Heading, HStack, View } from "native-base"
import { StyleSheet } from "react-native";

export default () => {
    return (
        <View>
            <Heading style={styles.heading}>나의 자동차</Heading>

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