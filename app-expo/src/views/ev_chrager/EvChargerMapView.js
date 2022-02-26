import React, { useState, useEffect } from 'react'; 
import { StyleSheet, View } from "react-native";
import MapView, {Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';


const EvChargerMapView = (props) => { 

  const [mapWidth, setMapWidth] = useState('99%');

  // Update map style to force a re-render to make sure the geolocation button appears
  const updateMapStyle = () => {
    setMapWidth('100%')
  }

  return (
    <View style={styles.container}>
      <MapView
        initialRegion={{
          latitude: props.latitude,
          longitude: props.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        // style={[styles.map, { width: mapWidth }]}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        showsMyLocationButton={true}
        onMapReady={() => {
          updateMapStyle()
        }}
        
      />

    </View>
  ); 
}

export default EvChargerMapView;

// const styles = StyleSheet.create({
//   map: {
//     flex: 1,
//     width: '100%',
//     height: '100%',
//   },
// });

var styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
    map: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    }
});