import { AspectRatio, Box, Center, Heading, Pressable, Spacer, Text, VStack } from "native-base";
import { Image } from "react-native";

const PressableButton = (props) => {
    return (
        <Pressable onPress={props.onPress}>
            {({
                isHovered,
                isFocused,
                isPressed
            }) => {
                return (
                    <AspectRatio width="100%" ratio={{
                        base: 1 / 1,
                        // md: 16 / 9
                    }}>
                        <Box
                            shadow="1"
                            bg={isPressed ? "indigo.50" : isHovered ? "black" : "white"}
                            p="5"
                            rounded="20"
                            style={{
                                transform: [{
                                    scale: isPressed ? 0.96 : 1
                                }]
                            }}
                        >
                            <VStack style={{ height: '100%' }}>
                                <Text fontSize={"xl"} textAlign="center">{props.title}</Text>
                                <Center>
                                    {props.icon}
                                </Center>
                            </VStack>
                        </Box>
                    </AspectRatio>
                )
            }}
        </Pressable>
    )
}

export default PressableButton;