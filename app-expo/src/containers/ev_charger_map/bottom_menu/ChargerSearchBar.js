import { Box, Text } from "native-base";
import { useState } from "react";
import SearchBar from "react-native-dynamic-search-bar";
import { FlatList, TouchableOpacity } from 'react-native';
import { config } from '../../../../config'
import StationSmallModal from "../../../components/ev_charger_map/StationSmallModal";
import StationBigModal from "../../../components/ev_charger_map/StationBigModal";

const ChargerSearchBar = (props) => {

    const [text, setText] = useState('');
    const [stations, setStations] = useState([]);
    const [selectedStation, setSelectedStation] = useState(); //마커 선택 시 모달에 띄워줄 데이터
    const [smallModalVisible, setSmallModalVisible] = useState(false); //작은 모달 온오프
    const [bigModalVisible, setBigModalVisible] = useState(false); //큰 모달 온오프

    // const getStations = async () => {
    //     let result = await fetch(config.ip + ':5000/stationsRouter/keco/find/stations');
    //     result = await result.json();
    //     setStations(result);
    // }

    const filterList = async (text) => {
        console.log(text)
        let key = text;
        if(key) {
            let result = await fetch(config.ip + `:5000/search/${key}`);
            result = await result.json();
            if(result) {
                // console.log(result);
                setStations(result)
            }
        } else {
            setStations([])
        }
      
        const textData = text.toLowerCase();
        setText(textData);
    }

    const goToCurrentLocation = async (item) => {
        // console.log(item.lat);
        setSelectedStation(item);
        props.setLocation({
            longitude: item.lng,
            latitude: item.lat,
            latitudeDelta: 0.007,
            longitudeDelta: 0.007,
        });
        setSmallModalVisible(true);
    }

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => goToCurrentLocation(item)}>
            <Text>{item.statNm}</Text>
        </TouchableOpacity>
      );

    return (
        <>
            {
                text.length > 0
                && !smallModalVisible &&
                <Box
                    style={{ width: 250, position: 'absolute', bottom: 40 }}
                    bg="white"
                    maxH={300}
                    minH={300}
                >
                <FlatList
                    data={stations}
                    renderItem={renderItem}
                    keyExtractor={item => item._id}
                />
                </Box>
            }

            <SearchBar
                style={{ width: 250 }}
                placeholder="충전소 검색하기"
                // onPress={() => alert("onPress")}
                onChangeText={(text) => {
                    filterList(text);
                }}
                onClearPress={() => {
                    filterList("");
                }}
            />
            <StationSmallModal //마커 클릭 시 작은 모달 띄우기 용
            station={selectedStation}
            smallModalVisible={smallModalVisible}
            setSmallModalVisible={setSmallModalVisible}
            bigModalVisible={bigModalVisible}
            setBigModalVisible={setBigModalVisible}
            />
            <StationBigModal //작은 모달에서 상세보기 클릭 시 큰 모달 띄우기 용
                station={selectedStation}
                smallModalVisible={smallModalVisible}
                setSmallModalVisible={setSmallModalVisible}
                bigModalVisible={bigModalVisible}
                setBigModalVisible={setBigModalVisible}
            />
        </>
    )
}
export default ChargerSearchBar;