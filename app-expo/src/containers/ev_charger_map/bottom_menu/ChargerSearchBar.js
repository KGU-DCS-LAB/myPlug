import SearchBar from "react-native-dynamic-search-bar";

const ChargerSearchBar = (props) => {
    return (
        <>
            <SearchBar
                style={{ width: 250 }}
                placeholder="충전소 검색하기"
                onPress={() => alert("onPress")}
            // onChangeText={(text) => {
            //     console.log(text)
            //     filterList(text);
            // }}
            // onClearPress={() => {
            //     filterList("");
            // }}
            />
        </>
    )
}
export default ChargerSearchBar;