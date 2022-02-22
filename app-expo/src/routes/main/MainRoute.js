import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeView from  '../../views/main/HomeView';
import EvChargerRoute from '../ev_charger/EvChargerRoute';



function HomeScreen({ navigation }) {
  return (
    <HomeView navigation={navigation} />
  );
}

function EvChargerScreen({ navigation }) {
  return (
    <EvChargerRoute navigation={navigation}/>
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

const Stack = createNativeStackNavigator();

function MainRoute() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="MyPlug" component={HomeScreen} />
      <Stack.Screen name="EvCharger" component={EvChargerScreen} />
      {/* <Stack.Screen name="Community" component={CommunityScreen} /> */}
      {/* <Stack.Screen name="HotPlace" component={HotPlaceScreen} /> */}
    </Stack.Navigator>
  );
}

export default MainRoute;
