import { Box, HStack, Text } from "native-base";
import { StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import PressableButton from "../../components/common/PressableButton";

const HomeContainer = (props) => {
    return (
        <>
            <HStack space={2} justifyContent="center">
                <PressableButton
                    width="100%"
                />
                <PressableButton
                    width="100%"
                />
            </HStack>
        </>
    )
}

export default HomeContainer;

const styles = StyleSheet.create({

    CardTitle: {
        width: '100%',
        fontWeight: 'bold',
        fontSize: 15,
        padding: 3
    },
    CardContent: {
        width: '100%',
        fontSize: 12,
        padding: 3
    },
});