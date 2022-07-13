import { Button, HStack, Text, View } from "native-base";
import { StyleSheet } from "react-native";

const SelectChgerType = (props) => {
    const chgerType = 'chgerType';
    return (
        <>
            <Text>충전기 종류</Text>
            <HStack>
                {props.chgerType.map((item) =>
                    props.selectedType[chgerType].findIndex((type) => type === item._id) !== -1 ?
                        <Button key={item._id} onPress={() => props.cancleSelect(chgerType, item._id)}>{item._id}</Button>
                        :
                        <Button style={{ backgroundColor: "grey" }} key={item._id} onPress={() => props.selectType(chgerType, item._id)}>{item._id}</Button>
                )}
            </HStack></>
    )
}

export default SelectChgerType;