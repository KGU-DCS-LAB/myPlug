import { Box, Pressable } from "native-base";

const PressableButton = (props) => {
    return (
        <Box alignItems="center" py="1" px="1">
            <Pressable onPress={()=>console.log('나 눌렸다')}>
                {({
                    isHovered,
                    isFocused,
                    isPressed
                }) => {
                    return (
                        <Box
                            maxW={props.width}
                            minW={props.width}
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
                        </Box>
                    )
                }}
            </Pressable>
        </Box>
    )
}

export default PressableButton;