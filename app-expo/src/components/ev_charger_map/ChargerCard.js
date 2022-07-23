import { Avatar, Box, HStack, Pressable, Spacer, Text, VStack } from "native-base"

export default (props) => {
    return (
        <Box>
            <Pressable onPress={() => console.log('You touched me')} _dark={{
                bg: 'coolGray.800'
            }} _light={{
                bg: 'white'
            }}>
                <Box pl="4" pr="5" py="2">
                    <HStack alignItems="center" space={3}>
                        <Avatar size="48px" source={{
                            // uri: props.charger.avatarUrl
                        }} />
                        <VStack>
                            <Text color="coolGray.800" _dark={{
                                color: 'warmGray.50'
                            }} bold>
                                {props.charger.chgerId}
                            </Text>
                            <Text color="coolGray.600" _dark={{
                                color: 'warmGray.200'
                            }}>
                                {props.charger.chgerType}
                            </Text>
                        </VStack>
                        <Spacer />
                        <Text fontSize="xs" color="coolGray.800" _dark={{
                            color: 'warmGray.50'
                        }} alignSelf="flex-start">
                            {props.charger.stat}
                        </Text>
                    </HStack>
                </Box>
            </Pressable>
        </Box>
    )
}