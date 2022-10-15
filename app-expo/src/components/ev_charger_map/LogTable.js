import { Center, HStack, ScrollView, Text, VStack } from "native-base"
import React from "react";

const LogTable = (props) => {
    const maxCount = props.maxCount ? props.maxCount : 1;
    const day = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
    const koreanDay = {
        'mon': '월',
        'tue': '화',
        'wed': '수',
        'thu': '목',
        'fri': '금',
        'sat': '토',
        'sun': '일'
    };

    const TimeHeader = () => {
        let render = [];
        for (let index = 0; index < 24; index++) {
            render.push(<Center h="5" w="5" key={index}><Text>{index}</Text></Center>);
        }
        return (
            <Center>
                <HStack space={1} justifyContent="center">
                    <Center h="5" w="5" ><Text></Text></Center>
                    {render}
                </HStack>
            </Center>
        );
    }

    const TimeLine = (day) => {
        let render = [];
        let logOfDay = props.stationLog[day.day];
        for (let i = 0; i < 24; i++) {
            if (parseInt(logOfDay[i + ""] / maxCount) === 0) {
                render.push(<Center h="5" w="5" bg="primary.50" rounded="md" shadow={3} key={i} />)
            }
            else if (parseInt(logOfDay[i + ""]/maxCount) === 1) {
                render.push(<Center h="5" w="5" bg="primary.100" rounded="md" shadow={3} key={i} />)
            }
            else if (parseInt(logOfDay[i + ""]/maxCount) === 2) {
                render.push(<Center h="5" w="5" bg="primary.200" rounded="md" shadow={3} key={i} />)
            }
            else if (parseInt(logOfDay[i + ""]/maxCount) === 3) {
                render.push(<Center h="5" w="5" bg="primary.300" rounded="md" shadow={3} key={i} />)
            }
            else if (parseInt(logOfDay[i + ""]/maxCount) === 4) {
                render.push(<Center h="5" w="5" bg="primary.500" rounded="md" shadow={3} key={i} />)
            }
            else {
                render.push(<Center h="5" w="5" bg="primary.700" rounded="md" shadow={3} key={i} />)
            }
        }
        return (
            <Center>
                <HStack space={1} justifyContent="center">
                    <Text h="5" w="5" >{koreanDay[day.day]}</Text>
                    {render}
                </HStack>
            </Center>
        )
    }

    return (
        <ScrollView horizontal={true}>
            <Text>{maxCount}</Text>
            <VStack space={1} alignItems="center" mb={2}>
                <TimeHeader />
                {day.map((d) => (
                    <TimeLine key={d} day={d} />
                ))}
            </VStack>
        </ScrollView>
    )
}

export default React.memo(LogTable);