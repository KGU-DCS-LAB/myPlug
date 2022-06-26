import { Box, Text } from "native-base";
import { useState } from "react";
import SearchBar from "react-native-dynamic-search-bar";

const ChargerSearchBar = (props) => {

    const [text, setText] = useState('');
    const filterList = (text) => {
        const textData = text.toLowerCase();
        setText(textData);
    }

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
                    <Text>ㅇㅇ</Text>
                    <Text>ㅇㅇ</Text>
                    <Text>ㅇㅇ</Text>
                </Box>
            }

            <SearchBar
                style={{ width: 250 }}
                placeholder="충전소 검색하기"
                onPress={() => alert("onPress")}
                onChangeText={(text) => {
                    console.log(text)
                    filterList(text);
                }}
            />
        </>
    )
}
export default ChargerSearchBar;