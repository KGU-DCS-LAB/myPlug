import 'react-native-gesture-handler';
import * as React from 'react';
import { Button, View, Text, StyleSheet, Image } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import HomeView from '../../views/main/HomeView';
import { MaterialIcons } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
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

       <View style={{ flex: 1, flexDirection: 'row'}}>
         
               <View style={styles.CardContainer}>  
               
               
               <MaterialCommunityIcons name="map-marker" size={40} color="black" >
                 <Text style={styles.CardTitle}>충전소 지도</Text></MaterialCommunityIcons> 
               </View>
               <View style={styles.CardContainer}>  <MaterialIcons name="electric-car" size={40} color="black" >
                 <Text style={styles.CardTitle}>충전 기록하기</Text></MaterialIcons> </View>
              
        </View> 


        <View style={{ flex: 1, flexDirection: 'colume' }}>
             <View style={styles.CardContainer}>  <Text style={styles.CardTitle}>인근 충전소 찾기</Text></View>
           
                  
        </View> 


        <View style={{ flex: 1, flexDirection: 'row'}}>
        <View style={styles.CardContainer}>  <Text style={styles.CardTitle}>선호하는 충전소1</Text></View>
        <View style={styles.CardContainer}>  <Text style={styles.CardTitle}>선호하는 충전소2</Text></View>
              
        </View> 

        <View style={{ flex: 1, flexDirection: 'row'}}>
        <View style={styles.CardContainer}>  <Text style={styles.CardTitle}>자유게시판</Text></View>
        <View style={styles.CardContainer}>  <Text style={styles.CardTitle}>우리 동네 게시판</Text></View>
              
        </View> 


        <View style={{ flex: 1, flexDirection: 'colume' }}>
        <View style={styles.CardContainer}>  <Text style={styles.CardTitle}>인근장소추천</Text></View>
        
        </View> 


        <View style={{ flex: 1, flexDirection: 'colume' }}>
        <View style={styles.CardContainer}>  <Text style={styles.CardTitle}>개인 충전 패턴 분석</Text></View>
        
        </View>
       

        <View style={{ flex: 1, flexDirection: 'colume' }}>
        <View style={styles.CardContainer}>  <Text style={styles.CardTitle}>차종별 충전 패턴 분석</Text></View>
       
                  
        </View> 

       <Button onPress={() => navigation.goBack()} title="Go back home" />

    </View>
  );
}
const styles = StyleSheet.create({
  CardContainer: {
      // elevation: 5,
      // borderRadius: 7,
      // borderWidth: 0.5,
      // borderColor: '#black',
      // margin: 20,
      // padding: 10,
      // flex: 1,
      // width:150,
      // height: 150
      flex: 1,
    backgroundColor: 'white',
    borderRadius: 7,
      borderWidth: 0.5,
      borderColor: '#black',
      margin: 5,
      alignItems:'stretch'
  },
  CardTitle: {
      width: '100%',
      fontWeight: 'bold',
      fontSize: 15,
      padding: 3
  },
  CardContent: {
      width: '100%',
      fontSize: 12,
      padding: 3
  },
});





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