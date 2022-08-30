// import { Heading, HStack, View, Button, Text } from "native-base"
import { Heading, HStack, Button, ScrollView, Box } from "native-base"
import { StyleSheet } from "react-native";
import MyCarRegisModal from "../../components/ev_charger_map/modals/MyCarRegisModal";
import { useEffect, useState } from "react";
import PressableButton from "../../components/common/PressableButton";
import { View, Text } from 'react-native';


const MyCarContainer = () => {

    const [myCarModalVisible, setMyCarModalVisible] = useState(false);

    return (
        <View style={{ flex: 1 }}>
            <Heading style={styles.heading}>나의 자동차</Heading>
            <View style={{ flex: 1 }}>
                <ScrollView p={2}>

                    <PressableButton
                        // style={}
                        key={0}
                        // onPress={() => }
                        title="자동차1"
                    />
                    <PressableButton
                        // style={}
                        key={1}
                        // onPress={() => }
                        title="자동차2"
                    />
                    <PressableButton
                        // style={}
                        key={2}
                        // onPress={() => }
                        title="자동차3"
                    />
                </ScrollView>


                <Box p={2}>
                    <Button
                        onPress={() => {
                            setMyCarModalVisible(true);
                        }}
                    >자동차 등록
                    </Button>
                </Box>
                <MyCarRegisModal
                    myCarModalVisible={myCarModalVisible}
                    setMyCarModalVisible={setMyCarModalVisible}
                />
            </View>
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