import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import EvChargerMapView from '../../views/ev_chrager/EvChargerMapView';


function EvChargerMapScreen() {
  return (
      <EvChargerMapView/>
  );
}

function TemporaryScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>임시페이지</Text>
    </View>
  );
}

const GoToMain = () => {
     return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>이거 삭제하지 마세요. 없으면 오류남</Text>
      </View>
    );
  }

const Tab = createBottomTabNavigator();

const EvChargerRoute = (props) => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="목록보기" component={EvChargerMapScreen} />
      <Tab.Screen name="인근장소" component={TemporaryScreen} />
      <Tab.Screen
        name="메인으로"
        component={GoToMain}
        listeners={{
            tabPress: () => {
            //버튼 눌렀을 때 메인으로 가게 해주는 기능.
            //참고로 이 listner 기능은 navigation v6부터 가능함
            props.navigation.navigate('MyPlug');
            },
        }}
        />
      <Tab.Screen name="필터링" component={TemporaryScreen} />
      <Tab.Screen name="검색하기" component={TemporaryScreen} />
    </Tab.Navigator>
  );
}

export default EvChargerRoute;