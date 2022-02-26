import React, { useState, useEffect } from 'react'; 
import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeView from  '../../views/main/HomeView';
import EvChargerRoute from '../ev_charger/EvChargerRoute';
import TestRoute from '../test/TestRoute';
import * as Location from 'expo-location';




function HomeScreen({ navigation }) {
  return (
    <HomeView navigation={navigation} />
  );
}

function EvChargerScreen({ route, navigation }) {
  const { latitude } = route.params;
  const { longitude } = route.params;
  return (
    <EvChargerRoute navigation={navigation} latitude={latitude} longitude={longitude} />
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
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

    // Get current location information 
    useEffect(() => {
      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }
  
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
        setLatitude(location.coords.latitude);
        setLongitude(location.coords.longitude);
      })();
    }, []);
  
    let text = 'Waiting..';
    if (errorMsg) {
      text = errorMsg;
    } else if (location) {
      text = JSON.stringify(location);
      // console.log('[LOG] current location : ' + text);
    }


  return (
    <Stack.Navigator
     initialRouteName="Home"
     screenOptions={{ headerShown: false }} 
    >
      <Stack.Screen name="MyPlug" component={HomeScreen} />
      <Stack.Screen name="EvCharger" component={EvChargerScreen} initialParams={{latitude:latitude, longitude:longitude}} />
      {/* <Stack.Screen name="Community" component={CommunityScreen} /> */}
      {/* <Stack.Screen name="HotPlace" component={HotPlaceScreen} /> */}
      <Stack.Screen name="Test" component={TestScreen} />
    </Stack.Navigator>
  );
}

export default MainRoute;
