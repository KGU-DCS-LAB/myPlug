import { Avatar, Heading, HStack, Text, VStack } from "native-base";
import { TouchableOpacity } from "react-native";

export default (props) => {
    const station = props.station;
    return (
        <TouchableOpacity onPress={props.onPress}>
            <HStack
                borderBottomWidth="1"
                borderColor="coolGray.200"
                p={1}
                alignItems="center" space={3}
            >
                <Avatar bg={station.status.markerColor + ".500"}>
                    {station.status.description}
                </Avatar>
                <VStack>
                    <Heading fontSize="md">{station.statNm}</Heading>
                    <Text>{station.useTime}</Text>
                    <Text>{station.bnm}({station.busiNm})</Text>
                    <Text>{station.distance + "m"}</Text>
                </VStack>
            </HStack>
        </TouchableOpacity>
    )
}