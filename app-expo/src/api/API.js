import axios from "axios";
import { config } from "../../config";
import {sortStations} from "./DISTANCE";

const getRegionStations = (location, userLocation) => {
    console.log(location);
    console.log(userLocation);
    axios.post(config.ip + ':5000/stationsRouter/keco/find/regionStations', {
        // cancelToken: source.current.token,
        data: { // 현재 화면 모서리의 좌표 값을 전송함. 같은 축이여도 숫자가 작을 수록 값이 작음 (ex. x1<x2,  y1<y2)
            x1: location.longitude - (location.longitudeDelta / 2),
            x2: location.longitude + (location.longitudeDelta / 2),
            y1: location.latitude - (location.latitudeDelta / 2),
            y2: location.latitude + (location.latitudeDelta / 2),
            // count: count,
        }
    }).then((response) => {
        // console.log(sortStations(userLocation, response.data));
        return sortStations(userLocation, response.data); //서버에서 받아온 충전소 데이터 리스트를 업데이트
        // setFilteredChargingStations(response.data);
    }).catch(function (error) {
        console.log(error);
        return []
    })
}

export {getRegionStations}