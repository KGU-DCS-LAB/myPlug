import { Box, Center, Fab, HStack, Icon, IconButton, Spacer, Stagger, useDisclose } from "native-base";
import { AntDesign, MaterialCommunityIcons, MaterialIcons, FontAwesome5, Ionicons } from "@expo/vector-icons";
import * as Location from 'expo-location';


const MenuStagger = (props) => {

    const {
        isOpen,
        onToggle
    } = useDisclose();

    const goToCurrentLocation = async () => {
        let location = await Location.getCurrentPositionAsync({}); //현 위치 수신
        // console.log(location);
        props.setLocation({
            longitude: location.coords.longitude,
            latitude: location.coords.latitude,
            latitudeDelta: 0.007,
            longitudeDelta: 0.007,
        });
    }

    return (
        <>

            <Box maxW="100">
                <Stagger
                    // visible={isOpen}
                    visible={true}
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
                                name="sliders-h"
                                _dark={{
                                    color: "warmGray.50"
                                }}
                                color="warmGray.50"
                            />
                        }
                        onPress={
                            () => props.setFilterModalVisible(true)
                        }
                    />
                    <IconButton
                        mb="3"
                        margin={1}
                        variant="solid"
                        bg="red.500"
                        colorScheme="yellow"
                        borderRadius="full"
                        icon={
                            <Icon
                                as={MaterialIcons}
                                size="6"
                                name="my-location"
                                _dark={{
                                    color: "warmGray.50"
                                }}
                                color="warmGray.50"
                            />
                        }
                        onPress={
                            () => goToCurrentLocation()
                        }
                    />
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
                                name="home"
                                _dark={{
                                    color: "warmGray.50"
                                }}
                                color="warmGray.50"
                            />
                        }
                        onPress={
                            () => props.navigation.navigate('Home')
                        }
                    />
                </Stagger>
            </Box>
            <HStack alignItems="center">
                <IconButton style={{ backgroundColor: "#27ae60" }} variant="solid" borderRadius="full" shadow={2} size="lg" onPress={onToggle} bg="cyan.400" icon={<Icon as={MaterialCommunityIcons} size="7" name="dots-horizontal" color="warmGray.50" _dark={{
                    color: "warmGray.50"
                }} />} />
            </HStack>

        </>
    )
}
export default MenuStagger;