import 'react-native-gesture-handler';
import * as React from 'react';
import { Button, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import HomeView from '../../views/main/HomeView';


function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="그냥 잘 뜨는지 확인해보고 싶어서 만들어본 아무 의미 없는 버튼. 이 다음 HomeView는 왜 뜨지 않을까?" />
      <HomeView/>
    </View>
  );
}

function NotificationsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
  );
}

function SettingsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
  );
}

const Drawer = createDrawerNavigator();

export default function Main() {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="MyPlug" component={HomeScreen} />
      <Drawer.Screen name="알림" component={NotificationsScreen} />
      <Drawer.Screen name="설정" component={SettingsScreen} />
    </Drawer.Navigator>
  );
}