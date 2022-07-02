import { Box, Text } from "native-base";
import { useState } from "react";
import SearchBar from "react-native-dynamic-search-bar";
import { FlatList, TouchableOpacity } from 'react-native';
import { config } from '../../../../config'
import StationSmallModal from "../../../components/ev_charger_map/modals/StationSmallModal";
import StationBigModal from "../../../components/ev_charger_map/modals/StationBigModal";
import { Marker } from "react-native-maps";
import MapView from "react-native-map-clustering";

const ChargerSearchBar = (props) => {

    const [text, setText] = useState('');
    const [stations, setStations] = useState([]);

    const filterList = async (text) => {
        console.log(text)
        let key = text;
        if (key) {
            let result = await fetch(config.ip + `:5000/stationsRouter/search/${key}`);
            result = await result.json();
            if (result) {
                // console.log(result);
                setStations(result)
            }
        } else {
            setStations([])
        }

        const textData = text.toLowerCase();
        setText(textData);
    }

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => props.focuseToStation(item)}>
            <Box
             borderBottomWidth="1"
             borderColor="coolGray.200"
             p={1}
             >
                <Text fontSize="md">{item.statNm}</Text>
            </Box>
        </TouchableOpacity>
    );

    return (
        <>
            {
                text.length > 0 &&
                !props.smallModalVisible &&
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

        </>
    )
}
export default ChargerSearchBar;