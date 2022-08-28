import { Center, HStack, ScrollView, Text, VStack } from "native-base"
import React from "react";

const TimeTable = (props) => {

    const day = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
    const koreanDay = {
        'mon':'월',
        'tue':'화',
        'wed':'수', 
        'thu':'목',
        'fri':'금', 
        'sat':'토', 
        'sun':'일'
    };

    const TimeHeader = () => {
        let render = [];
        for (let index = 0; index < 24; index++) {
            render.push(<Center h="10" w="10" key={index}><Text>{index}</Text></Center>);
        }
        return (
            <Center>
                <HStack space={1} justifyContent="center">
                    <Center h="10" w="10" ><Text></Text></Center>
                    {render}
                </HStack>
            </Center>
        );
    }

    const TimeLine = (day) => {
        let render = [];
        for (let i = 0; i < 24; i++) {
            render.push(<Center h="10" w="10" bg="primary.300" rounded="md" shadow={3} key={i} />)
        }
        return (
            <Center>
                <HStack space={1} justifyContent="center">
                    <Text h="10" w="10" >{koreanDay[day.day]}</Text>
                    {render}
                </HStack>
            </Center>
        )
    }

    return (
        <ScrollView horizontal={true}>
            <VStack space={1} alignItems="center" m={4}>
                <TimeHeader />
                {day.map((d) => (
                    <TimeLine key={d} day={d}/>
                ))}
            </VStack>
        </ScrollView>
    )
}

export default React.memo(TimeTable);