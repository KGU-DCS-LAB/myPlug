import { Center, HStack, ScrollView, Text, VStack } from "native-base"

export default (props) => {

    const day = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

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

    const TimeLine = (props) => {
        let render = [];
        for (let i = 0; i < 24; i++) {
            render.push(<Center h="5" w="5" bg="primary.300" rounded="md" shadow={3} key={i} />)
        }
        return (
            <Center>
                <HStack space={1} justifyContent="center">
                    <Text h="5" w="5" >{props.day}</Text>
                    {render}
                </HStack>
            </Center>
        )
    }

    return (
        <ScrollView horizontal={true}>
            <VStack space={1} alignItems="center">
                <TimeHeader />
                {day.map((d) => (
                    <TimeLine key={d} day={d}/>
                ))}
            </VStack>
        </ScrollView>
    )
}