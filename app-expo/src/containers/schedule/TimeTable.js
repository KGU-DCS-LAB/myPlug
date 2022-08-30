import { Center, HStack, Pressable, ScrollView, Text, VStack } from "native-base"
import React, { useState } from "react";

const TimeTable = (props) => {
    console.log('ㅇㅇ')

    const [table, setTable] = useState({
        "mon": { "0": 0, "1": 0, "2": 0, "3": 0, "4": 0, "5": 0, "6": 0, "7": 0, "8": 0, "9": 0, "10": 0, "11": 0, "12": 0, "13": 0, "14": 0, "15": 0, "16": 0, "17": 0, "18": 0, "19": 0, "20": 0, "21": 0, "22": 0, "23": 0, },
        "tue": { "0": 0, "1": 0, "2": 0, "3": 0, "4": 0, "5": 0, "6": 0, "7": 0, "8": 0, "9": 0, "10": 0, "11": 0, "12": 0, "13": 0, "14": 0, "15": 0, "16": 0, "17": 0, "18": 0, "19": 0, "20": 0, "21": 0, "22": 0, "23": 0, },
        "wed": { "0": 0, "1": 0, "2": 0, "3": 0, "4": 0, "5": 0, "6": 0, "7": 0, "8": 0, "9": 0, "10": 0, "11": 0, "12": 0, "13": 0, "14": 0, "15": 0, "16": 0, "17": 0, "18": 0, "19": 0, "20": 0, "21": 0, "22": 0, "23": 0, },
        "thu": { "0": 0, "1": 0, "2": 0, "3": 0, "4": 0, "5": 0, "6": 0, "7": 0, "8": 0, "9": 0, "10": 0, "11": 0, "12": 0, "13": 0, "14": 0, "15": 0, "16": 0, "17": 0, "18": 0, "19": 0, "20": 0, "21": 0, "22": 0, "23": 0, },
        "fri": { "0": 0, "1": 0, "2": 0, "3": 0, "4": 0, "5": 0, "6": 0, "7": 0, "8": 0, "9": 0, "10": 0, "11": 0, "12": 0, "13": 0, "14": 0, "15": 0, "16": 0, "17": 0, "18": 0, "19": 0, "20": 0, "21": 0, "22": 0, "23": 0, },
        "sat": { "0": 0, "1": 0, "2": 0, "3": 0, "4": 0, "5": 0, "6": 0, "7": 0, "8": 0, "9": 0, "10": 0, "11": 0, "12": 0, "13": 0, "14": 0, "15": 0, "16": 0, "17": 0, "18": 0, "19": 0, "20": 0, "21": 0, "22": 0, "23": 0, },
        "sun": { "0": 0, "1": 0, "2": 0, "3": 0, "4": 0, "5": 0, "6": 0, "7": 0, "8": 0, "9": 0, "10": 0, "11": 0, "12": 0, "13": 0, "14": 0, "15": 0, "16": 0, "17": 0, "18": 0, "19": 0, "20": 0, "21": 0, "22": 0, "23": 0, }
    })
    const zeros = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]
    const [mon, setMon] = useState(zeros)
    const [tue, setTue] = useState(zeros)
    const [wed, setWed] = useState(zeros)
    const [thu, setThu] = useState(zeros)
    const [fri, setFri] = useState(zeros)
    const [sat, setSat] = useState(zeros)
    const [sun, setSun] = useState(zeros)

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

    const TimeLine2 = (day) => {
        let render_mon = [];
        let render_tue = [];
        let render_wed = [];
        let render_thu = [];
        let render_fri = [];
        let render_sat = [];
        let render_sun = [];
        for (let i = 0; i < 24; i++) {
            if (mon[i] === 0) {
                render_mon.push(<Pressable key={i} onPress={() => setTable(modifyTimeTableJSON(day.day, i, 1))}><Center h="10" w="10" bg="primary.300" rounded="md" shadow={3} /></Pressable>)
            }
            else {
                render_mon.push(<Pressable key={i} onPress={() => setTable(modifyTimeTableJSON(day.day, i, 0))}><Center h="10" w="10" bg="primary.700" rounded="md" shadow={3} /></Pressable>)
            }
        }
        for (let i = 0; i < 24; i++) {
            if (tue[i] === 0) {
                render_tue.push(<Pressable key={i} onPress={() => setTable(modifyTimeTableJSON(day.day, i, 1))}><Center h="10" w="10" bg="primary.300" rounded="md" shadow={3} /></Pressable>)
            }
            else {
                render_tue.push(<Pressable key={i} onPress={() => setTable(modifyTimeTableJSON(day.day, i, 0))}><Center h="10" w="10" bg="primary.700" rounded="md" shadow={3} /></Pressable>)
            }
        }
        for (let i = 0; i < 24; i++) {
            if (wed[i] === 0) {
                render_wed.push(<Pressable key={i} onPress={() => setTable(modifyTimeTableJSON(day.day, i, 1))}><Center h="10" w="10" bg="primary.300" rounded="md" shadow={3} /></Pressable>)
            }
            else {
                render_wed.push(<Pressable key={i} onPress={() => setTable(modifyTimeTableJSON(day.day, i, 0))}><Center h="10" w="10" bg="primary.700" rounded="md" shadow={3} /></Pressable>)
            }
        }
        for (let i = 0; i < 24; i++) {
            if (thu[i] === 0) {
                render_thu.push(<Pressable key={i} onPress={() => setTable(modifyTimeTableJSON(day.day, i, 1))}><Center h="10" w="10" bg="primary.300" rounded="md" shadow={3} /></Pressable>)
            }
            else {
                render_thu.push(<Pressable key={i} onPress={() => setTable(modifyTimeTableJSON(day.day, i, 0))}><Center h="10" w="10" bg="primary.700" rounded="md" shadow={3} /></Pressable>)
            }
        }
        for (let i = 0; i < 24; i++) {
            if (fri[i] === 0) {
                render_fri.push(<Pressable key={i} onPress={() => setTable(modifyTimeTableJSON(day.day, i, 1))}><Center h="10" w="10" bg="primary.300" rounded="md" shadow={3} /></Pressable>)
            }
            else {
                render_fri.push(<Pressable key={i} onPress={() => setTable(modifyTimeTableJSON(day.day, i, 0))}><Center h="10" w="10" bg="primary.700" rounded="md" shadow={3} /></Pressable>)
            }
        }
        for (let i = 0; i < 24; i++) {
            if (sat[i] === 0) {
                render_sat.push(<Pressable key={i} onPress={() => setTable(modifyTimeTableJSON(day.day, i, 1))}><Center h="10" w="10" bg="primary.300" rounded="md" shadow={3} /></Pressable>)
            }
            else {
                render_sat.push(<Pressable key={i} onPress={() => setTable(modifyTimeTableJSON(day.day, i, 0))}><Center h="10" w="10" bg="primary.700" rounded="md" shadow={3} /></Pressable>)
            }
        }
        for (let i = 0; i < 24; i++) {
            if (sun[i] === 0) {
                render_sun.push(<Pressable key={i} onPress={() => setTable(modifyTimeTableJSON(day.day, i, 1))}><Center h="10" w="10" bg="primary.300" rounded="md" shadow={3} /></Pressable>)
            }
            else {
                render_sun.push(<Pressable key={i} onPress={() => setTable(modifyTimeTableJSON(day.day, i, 0))}><Center h="10" w="10" bg="primary.700" rounded="md" shadow={3} /></Pressable>)
            }
        }
        return (
            <>
                <Center>
                    <HStack space={1} justifyContent="center">
                        <Text h="10" w="10" fontSize={22}>{koreanDay['mon']}</Text>
                        {render_mon}
                    </HStack>
                </Center>
                <Center>
                    <HStack space={1} justifyContent="center">
                        <Text h="10" w="10" fontSize={22}>{koreanDay['tue']}</Text>
                        {render_tue}
                    </HStack>
                </Center>
                <Center>
                    <HStack space={1} justifyContent="center">
                        <Text h="10" w="10" fontSize={22}>{koreanDay['wed']}</Text>
                        {render_wed}
                    </HStack>
                </Center>
                <Center>
                    <HStack space={1} justifyContent="center">
                        <Text h="10" w="10" fontSize={22}>{koreanDay['thu']}</Text>
                        {render_thu}
                    </HStack>
                </Center>
                <Center>
                    <HStack space={1} justifyContent="center">
                        <Text h="10" w="10" fontSize={22}>{koreanDay['fri']}</Text>
                        {render_fri}
                    </HStack>
                </Center>
                <Center>
                    <HStack space={1} justifyContent="center">
                        <Text h="10" w="10" fontSize={22}>{koreanDay['sat']}</Text>
                        {render_sat}
                    </HStack>
                </Center>
                <Center>
                    <HStack space={1} justifyContent="center">
                        <Text h="10" w="10" fontSize={22}>{koreanDay['sun']}</Text>
                        {render_sun}
                    </HStack>
                </Center>

            </>

        )
    }
    const MemoizedTimeLine = React.memo(TimeLine);

    return (
        <ScrollView horizontal={true}>
            <VStack space={1} alignItems="center" m={4}>
                <TimeHeader />
                {/* {day.map((d) => (
                    <MemoizedTimeLine key={d} day={d} />
                ))} */}
                <TimeLine2 />
            </VStack>
        </ScrollView>
    )
}

export default React.memo(TimeTable);