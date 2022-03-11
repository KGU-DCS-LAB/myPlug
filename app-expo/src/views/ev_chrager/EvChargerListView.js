import React, { useState, useEffect, Component } from 'react'; 
import { StyleSheet, View, Text, Modal, Pressable, Alert, TouchableWithoutFeedback, FlatList } from "react-native";
import * as Location from 'expo-location';
import axios from 'axios';

class EvChargerListView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      charging_stations : JSON.parse(props.charging_stations), 
    };
  }

  componentDidMount(){

  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={this.state.charging_stations}
          renderItem={({item}) => <Text>{item.charging_station_name}</Text>}
        />
      </View>
    );
  }

}

export default EvChargerListView;