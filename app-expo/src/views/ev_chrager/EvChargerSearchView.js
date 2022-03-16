import React, { useState, useEffect, Component } from 'react'; 
import { View, KeyboardAvoidingView, TextInput, StyleSheet, Text, Platform, TouchableWithoutFeedback, Button, Keyboard  } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import axios from 'axios';
import { 
    Input
  } from "native-base";

class EvChargerSearchView extends React.Component {

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
    //   <View style={{ flex: 1 , justifyContent: 'flex-end'}}>
    //     <Input size="2xl" placeholder="검색어를 입력하세요" />
    //   </View>
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <Text style={styles.header}>Header</Text>
          <TextInput placeholder="Username" style={styles.textInput} />
          <View style={styles.btnContainer}>
            <Button title="Submit" onPress={() => null} />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
    );
  }
}

export default EvChargerSearchView;