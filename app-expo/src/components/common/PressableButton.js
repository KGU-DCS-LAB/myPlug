import { Box, Center, Pressable } from "native-base";
import { Text } from "react-native";

const PressableButton = (props) => {
    return (
        <Box alignItems="center" py="1" px="1">
            <Pressable onPress={props.onPress}>
                {({
                    isHovered,
                    isFocused,
                    isPressed
                }) => {
                    return (
                        <Box
                            minW={props.width}
                            minH={props.height}
                            borderWidth="1"
                            borderColor="coolGray.300"
                            shadow="3"
                            bg={isPressed ? "#E2E2E2" : isHovered ? "black" : "#FFFFFF"}
                            p="5"
                            rounded="8"
                            style={{
                                transform: [{
                                    scale: isPressed ? 0.96 : 1
                                }]
                            }}
                        >
                            <Center>
                                <Text>{props.title}</Text>
                            </Center>
                        </Box>
                    )
                }}
            </Pressable>
        </Box>
    )
}

export default PressableButton;