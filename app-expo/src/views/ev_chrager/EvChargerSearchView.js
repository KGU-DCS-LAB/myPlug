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
          <Text style={styles.header}>충전소 검색하기</Text>
          <TextInput placeholder="검색어를 입력하세요" style={styles.textInput} />
          <View style={styles.btnContainer}>
            <Button title="검색하기" onPress={() => null} />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    inner: {
      padding: 24,
      flex: 1,
      justifyContent: "space-around"
    },
    header: {
      fontSize: 36,
      marginBottom: 48
    },
    textInput: {
      height: 40,
      borderColor: "#000000",
      borderBottomWidth: 1,
      marginBottom: 36
    },
    btnContainer: {
      backgroundColor: "white",
      marginTop: 12
    }
  });

export default EvChargerSearchView;