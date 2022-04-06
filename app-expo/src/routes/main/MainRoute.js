import React, { useState, useEffect } from 'react'; 
import { Alert, Button, View, Text, Modal, StyleSheet, Pressable } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeView from  '../../views/main/HomeView';
import EvChargerRoute from '../ev_charger/EvChargerRoute';
import LoginRoute from '../login/LoginRoute';
import TestRoute from '../test/TestRoute';
import * as Location from 'expo-location';
import axios from 'axios';
import {config} from '../../../config'
import DocsRoute from '../docs/DocsRoute';



function HomeScreen({ navigation }) {
  return (
    <HomeView navigation={navigation} />
  );
}

function EvChargerScreen({ route, navigation }) {
  const {charging_stations} = route.params;
  const { latitude } = route.params;
  const { longitude } = route.params;
  return (
    <EvChargerRoute
     navigation={navigation} 
     latitude={latitude} 
     longitude={longitude} 
     charging_stations={charging_stations}
     />
  );
}

function LoginScreen({ navigation }) {
  return (
    <LoginRoute navigation={navigation} />
  );
}

function CommunityScreen({ navigation }) {
  // 수정필요
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
      <Button
        title="Go to Details... again"
        onPress={() => navigation.push('Details')}
      />
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
      <Button title="Go back" onPress={() => navigation.goBack()} />
      <Button
        title="Go back to first screen in stack"
        onPress={() => navigation.popToTop()}
      />
    </View>
  );
}
function HotPlaceScreen({ navigation }) {
    // 수정필요
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
    </View>
  );
}
function TestScreen({ navigation }) {
  // 테스트용
  return (
    <TestRoute navigation={navigation} />
  );
}

function DocsScreen({ navigation }) {
  // 패치내역 및 안내운
  return (
    <DocsRoute navigation={navigation} />
  );
}



const Stack = createNativeStackNavigator();

class MainRoute extends React.Component{

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  }

  constructor(props) {
    super(props);
    this.state = {
      charging_stations : props.charging_stations,
      latitude : props.latitude, 
      longitude : props.longitude,
      modalVisible : true,
    }
  }

  componentDidMount(){

  }

  render() {
    return (
      <>
        {/* <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            this.setModalVisible(!this.state.modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
            <Text style={styles.titleText}>안내문</Text>
              <Text style={styles.modalText}>기기 성능에 따라서 초기 로딩 시간이 필요합니다. 너무 빨리 메뉴에 접근 하면 오류가 발생합니다.</Text>
              <Text style={styles.modalText}>GPS를 수신할 때 까지 대기가 필요합니다. (추후에 로딩 화면에서 이를 방지할 계획)</Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => this.setModalVisible(!this.state.modalVisible)}
              >
                <Text style={styles.textStyle}>확인했습니다.</Text>
              </Pressable>
            </View>
          </View>
        </Modal> */}
      <Stack.Navigator
       initialRouteName="Home"
       screenOptions={{ headerShown: false }} 
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="EvCharger"
          component={EvChargerScreen}
          initialParams={{
            latitude:this.state.latitude, 
            longitude:this.state.longitude, 
            charging_stations:this.state.charging_stations, 
          }} 
        />
        {/* <Stack.Screen name="Community" component={CommunityScreen} /> */}
        <Stack.Screen name="HotPlace" component={HotPlaceScreen} />
        <Stack.Screen name="Docs" component={DocsScreen} />
        <Stack.Screen name="Test" component={TestScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
      </Stack.Navigator>
      </>
    );
  }
}

export default MainRoute;


const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  titleText: {
    marginBottom: 15,
    fontSize: 20,
    fontWeight: "bold"
  }
});