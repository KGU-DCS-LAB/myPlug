import React, { useState, useEffect } from 'react'; 
import { StyleSheet } from "react-native";
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';

const EvChargerMapView = (props) => { 

  const [mapWidth, setMapWidth] = useState('99%');

  // Update map style to force a re-render to make sure the geolocation button appears
  const updateMapStyle = () => {
    setMapWidth('100%')
  }

    return ( 
      <MapView
        initialRegion={{
          latitude: props.latitude,
          longitude: props.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        style={[styles.map, { width: mapWidth }]}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        showsMyLocationButton={true}
        onMapReady={() => {
          updateMapStyle()
        }}
      />
    ); 
}

export default EvChargerMapView;

const styles = StyleSheet.create({
  map: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});