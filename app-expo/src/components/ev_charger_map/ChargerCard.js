import { Avatar, Box, HStack, Pressable, Spacer, Text, VStack } from "native-base"
const chargerStat = (n) => {
    if (n == '1') { return "통신이상" }
    else if (n == '2') { return "충전대기" }
    else if (n == '3') { return "충전중" }
    else if (n == '4') { return "운영중지" }
    else if (n == '5') { return "점검중" }
    else if (n == '9') { return "상태미확인" }
    else { return "?" }
}

const chargerType = (n) => {
    if (n == '01') { return "DC차데모" }
    else if (n == '02') { return "AC완속" }
    else if (n == '03') { return "DC차데모+AC3상" }
    else if (n == '04') { return "DC콤보" }
    else if (n == '05') { return "DC차데모+DC콤보" }
    else if (n == '06') { return "DC차데모+AC3상+DC콤보" }
    else if (n == '07') { return "AC3상" }
    else { return "?" }
}
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