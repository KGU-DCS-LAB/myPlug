import { Avatar, Box, Divider, HStack, Pressable, Spacer, Text, VStack } from "native-base"
import { Collapse, CollapseHeader, CollapseBody } from "accordion-collapse-react-native";
import LogTable from "../LogTable";
import * as STATIONS from '../../../app/api/STATIONS';

export default (props) => {


    const logStatistic = (stationLog) => {
        const day = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
        const defaultTimeLine = { "0": 0, "1": 0, "2": 0, "3": 0, "4": 0, "5": 0, "6": 0, "7": 0, "8": 0, "9": 0, "10": 0, "11": 0, "12": 0, "13": 0, "14": 0, "15": 0, "16": 0, "17": 0, "18": 0, "19": 0, "20": 0, "21": 0, "22": 0, "23": 0 }

        // 덧셈 해주는 로직이 필요함
        const sumNewLog = (newLog) => {
            for (let i = 0; i < day.length; i++) {
                for (let j = 0; j < 24; j++) {
                    if (parseInt(newLog[day[i]][j + ""]) > 0) {
                        // console.log(day[i], j)
                        logStat = {
                            ...logStat,
                            [day[i]]: {
                                ...logStat[day[i]],
                                [j]: parseInt(logStat[day[i]][j + ""]) + parseInt(newLog[day[i]][j + ""])
                            }
                        }
                    }
                }
            }
        }
        let logStat = {};
        day.map((d) => logStat[d] = defaultTimeLine);
        stationLog.map((log) => sumNewLog(log.logs))
        return logStat;
    }


    return (
        <Box>
            <Collapse>
                <CollapseHeader>
                    <Box pl="4" pr="5" py="2">
                        <HStack alignItems="center" space={3}>
                            <Avatar bg={STATIONS.statColor(props.charger.stat)}>
                                {STATIONS.statTextAvatar(props.charger.stat)}
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
                                    {STATIONS.statText(props.charger.stat) + " | "}
                                    {
                                        props.charger.lastTedt === null || props.charger.lastTsdt === null || props.charger.statUpdDt === null ?
                                            "알 수 없음"
                                            :
                                            (
                                                props.charger.stat == "3" ?
                                                    // 마지막 충전 종료일시 - 마지막 충전 시작일시 
                                                    secondsToHms((getMilliseconds(props.charger.lastTedt) - getMilliseconds(props.charger.lastTsdt)) / 1000) + " 째 충전중"
                                                    :
                                                    // 상태 갱신 일시
                                                    secondsToHms((new Date() - getMilliseconds(props.charger.statUpdDt)) / 1000) + " 전에 마지막으로 사용"
                                            )
                                    }
                                </Text>
                                <Text color="coolGray.600" _dark={{
                                    color: 'warmGray.200'
                                }}>
                                    {STATIONS.chargerType(props.charger.chgerType)}
                                </Text>
                                {/* {
                                        // 지금 이 부분에서 자꾸 버그 있음 <Text>로 감싸라고 난리
                                        (props.charger.output || props.charger.method) &&
                                        <Text color="coolGray.600" _dark={{
                                            color: 'warmGray.200'
                                        }}>
                                            {props.charger.output + "kW | "+props.charger.method}
                                        </Text>
                                    } */}
                            </VStack>
                            <Spacer />
                            <VStack>
                                <Text fontSize={24}>▿</Text>
                            </VStack>
                        </HStack>
                    </Box>
                </CollapseHeader>
                <CollapseBody>
                    <LogTable stationLog={logStatistic(props.stationLog)} />
                    <Divider />
                    {/* <Text>{JSON.stringify(props.stationLog)}</Text> */}
                </CollapseBody>
            </Collapse>
        </Box>
    )
}


const getMilliseconds = (t) => {
    if (t === null) {
        return ""
    }
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