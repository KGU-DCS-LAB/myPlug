import { Icon, IconButton } from "native-base"
import { AntDesign, MaterialCommunityIcons, MaterialIcons, FontAwesome5, Ionicons } from "@expo/vector-icons";
import * as Location from 'expo-location';

export default (props) => {


    const location = props.mapLocation;

    const goToCurrentLocation = async () => {
        let gps = await Location.getCurrentPositionAsync({}); //현 위치 수신
        // console.log(location);
        const currentLocation = {
            longitude: gps.coords.longitude,
            latitude: gps.coords.latitude,
            latitudeDelta: 0.007,
            longitudeDelta: 0.007,
        }
        props.mapRef.current.animateToRegion(currentLocation); // 지도 이동을 도와주는 메소드
        props.setLocationAndGetStations(currentLocation);
    }

    const zoom = (zoom) => {
        let magnification = 0.005
        switch (zoom) {
            case 'out':
                magnification *= 1
                break;

            case 'in':
                magnification *= -1
                break;
            default:
                return
                break;
        }
        if (location.latitudeDelta + magnification > 0 && location.longitudeDelta + magnification > 0) {
            const nextLocation = {
                longitude: location.longitude,
                latitude: location.latitude,
                latitudeDelta: location.latitudeDelta + magnification,
                longitudeDelta: location.longitudeDelta + magnification,
            }
            props.mapRef.current.animateToRegion(nextLocation); // 지도 이동을 도와주는 메소드
            props.setLocationAndGetStations(nextLocation);
        }
    }

    return (
        <>
            <IconButton
                mb="3"
                margin={1}
                variant="solid"
                bg="red.400"
                colorScheme="yellow"
                borderRadius="full"
                icon={
                    <Icon
                        as={AntDesign}
                        size="6"
                        name="plus"
                        _dark={{
                            color: "warmGray.50"
                        }}
                        color="warmGray.50"
                    />
                }
                onPress={
                    () => zoom('in')
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
                bg="red.400"
                colorScheme="yellow"
                borderRadius="full"
                icon={
                    <Icon
                        as={AntDesign}
                        size="6"
                        name="minus"
                        _dark={{
                            color: "warmGray.50"
                        }}
                        color="warmGray.50"
                    />
                }
                onPress={
                    () => zoom('out')
                }
            />
        </>
    )
}