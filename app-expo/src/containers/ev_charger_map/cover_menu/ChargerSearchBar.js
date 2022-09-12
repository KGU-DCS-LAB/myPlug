import { Box, Text } from "native-base";
import { useRef, useState } from "react";
import SearchBar from "react-native-dynamic-search-bar";
import { FlatList, TouchableOpacity } from 'react-native';
import { config } from '../../../../config'
import { Marker } from "react-native-maps";
import MapView from "react-native-map-clustering";
import { useSelector } from "react-redux";
import { selectSmallModalVisible } from "../../../app/redux/modal/modalSlice";

const ChargerSearchBar = (props) => {

    let currentRequest = useRef(null);
    let requestIndex = useRef(0);

    const [text, setText] = useState('');
    const [stations, setStations] = useState([]);

    const smallModalVisible = useSelector(selectSmallModalVisible);


    const filterList = async (text) => {
        console.log(text)
        if (currentRequest.current) {
            currentRequest.current.abort();
        }
        currentRequest.current = new AbortController();
        const index = ++requestIndex.current;

        let key = text;
        if (key) {
            fetch(config.ip + `:5000/stationsRouter/search/${key}`, {
                signal: currentRequest.current.signal,
            }).then(async result => {
                const results = await result.json();
                console.log('length : ' + results.length);
                setStations(results)
            }).then(() => {
                console.log('index : ' + index)
            }).catch(error => {
                if (error.name === 'AbortError') return;

                console.error(error);
            });
        } else {
            setStations([])
        }

        const textData = text.toLowerCase();
        setText(textData);
    }

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => props.focusToStation(item)}>
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
                !smallModalVisible &&
                <Box
                    style={{ width: 250, position: 'absolute', top: 40 }}
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