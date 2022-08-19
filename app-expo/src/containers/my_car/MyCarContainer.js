import { Heading, HStack, View, Button } from "native-base"
import { StyleSheet } from "react-native";
import MyCarRegisModal from "../../components/ev_charger_map/modals/MyCarRegisModal";
import { useEffect, useState } from "react";

const MyCarContainer = () => {

    const [myCarModalVisible, setMyCarModalVisible] = useState(false);

    return (
        <View>
            <Heading style={styles.heading}>나의 자동차</Heading>
            <Button
                onPress={() => {
                    setMyCarModalVisible(true);
                }}
            >자동차 등록
            </Button>
         
            <MyCarRegisModal
                myCarModalVisible={myCarModalVisible}
                setMyCarModalVisible={setMyCarModalVisible}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    heading: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: '#fff',
    },
});


export default MyCarContainer;