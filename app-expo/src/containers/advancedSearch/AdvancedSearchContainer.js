import { Heading, HStack, View } from "native-base"
import { StyleSheet } from "react-native";

const AdvancedSearch = () => {
    return (
        <View>
            <Heading style={styles.heading}>테마별 충전소 검색</Heading>

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

export default AdvancedSearch;