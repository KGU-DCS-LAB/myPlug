import { Center, HStack, Pressable, ScrollView, Text, VStack } from "native-base"
import React, { useState } from "react";

const TimeTable = (props) => {


    const [table, setTable] = useState({
        "mon": { "0": 0, "1": 0, "2": 0, "3": 0, "4": 0, "5": 0, "6": 0, "7": 0, "8": 0, "9": 0, "10": 0, "11": 0, "12": 0, "13": 0, "14": 0, "15": 0, "16": 0, "17": 0, "18": 0, "19": 0, "20": 0, "21": 0, "22": 0, "23": 0, },
        "tue": { "0": 0, "1": 0, "2": 0, "3": 0, "4": 0, "5": 0, "6": 0, "7": 0, "8": 0, "9": 0, "10": 0, "11": 0, "12": 0, "13": 0, "14": 0, "15": 0, "16": 0, "17": 0, "18": 0, "19": 0, "20": 0, "21": 0, "22": 0, "23": 0, },
        "wed": { "0": 0, "1": 0, "2": 0, "3": 0, "4": 0, "5": 0, "6": 0, "7": 0, "8": 0, "9": 0, "10": 0, "11": 0, "12": 0, "13": 0, "14": 0, "15": 0, "16": 0, "17": 0, "18": 0, "19": 0, "20": 0, "21": 0, "22": 0, "23": 0, },
        "thu": { "0": 0, "1": 0, "2": 0, "3": 0, "4": 0, "5": 0, "6": 0, "7": 0, "8": 0, "9": 0, "10": 0, "11": 0, "12": 0, "13": 0, "14": 0, "15": 0, "16": 0, "17": 0, "18": 0, "19": 0, "20": 0, "21": 0, "22": 0, "23": 0, },
        "fri": { "0": 0, "1": 0, "2": 0, "3": 0, "4": 0, "5": 0, "6": 0, "7": 0, "8": 0, "9": 0, "10": 0, "11": 0, "12": 0, "13": 0, "14": 0, "15": 0, "16": 0, "17": 0, "18": 0, "19": 0, "20": 0, "21": 0, "22": 0, "23": 0, },
        "sat": { "0": 0, "1": 0, "2": 0, "3": 0, "4": 0, "5": 0, "6": 0, "7": 0, "8": 0, "9": 0, "10": 0, "11": 0, "12": 0, "13": 0, "14": 0, "15": 0, "16": 0, "17": 0, "18": 0, "19": 0, "20": 0, "21": 0, "22": 0, "23": 0, },
        "sun": { "0": 0, "1": 0, "2": 0, "3": 0, "4": 0, "5": 0, "6": 0, "7": 0, "8": 0, "9": 0, "10": 0, "11": 0, "12": 0, "13": 0, "14": 0, "15": 0, "16": 0, "17": 0, "18": 0, "19": 0, "20": 0, "21": 0, "22": 0, "23": 0, }
    })

    const day = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
    const koreanDay = { 'mon': '월', 'tue': '화', 'wed': '수', 'thu': '목', 'fri': '금', 'sat': '토', 'sun': '일' };

    const TimeHeader = () => {
        let render = [];
        for (let index = 0; index < 24; index++) {
            render.push(<Center h="10" w="10" key={index}><Text fontSize={22}>{index}</Text></Center>);
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
        const modifyTimeTableJSON = (day, i, value) => {
            var temp = { ...table };
            temp[day][i] = value;
            return temp;
        }
        let render = [];
        for (let i = 0; i < 24; i++) {
            if (table[day.day][i] === 0) {
                render.push(<Pressable key={i} onPress={() => setTable(modifyTimeTableJSON(day.day, i, 1))}><Center h="10" w="10" bg="primary.300" rounded="md" shadow={3} /></Pressable>)
            }
            else {
                render.push(<Pressable key={i} onPress={() => setTable(modifyTimeTableJSON(day.day, i, 0))}><Center h="10" w="10" bg="primary.700" rounded="md" shadow={3} /></Pressable>)
            }
        }
        return (
            <Center>
                <HStack space={1} justifyContent="center">
                    <Text h="10" w="10" fontSize={22}>{koreanDay[day.day]}</Text>
                    {render}
                </HStack>
            </Center>
        )
    }
    const MemoizedTimeLine = React.memo(TimeLine);

    return (
        <ScrollView horizontal={true}>
            <VStack space={1} alignItems="center" m={4}>
                <TimeHeader />
                {day.map((d) => (
                    <MemoizedTimeLine key={d} day={d} />
                ))}
            </VStack>
        </ScrollView>
    )
}

export default React.memo(TimeTable);