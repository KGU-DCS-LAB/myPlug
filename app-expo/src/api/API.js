import axios from "axios";
import { config } from "../../config";

export const getUserFavoriteStations = async (user) => {
    try {
        const response = await axios.post(config.ip + ':5000/favoritesRouter/findOwn', {
            user_id: user.user_id
        })
        // console.log("response >>", response.data)
        let result = []
        let favorites = [];
        result.push(response.data[0].station)
        for (let i = 0; i < result[0].length; i++) {
            favorites.push(result[0][i].statId)
        }
        const response2 = await axios.post(config.ip + ':5000/stationsRouter/keco/find/manyStations', {
            data: favorites
        })
        return response2.data;
    } catch (err) {
        console.log("Error >>", err);
        return []
    }
}

export const getRegionData = async (location) => {
    try {
        const response = await axios.post(config.ip + ':5000/stationsRouter/keco/find/regionStations', {
            // cancelToken: source.current.token,
            data: { // 현재 화면 모서리의 좌표 값을 전송함. 같은 축이여도 숫자가 작을 수록 값이 작음 (ex. x1<x2,  y1<y2)
                x1: location.longitude - (location.longitudeDelta / 2),
                x2: location.longitude + (location.longitudeDelta / 2),
                y1: location.latitude - (location.latitudeDelta / 2),
                y2: location.latitude + (location.latitudeDelta / 2),
            }
        })
        // console.log("response >>", response.data)
        return response.data
    } catch (err) {
        console.log("Error >>", err);
        return []
    }
}

export const getChargersByManyStation = async (statIds) => {
    try {
        const response = await axios.post(config.ip + ':5000/stationsRouter/keco/find/manyChargers', {
            data: statIds
        })
        // console.log("response >>", response.data)
        return response.data
    } catch (err) {
        console.log("Error >>", err);
        return []
    }
}

export const getChargersByOneStation = async (statId) => {
    try {
        const response = await axios.post(config.ip + ':5000/stationsRouter/keco/find/chargers', {
            data: statId
        })
        // console.log("response >>", response.data)
        return response.data
    } catch (err) {
        console.log("Error >>", err);
        return []
    }
}

export const getChargerTypeByKey = async (key) => {
    try {
        const response = await axios.get(config.ip + ':5000/stationsRouter/keco/filteredCharger/' + key)
        // console.log("response >>", response.data)
        return response.data
    } catch (err) {
        console.log("Error >>", err);
        return []
    }
}

export const getBusiNmByKey = async (key) => {
    try {
        const response = await axios.get(config.ip + ':5000/stationsRouter/keco/filteredStations/' + key)
        // console.log("response >>", response.data)
        return response.data
    } catch (err) {
        console.log("Error >>", err);
        return []
    }
}

export const getStationLogsByStatId = async (statId) => {
    try {
        const response = await axios.post(config.ip + ':5000/stationsRouter/keco/find/stationLogs', {
            data: statId
        })
        // console.log("response >>", response.data)
        return response.data
    } catch (err) {
        console.log("Error >>", err);
        return []
    }
}

export const getFilteredData = async (location, selectedType) => {
    try {
        const response = await axios.post(config.ip + ':5000/stationsRouter/filterStations', {
            data: {
                x1: location.longitude - (location.longitudeDelta / 2),
                x2: location.longitude + (location.longitudeDelta / 2),
                y1: location.latitude - (location.latitudeDelta / 2),
                y2: location.latitude + (location.latitudeDelta / 2),
                types: selectedType
            }
        })
        // console.log("response >>", response.data)
        return response.data
    } catch (err) {
        console.log("Error >>", err);
        return []
    }
}

export const saveFilterData = async (userId, selectedType) => {
    try {
        const response = await axios.post(config.ip + ':5000/usersRouter/saveFilterData', {
            data: {
                user_id: userId,
                types: selectedType
            }
        })
        return response.data;
    } catch (err) {
        console.log("Error >>", err);
        return [];
    }
}

export const getStationsByTheme = async (selectedType) => {
    try {
        const response = await axios.post(config.ip + ':5000/stationsRouter/findStation', {
            data: selectedType
        })
        // console.log("response >>", response.data)
        return response.data
    } catch (err) {
        console.log("Error >>", err);
        return []
    }
}