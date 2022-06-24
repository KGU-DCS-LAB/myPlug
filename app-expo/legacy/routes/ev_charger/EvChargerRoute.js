import React, { useState, useEffect } from 'react'; 
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import EvChargerMapView from '../../views/ev_chrager/EvChargerMapView';
import EvChargerListView from '../../views/ev_chrager/EvChargerListView';
import EvChargerSearchView from '../../views/ev_chrager/EvChargerSearchView';
import axios from 'axios';


function EvChargerMapScreen({route}) {
  const { latitude } = route.params;
  const { longitude } = route.params;
  const { charging_stations } = route.params;
  return (
      <EvChargerMapView
       latitude={latitude} 
       longitude={longitude} 
       charging_stations={charging_stations} 
      />
  );
}

function EvChargerListScreen({route}) {
  const { latitude } = route.params;
  const { longitude } = route.params;
  const { charging_stations } = route.params;
  return (
    <EvChargerListView
      latitude={latitude} 
      longitude={longitude} 
      charging_stations={charging_stations} 
    />
  );
}


function EvChargerSearchScreen({route}) {
  const { charging_stations } = route.params;
  return (
    <EvChargerSearchView charging_stations={charging_stations}/>
  );
}

function TemporaryScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>임시페이지</Text>
    </View>
  );
}

const UselessScreen = () => {
     return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>이거 삭제하지 마세요. 없으면 오류남</Text>
      </View>
    );
  }

const Tab = createBottomTabNavigator();

const EvChargerRoute = (props) => {

  // const latitude = props.latitude;
  // const longitude = props.longitude;

  //아래와 같은 접근 방식은 일부 개선될 필요가 있음. ex) 맵 -> 검색 -> 맵으로 복귀 시 리스트로 뜨는 문제 발생
  const [stationStyle, setStationStyle] = useState(true);
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen 
        name={stationStyle?"목록보기":"지도보기"} 
        component={stationStyle?EvChargerMapScreen:EvChargerListScreen} 
        initialParams={{
          latitude:props.latitude, 
          longitude:props.longitude, 
          charging_stations:props.charging_stations,
        }}
        listeners={{
          tabPress: () => {
            //버튼 눌렀을 때 메인으로 가게 해주는 기능.
            //참고로 이 listner 기능은 navigation v6부터 가능함
            setStationStyle(!stationStyle);
          },
        }}
      />
      {/* <Tab.Screen name="목록보기" component={EvChargerMapScreen} initialParams={{latitude:props.latitude, longitude:props.longitude, charging_stations:props.charging_stations}} /> */}
      <Tab.Screen
        name="인근장소"
        component={UselessScreen}
        listeners={{
            tabPress: () => {
              //버튼 눌렀을 때 메인으로 가게 해주는 기능.
              //참고로 이 listner 기능은 navigation v6부터 가능함
              props.navigation.navigate('HotPlace');
            },
        }}
      />
      <Tab.Screen
        name="메인으로"
        component={UselessScreen}
        listeners={{
            tabPress: () => {
            //버튼 눌렀을 때 메인으로 가게 해주는 기능.
            //참고로 이 listner 기능은 navigation v6부터 가능함
            props.navigation.navigate('Home');
            },
        }}
        />
      <Tab.Screen name="필터링" component={TemporaryScreen} />
      <Tab.Screen
       name="검색하기"
       component={EvChargerSearchScreen}
       initialParams={{charging_stations:props.charging_stations}}
      />
    </Tab.Navigator>
  );
}

export default EvChargerRoute;