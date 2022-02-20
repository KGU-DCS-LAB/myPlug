import 'react-native-gesture-handler';
import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import HomeView from '../../views/main/HomeView';
import { MaterialIcons } from '@expo/vector-icons'; 

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button onPress={() =>navigation.navigate('로딩화면')} title="그냥 잘 뜨는지 확인해보고 싶어서 만들어본 아무 의미 없는 버튼. 이 다음 HomeView는 왜 뜨지 않을까?" />
      <HomeView/>
    </View>
  );
}

function LoadingScreen({ navigation }) {
  return (
    <View  style={{ flex: 1, alignItems: 'center' }}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style = {{fontWeight : 'bold', fontSize : 40}}>나만의{'\n'}플러그</Text>
      <Text style = {{ fontSize : 20}}>전기차 충전앱</Text>
      </View>
      
        <Text>충전소정보 업데이트 중 ...(50%)</Text>
      
     
      <Button onPress={() => navigation.navigate('메인화면')} title="MyPlugHome화면으로 가기" />
    </View>
  );
}

function MainScreen({ navigation }) {
  return (
    <View  style={{ flex: 1, alignItems: 'center' }}>
      <View style={{ flex: 1, alignItems: 'center', flexDirection: 'row' }}>
       <MaterialIcons name="my-location" size={24} color="black" />
       <Text>수원시 영통구 이의동 </Text>
       </View>
       <Button onPress={() => navigation.goBack()} title="Go back home" />
     
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
      <Drawer.Screen name="로딩화면" component={LoadingScreen} />
      <Drawer.Screen name="메인화면" component={MainScreen} />
    </Drawer.Navigator>
  );
}