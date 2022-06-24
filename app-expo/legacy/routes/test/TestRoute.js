import * as React from 'react';
import { Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TestGpsView from '../../views/test/TestGPSView';
import TestNativeBaseLayoutView from '../../views/test/TestNativeBaseLayoutView';
import TestNativeBaseFormsView from '../../views/test/TestNativeBaseFormsView';

const TestScreen = () => {
    return (
      <Text>하단 탭을 이용하여 여러 종류의 테스트를 진행해보세요</Text>
   );
 }

 const TestGpsScreen = () => {
  return (
    <TestGpsView/>
 );
}

const TestTemporaryScreen = () => {
  return (
    <Text>추후 추가 예정</Text>
 );
}

const TestNativeBaseLayoutScreen = () => {
  return (
    <TestNativeBaseLayoutView/>
 );
}

const TestNativeBaseFormsScreen = () => {
  return (
    <TestNativeBaseFormsView/>
 );
}


const Tab = createBottomTabNavigator();
const TestRoute = (props) => {
    return (
      <Tab.Navigator
        initialRouteName='메인으로'
        screenOptions={{ headerShown: false }}
      >
        <Tab.Screen name="GPS" component={TestGpsScreen} />
        <Tab.Screen name="준비중" component={TestTemporaryScreen} />
        <Tab.Screen
          name="메인으로"
          component={TestScreen}
          listeners={{
              tabPress: () => {
              //버튼 눌렀을 때 메인으로 가게 해주는 기능.
              //참고로 이 listner 기능은 navigation v6부터 가능함
              props.navigation.navigate('Home');
              },
          }}
          />
        <Tab.Screen name="NBL" component={TestNativeBaseLayoutScreen} />
        <Tab.Screen name="NBF" component={TestNativeBaseFormsScreen} />
      </Tab.Navigator>
    );
  }
  
export default TestRoute;