import React, { useState, useEffect } from 'react'; 
import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeView from  '../../views/main/HomeView';
import EvChargerRoute from '../ev_charger/EvChargerRoute';
import TestRoute from '../test/TestRoute';
import Loading from '../main/Loading';
import * as Location from 'expo-location';
import axios from 'axios';
import {config} from '../../../config'


function LoadingScreen({navigation}){
  return (
    <Loading navigation={navigation}/>
  );
}


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
    <EvChargerRoute navigation={navigation} latitude={latitude} longitude={longitude} charging_stations={charging_stations}/>
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

const Stack = createNativeStackNavigator();

const MainRoute = (props) => {
 
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [charging_stations, setChargingStation] = useState('[]');

  useEffect(() => {
    (async () => {
      // GPS 받아오는 작업 시작
      // GPS를 실시간으로 계속 받아오려면 메소드화 하는게 맞지 않을까? + 굳이 여기에서 받아야하나?
      // Get current location information 
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLatitude(location.coords.latitude);
      setLongitude(location.coords.longitude);
      // GPS 받아오는 작업 끝

      // 충전소 데이터 받아오는 작업 시작
      // 3월 12일 부로 ip는 config.js에서 받아오구 있음 (윤주현)
      axios.get(config.ip+':5000/stationsRouter/find')
      .then((response) => {
        setChargingStation(JSON.stringify(response.data));
      }).catch(function (error) {
        setChargingStation('[]');
        console.log(error);
      });
     // 충전소 데이터 받아오는 작업 끝

    })();
  }, []);

  return (
    <Stack.Navigator
     initialRouteName="Loading"
     screenOptions={{ headerShown: false }} 
    >
      <Stack.Screen name="Loading" component={LoadingScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="EvCharger" component={EvChargerScreen} initialParams={{latitude:latitude, longitude:longitude, charging_stations:charging_stations}} />
      {/* <Stack.Screen name="Community" component={CommunityScreen} /> */}
      <Stack.Screen name="HotPlace" component={HotPlaceScreen} />
      <Stack.Screen name="Test" component={TestScreen} />
    </Stack.Navigator>
  );
}

export default MainRoute;
