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
                                {"충전기 " + props.charger.chgerId}
                            </Text>
                            <Text fontSize="xs" color="coolGray.800" _dark={{
                                color: 'warmGray.50'
                            }} alignSelf="flex-start">
                                {statText(props.charger.stat) + " | "}
                                {
                                    props.charger.stat == "3" ?
                                        // 마지막 충전 종료일시 - 마지막 충전 시작일시 
                                        secondsToHms((getMilliseconds(props.charger.lastTedt) - getMilliseconds(props.charger.lastTsdt)) / 1000) + " 째 충전중"
                                        :
                                        // 상태 갱신 일시
                                        secondsToHms((new Date() - getMilliseconds(props.charger.statUpdDt)) / 1000) + " 전에 마지막으로 사용"
                                }
                            </Text>
                            <Text color="coolGray.600" _dark={{
                                color: 'warmGray.200'
                            }}>
                                {chargerType(props.charger.chgerType)}
                            </Text>
                            {
                                (props.charger.output || props.charger.method) &&
                                <Text color="coolGray.600" _dark={{
                                    color: 'warmGray.200'
                                }}>
                                    {props.charger.output && props.charger.output + "kW"}
                                    {props.charger.method && " | " + props.charger.method}
                                </Text>
                            }
                        </VStack>
                        <Spacer />
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

const getMilliseconds = (t) => {
    const year = t.slice(0, 4);
    const month = t.slice(4, 6);
    const day = t.slice(6, 8);
    const hour = t.slice(8, 10);
    const minute = t.slice(10, 12);
    const second = t.slice(12, 14);
    const date = year + "-" + month + "-" + day + "T" + hour + ":" + minute + ":" + second
    // console.log(t)
    // console.log(date)
    // console.log((Date.parse(date)))
    // console.log(new Date(year,month-1,day,hour,minute,second).getTime())
    return (Number(new Date(year, month - 1, day, hour, minute, second).getTime()))
}

function secondsToHms(d) {
    // console.log(d)
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);

    if (h > 0) {
        return (h + "시간");
    }
    else if (m > 0) {
        return (m + "분");
    }
    else {
        return (s + "초");
    }

}