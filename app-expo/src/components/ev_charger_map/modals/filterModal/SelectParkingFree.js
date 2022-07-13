import { Button, HStack, Text, View } from "native-base";

const SelectParkingFree = (props) => {
    const parkingFree = 'parkingFree';

    return (
        <>
            <Text>주차무료</Text>
            <HStack>
                {
                    props.selectedType.parkingFree.findIndex((type) => type === "Y") !== -1 ?
                        <Button onPress={() => props.cancleSelect(parkingFree, "Y")}>무료</Button>
                        :
                        <Button style={{ backgroundColor: "grey" }} onPress={() => props.selectType(parkingFree, "Y")}>무료</Button>
                }
                {
                    props.selectedType.parkingFree.findIndex((type) => type === "N") !== -1 ?
                        <Button onPress={() => props.cancleSelect(parkingFree, "N")}>유료</Button>
                        :
                        <Button style={{ backgroundColor: "grey" }} onPress={() => props.selectType(parkingFree, "N")}>유료</Button>
                }
            </HStack></>
    )
}

export default SelectParkingFree;