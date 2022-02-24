import * as React from 'react';
import { Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TestGpsView from '../../views/test/TestGPSView';

const TestScreen = () => {
    return (
     <TestGpsView/>
   );
 }

const Tab = createBottomTabNavigator();
const TestRoute = (props) => {
    return (
      <Tab.Navigator
        screenOptions={{ headerShown: false }}
      >
        <Tab.Screen
          name="메인으로"
          component={TestScreen}
          listeners={{
              tabPress: () => {
              //버튼 눌렀을 때 메인으로 가게 해주는 기능.
              //참고로 이 listner 기능은 navigation v6부터 가능함
              props.navigation.navigate('MyPlug');
              },
          }}
          />
      </Tab.Navigator>
    );
  }
  
export default TestRoute;