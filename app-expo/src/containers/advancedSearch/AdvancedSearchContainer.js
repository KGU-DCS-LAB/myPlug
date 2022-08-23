import { Box, Button, Divider, Heading, HStack, ScrollView, View } from "native-base"
import { useState } from "react";
import { StyleSheet } from "react-native";
import * as STATIONS from '../../api/STATIONS';
import * as API from "../../api/API";
import StationCard from "../../components/ev_charger_map/cards/StationCard";
import AdvancedScrollView from "../../components/advancedSearch/AdvancedScrollView";
import AdvancedButton from "../../components/advancedSearch/AdvancedButton";


const AdvancedSearch = () => {
    const [selectedType, setSelectedType] = useState({ zcode: [], kind: [], kindDetail: [] });
    const [searchedStations, setSearchedStations] = useState([]);
    const [showList, setShowList] = useState(false);

    const selectType = (type, selected) => {
        let select = selectedType[type];
        select.push(selected)
        setSelectedType({ ...selectedType, [type]: select })
    }

    const cancelSelect = (type, selected) => {
        let select = selectedType[type];
        select = select.filter(item => item !== selected)
        setSelectedType({ ...selectedType, [type]: select })
    }

    const findStations = async () => {
        setShowList(true);
        const receivedStationData = await API.getStationsByTheme(selectedType)
        const receivedChargerData = await API.getChargersByManyStation(receivedStationData.map((station) => station.statId))
        setSearchedStations(STATIONS.countChargers(receivedStationData, receivedChargerData))
    }

    const modifyOption = () => {
        setShowList(false);
        setSearchedStations([]);
    }
    
    return (
        <View style={{flex: 1}}>
            <Heading style={styles.heading}>테마별 충전소 검색</Heading>
            <View style={styles.container}>

                <AdvancedScrollView
                    showList={showList}
                    searchedStations={searchedStations}
                    selectedType={selectedType}
                    selectType={selectType}
                    cancelSelect={cancelSelect}
                />

                <AdvancedButton
                    showList={showList}
                    modifyOption={modifyOption}
                    findStations={findStations}
                />
                
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    heading: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: '#fff',
    },
    container: {
        flex: 1,
        margin: 5,
        marginTop: 0,
        marginBottom: 10,
        paddingHorizontal: 25,
        paddingTop: 20,
    },
    options: {
        flex: 1,
        flexWrap: "wrap",
        flexDirection: "row",
        justifyContent: "center",
        alignContent: "stretch"
    },
    basicButton: {
        margin: 2,
        backgroundColor: "grey"
    },
    selectedButtom: {
        margin: 2,
    }
});

export default AdvancedSearch;