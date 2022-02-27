import React, { useState, useEffect, Component } from 'react'; 
import { StyleSheet, View, Text } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import axios from 'axios';

class EvChargerMapView extends React.Component {


  constructor(props) {
    super(props);
    this.state = {charging_stations:JSON.parse(props.charging_stations)};

  }

  componentDidMount(){

  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <MapView
          initialRegion={{
          latitude: this.props.latitude,
          longitude: this.props.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        style={{ flex: 1 }}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        showsMyLocationButton={true}
        onMapReady={() => {
          // updateMapStyle()
        }}      
        >
        <Marker
          coordinate={{latitude: 37.78825, longitude: 127.4324}}
          // coordinate={{latitude: this.props.charging_stations[0].charging_station_location_latitude, longitude: 127.4324}}
          title="this is a marker"
          description="눌러보삼"
          onPress={ () => console.log( this.state.charging_stations[0].charging_station_name ) }
        />
        {/* {charging_stations.map((marker, index) => (
          <Marker
            key={index}
            coordinate={{latitude:marker.charging_station_location_latitude, longitude:marker.charging_station_location_longitude}}
            title={marker.charging_station_name}
            description={marker.charging_station_location_detail}
          />
        ))} */}
        </MapView>
      </View>
    );
  }



}

export default EvChargerMapView;