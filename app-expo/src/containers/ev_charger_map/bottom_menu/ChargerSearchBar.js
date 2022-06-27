import { Box, Text } from "native-base";
import { useState } from "react";
import SearchBar from "react-native-dynamic-search-bar";
import { FlatList, TouchableOpacity } from 'react-native';
import { config } from '../../../../config'
import * as Location from 'expo-location';

const ChargerSearchBar = (props) => {

    const [text, setText] = useState('');
    const [stations, setStations] = useState([]);

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
        console.log('dhdhdhdhdhhdh');
        console.log(item.lat);
        props.setLocation({
            longitude: item.lng,
            latitude: item.lat,
            latitudeDelta: 0.007,
            longitudeDelta: 0.007,
        });
    }

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => goToCurrentLocation(item)}><Text>{item.statNm}</Text></TouchableOpacity>
      );

    return (
        <>
            {
                text.length > 0
                &&
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
                    {/* <Text>ㅇㅇ</Text>
                    <Text>ㅇㅇ</Text>
                    <Text>ㅇㅇ</Text> */}
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