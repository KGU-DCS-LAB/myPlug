import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import 'react-native-gesture-handler';
import { Button, View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

const HomeView = (props) => {
  return (
    <View  style={{ flex: 1, alignItems: 'center' }}>


            <View style={{ flex: 1, alignItems: 'center', flexDirection: 'row' }}>
                  <MaterialIcons name="my-location" size={24} color="black" />
                  <Text>수원시 영통구 이의동 </Text>
            </View> 
            <View style={{ flex: 1, alignItems: 'center', flexDirection: 'row' }}>
                  <TouchableOpacity onPress={() => props.navigation.navigate('Test')}><Text>|테스트 메뉴로 이동하기|</Text></TouchableOpacity>
            </View> 


            <View style={{ flex: 1, flexDirection: 'row'}}>
                  {/* TouchableOpacity 는 View와 동일한 역할을 합니다. 리스너 담으려고 넣음 */}
                  <TouchableOpacity
                        style={styles.CardContainer}
                        onPress={() => props.navigation.navigate('EvCharger')}
                  >
                        <MaterialCommunityIcons name="map-marker" size={40} color="black" > <Text style={styles.CardTitle}>충전소 지도</Text></MaterialCommunityIcons> 
                  </TouchableOpacity >
                  <View style={styles.CardContainer}>  
                        <MaterialIcons name="electric-car" size={40} color="black" > <Text style={styles.CardTitle}>충전 기록하기</Text></MaterialIcons>
                  </View>
 
            </View> 


            <View style={{ flex: 1, flexDirection: 'column'}}>
                  
                  <View style={styles.CardContainer}>  
                  <MaterialCommunityIcons name="map-marker" size={40} color="black" > <Text style={styles.CardTitle}>인근 충전소 찾기</Text></MaterialCommunityIcons> 
                  
                  </View>
      
            </View> 


            <View style={{ flex: 1, flexDirection: 'row'}}>
                  
                  <View style={styles.CardContainer}>  
                  <MaterialCommunityIcons name="map-marker" size={40} color="black" > <Text style={styles.CardTitle}>선호하는 충전소1</Text></MaterialCommunityIcons> 
                  
                  </View>
                  
                  
                  <View style={styles.CardContainer}>  
                  <MaterialIcons name="electric-car" size={40} color="black" > <Text style={styles.CardTitle}>선호하는 충전소2</Text></MaterialIcons>
                  
                  </View>

            </View> 


              
            <View style={{ flex: 1, flexDirection: 'row'}}>
                  
                  <View style={styles.CardContainer}>  
                  <MaterialCommunityIcons name="map-marker" size={40} color="black" > <Text style={styles.CardTitle}>자유게시판</Text></MaterialCommunityIcons> 
                  
                  </View>
                  
                  
                  <View style={styles.CardContainer}>  
                  <MaterialIcons name="electric-car" size={40} color="black" > <Text style={styles.CardTitle}>우리 동네 게시판</Text></MaterialIcons>
                  
                  </View>

            </View> 


              
            <View style={{ flex: 1, flexDirection: 'column'}}>
                  
                  <View style={styles.CardContainer}>  
                  <MaterialCommunityIcons name="map-marker" size={40} color="black" > <Text style={styles.CardTitle}>인근장소 추천</Text></MaterialCommunityIcons> 
                  
                  </View>
      
            </View> 


            <View style={{ flex: 1, flexDirection: 'column'}}>
                  
                  <View style={styles.CardContainer}>  
                  <MaterialCommunityIcons name="map-marker" size={40} color="black" > <Text style={styles.CardTitle}>개인 충전 패턴 분석</Text></MaterialCommunityIcons> 
                  </View>
      
            </View> 


            <View style={{ flex: 1, flexDirection: 'column'}}>
                  <View style={styles.CardContainer}>  
                  <MaterialCommunityIcons name="map-marker" size={40} color="black" > <Text style={styles.CardTitle}>차종별 충전 패턴 분석</Text></MaterialCommunityIcons> 
                  </View>
            </View> 
      </View>
 );
}
const styles = StyleSheet.create({
  CardContainer: {

      flex: 1,
      elevation: 5,
    backgroundColor: 'white',
    borderRadius: 7,
      borderWidth: 0.5,
      borderColor: 'black',
      margin: 5,
      flexDirection: 'column',
      alignItems: 'stretch'
      
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


export default HomeView;