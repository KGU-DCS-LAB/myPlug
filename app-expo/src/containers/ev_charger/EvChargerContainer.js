import { Box, Center, Fab, HStack, Icon, IconButton, Spacer, Stagger, useDisclose } from "native-base";
import { View } from "react-native";
import SearchBar from "react-native-dynamic-search-bar";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { AntDesign, MaterialCommunityIcons, MaterialIcons, FontAwesome5, Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
//location
import * as Location from 'expo-location';
const EvChargerContainer = (props) => {

    const [location, setLocation] = useState({
        latitude: 37.3012,
        longitude: 127.0355,
    });

    // Get current location information 
    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.log('Permission to access location was denied');
                return;  //권한 거부 시 그대로 종료
            }

            let location = await Location.getCurrentPositionAsync({});
            console.log(location);
            setLocation({ longitude: location.coords.longitude, latitude: location.coords.latitude });

            // 실시간으로 위치 변화 감지 (권한 거부 시 아예 동작하지 않음 / 델타 값 관련 버그가 있어서 일단 주석 처리. 동작 자체는 아무 이상 없음)
            // Location.watchPositionAsync({ accuracy: Location.Accuracy.Balanced, timeInterval: 100, distanceInterval: 1 },
            //     position => {
            //         console.log(position.coords);
            //         setLocation({ longitude: position.coords.longitude, latitude: position.coords.latitude });
            //     }
            // );

        })();

    }, []);

    const {
        isOpen,
        onToggle
    } = useDisclose();

    return (
        <>
            <View style={{ flex: 1 }}>
                <MapView
                    initialRegion={{
                        latitude: 37.3012,
                        longitude: 127.0355,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                    style={{ flex: 1 }}
                    provider={PROVIDER_GOOGLE}
                    showsUserLocation={true}
                    showsMyLocationButton={true}
                    region={{
                        latitude: location.latitude,
                        longitude: location.longitude,
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01,
                    }}
                    onMapReady={() => {
                        // updateMapStyle()
                    }}
                />
            </View>
            <Center style={{ position: 'absolute', left: 20, bottom: 30, height:30 }} >
                <SearchBar
                    style={{ width: 250 }}
                    placeholder="충전소 검색하기"
                    onPress={() => alert("onPress")}
                // onChangeText={(text) => {
                //     console.log(text)
                //     filterList(text);
                // }}
                // onClearPress={() => {
                //     filterList("");
                // }}
                />
            </Center>
            <Center style={{ position: 'absolute', right: 20, bottom: 90, height: 30, }} >
                <Box maxW="100">
                    <Stagger
                        visible={isOpen}
                        initial={{
                            opacity: 0,
                            scale: 0,
                            translateY: 34
                        }} animate={{
                            translateY: 0,
                            scale: 1,
                            opacity: 1,
                            transition: {
                                type: "spring",
                                mass: 0.8,
                                stagger: {
                                    offset: 30,
                                    reverse: true
                                }
                            }
                        }} exit={{
                            translateY: 34,
                            scale: 0.5,
                            opacity: 0,
                            transition: {
                                duration: 100,
                                stagger: {
                                    offset: 30,
                                    reverse: true
                                }
                            }
                        }}>

                        <IconButton
                            mb="3"
                            margin={1}
                            variant="solid"
                            bg="indigo.500"
                            colorScheme="indigo"
                            borderRadius="full"

                            icon={
                                <Icon
                                    as={FontAwesome5}
                                    size="6"
                                    name="pencil-alt"
                                    _dark={{
                                        color: "warmGray.50"
                                    }}
                                    color="warmGray.50"
                                />
                            }
                            onPress={
                                () => props.navigation.replace('DiaryModify', {
                                    diary: diary,
                                })
                            }
                        />
                        <IconButton
                            mb="3"
                            margin={1}
                            variant="solid"
                            bg="yellow.500"
                            colorScheme="yellow"
                            borderRadius="full"
                            icon={
                                <Icon
                                    as={MaterialIcons}
                                    size="6"
                                    name="delete"
                                    _dark={{
                                        color: "warmGray.50"
                                    }}
                                    color="warmGray.50"
                                />
                            }
                            onPress={
                                () => confirmDeleteDiary()
                            }
                        />
                    </Stagger>
                </Box>
                <HStack alignItems="center">
                    <IconButton style={{ backgroundColor: "#27ae60" }} variant="solid" borderRadius="full" shadow={2} size="lg" onPress={onToggle} bg="cyan.400" icon={<Icon as={MaterialCommunityIcons} size="7" name="dots-horizontal" color="warmGray.50" _dark={{
                        color: "warmGray.50"
                    }} />} />
                </HStack>
            </Center>
        </>
    )
}
export default EvChargerContainer;