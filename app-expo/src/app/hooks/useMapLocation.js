import { useState } from "react";

const useMapLocation = () => {
    const [location, setLocation] = useState({
        latitude: 37.3012,
        longitude: 127.0355,
        latitudeDelta: 0,
        longitudeDelta: 0,
    }); // 지도 중심 위치
    return location;
}
export default useMapLocation;