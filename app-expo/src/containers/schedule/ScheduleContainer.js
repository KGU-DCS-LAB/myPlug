import { Box, Heading, HStack, Text, View } from "native-base"
import { ScrollView, StyleSheet } from "react-native";
import TimeTable from "./TimeTable";

export default () => {
    return (
        <View style={{ flex: 1 }}>
            <Heading style={styles.heading}>충전 일정 관리</Heading>
            <Box bg={"white"}>
                <ScrollView>
                    <TimeTable/>
                </ScrollView>
            </Box>
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