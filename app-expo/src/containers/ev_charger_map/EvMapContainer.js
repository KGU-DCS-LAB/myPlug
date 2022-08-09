import { useEffect, useRef, useState } from "react";
import { Circle, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import MapView from "react-native-map-clustering";
import * as Location from 'expo-location';
import { config } from '../../../config'
import axios from 'axios';
import { Box, Center, HStack, Spacer, Text, View } from "native-base";
import CoverMenu from "./cover_menu/CoverMenu";
import LoadingSpinner from "../../components/Loading/LoadingSpinner";
import FilterModal from "../../components/ev_charger_map/modals/FilterModal";
import { Image } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import StationListModal from "../../components/ev_charger_map/modals/StationListModal";
import StationSmallModal from "../../components/ev_charger_map/modals_v2/StationSmallModal";
import StationBigModal from "../../components/ev_charger_map/modals_v2/StationBigModal";
import useMapLocation from "../../hooks/useMapLocation";

const EvMapContainer = (props) => {
    const mapRef = useRef();
    const mapLocation = useMapLocation();
    
    return (
        <MapView
            ref={mapRef}
            initialRegion={{ //초기 값
                latitude: 37.3012,
                longitude: 127.0355,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }}
            style={{ flex: 1 }}
            provider={PROVIDER_GOOGLE} // Apple 지도가 뜨지 않도록 방지함
            showsUserLocation={true}
            showsMyLocationButton={false} // 현위치를 맵에서 직접 관리하지 않도록 제한함 (Stagger에서 처리)
            region={{ //현 위치를 state가 관리하도록 함
                latitude: mapLocation.latitude,
                longitude: mapLocation.longitude,
                latitudeDelta: mapLocation.latitudeDelta,
                longitudeDelta: mapLocation.longitudeDelta,
            }}
            // onRegionChange={region => {

            // }}
            // onRegionChangeComplete={(region) => { //손가락이 지도에서 떨어지는 순간 처리할 일 + 굳이 손가락을 대지 않아도 위치 변경 시 이것을 통해 동작하기도 하는 것을 발견함.
            //     setLocationAndGetStations(region);
            // }}
            // onMapReady={() => {
            //     // updateMapStyle()
            // }}
            clusterColor="green"
            maxZoom={13}
        >

        </MapView>
    )
}
export default EvMapContainer;