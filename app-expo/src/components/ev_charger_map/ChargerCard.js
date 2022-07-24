import { Avatar, Box, HStack, Pressable, Spacer, Text, VStack } from "native-base"
export default (props) => {
    return (
        <Box>
            <Pressable onPress={() => console.log('You touched me')} _dark={{
                bg: 'coolGray.800'
            }} _light={{
                bg: 'white'
            }}
                borderBottomColor={"gray.200"}
                borderBottomWidth={"1"}
            >
                <Box pl="4" pr="5" py="2">
                    <HStack alignItems="center" space={3}>
                        <Avatar bg={statColor(props.charger.stat)}>
                            {statTextAvatar(props.charger.stat)}
                        </Avatar>
                        <VStack>
                            <Text color="coolGray.800" _dark={{
                                color: 'warmGray.50'
                            }} bold>
                                {"충전기 번호 [" + props.charger.chgerId + "]"}
                            </Text>
                            <Text color="coolGray.600" _dark={{
                                color: 'warmGray.200'
                            }}>
                                {statText(props.charger.stat)}
                                {" | " + chargerType(props.charger.chgerType)}
                                {props.charger.output && " | " + props.charger.output+"kW"}
                                {props.charger.method && " | " + props.charger.method}
                            </Text>
                            <Text color="coolGray.600" _dark={{
                                color: 'warmGray.200'
                            }}>
                            </Text>
                        </VStack>
                        <Spacer />
                        <Text fontSize="xs" color="coolGray.800" _dark={{
                            color: 'warmGray.50'
                        }} alignSelf="flex-start">
                            {/* {props.charger.stat} */}
                        </Text>
                    </HStack>
                </Box>
            </Pressable>
        </Box>
    )
}

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

const statColor = (stat) => {
    // (1: 통신이상, 2: 충전대기, 3: 충전중, 4: 운영중지, 5: 점검중, 9: 상태미확인)
    switch (stat) {
        case "1":
            return "yellow.500";
        case "2":
            return "green.500";
        case "3":
            return "red.500";
        case "4":
            return "black.500";
        case "5":
            return "yellow.500";
        default:
            return "gray.300";
    }
}

const statTextAvatar = (stat) => {
        // (1: 통신이상, 2: 충전대기, 3: 충전중, 4: 운영중지, 5: 점검중, 9: 상태미확인)
    switch (stat) {
        case "1":
            return "이상";
        case "2":
            return "대기중";
        case "3":
            return "충전중";
        case "4":
            return "중단";
        case "5":
            return "점검중";
        default:
            return "미확인";
    }
}
const statText = (stat) => {
    // (1: 통신이상, 2: 충전대기, 3: 충전중, 4: 운영중지, 5: 점검중, 9: 상태미확인)
switch (stat) {
    case "1":
        return "통신이상";
    case "2":
        return "충전대기";
    case "3":
        return "충전중";
    case "4":
        return "운영중지";
    case "5":
        return "점검중";
    default:
        return "상태미확인";
}
}
