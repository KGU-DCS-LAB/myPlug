import * as React from 'react';
import 'react-native-gesture-handler';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
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