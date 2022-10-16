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
        const render = [];
        for (let index = 0; index < 24; index++) {
            render[render.length] = <Center h="5" w="5" key={index}><Text>{index}</Text></Center>;
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
        const render = [];
        const logOfDay = props.stationLog[day.day];
        for (let i = 0; i < 24; i++) {
            const level = parseInt(logOfDay[i + ""] / maxCount);
            let num = 0;
            if (level === 0) {
                num = 50;
            }
            else if (level === 1) {
                num = 100;
            }
            else if (level === 2) {
                num = 200;
            }
            else if (level === 3) {
                num = 300;
            }
            else if (level === 4) {
                num = 500;
            }
            else {
                num = 700;
            }
            render[render.length] = <Center h="5" w="5" bg={"primary." + num} rounded="md" shadow={3} key={i} />;
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