import { Center, HStack, ScrollView, Text, VStack } from "native-base"

export default (props) => {
    const TimeHeader = () => {
        let render=[];
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

    return (
        <ScrollView horizontal={true}>
            <VStack space={1} alignItems="center">
                <TimeHeader/>
                <Center>
                    <HStack space={1} justifyContent="center">
                        <Text h="5" w="5" >월</Text>
                        <Center h="5" w="5" bg="primary.300" rounded="md" shadow={3} />
                        <Center h="5" w="5" bg="primary.500" rounded="md" shadow={3} />
                        <Center h="5" w="5" bg="primary.700" rounded="md" shadow={3} />
                        <Center h="5" w="5" bg="primary.300" rounded="md" shadow={3} />
                        <Center h="5" w="5" bg="primary.500" rounded="md" shadow={3} />
                        <Center h="5" w="5" bg="primary.700" rounded="md" shadow={3} />
                        <Center h="5" w="5" bg="primary.300" rounded="md" shadow={3} />
                        <Center h="5" w="5" bg="primary.500" rounded="md" shadow={3} />
                        <Center h="5" w="5" bg="primary.700" rounded="md" shadow={3} />
                        <Center h="5" w="5" bg="primary.300" rounded="md" shadow={3} />
                        <Center h="5" w="5" bg="primary.500" rounded="md" shadow={3} />
                        <Center h="5" w="5" bg="primary.700" rounded="md" shadow={3} />
                        <Center h="5" w="5" bg="primary.300" rounded="md" shadow={3} />
                        <Center h="5" w="5" bg="primary.500" rounded="md" shadow={3} />
                        <Center h="5" w="5" bg="primary.700" rounded="md" shadow={3} />
                        <Center h="5" w="5" bg="primary.300" rounded="md" shadow={3} />
                        <Center h="5" w="5" bg="primary.500" rounded="md" shadow={3} />
                        <Center h="5" w="5" bg="primary.700" rounded="md" shadow={3} />
                        <Center h="5" w="5" bg="primary.300" rounded="md" shadow={3} />
                        <Center h="5" w="5" bg="primary.500" rounded="md" shadow={3} />
                        <Center h="5" w="5" bg="primary.700" rounded="md" shadow={3} />
                        <Center h="5" w="5" bg="primary.300" rounded="md" shadow={3} />
                        <Center h="5" w="5" bg="primary.500" rounded="md" shadow={3} />
                        <Center h="5" w="5" bg="primary.700" rounded="md" shadow={3} />
                    </HStack>
                </Center>
            </VStack>
        </ScrollView>
    )
}