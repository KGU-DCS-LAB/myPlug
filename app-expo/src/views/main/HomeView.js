import * as React from 'react';
import 'react-native-gesture-handler';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { 
      Box,
      Center, 
      HStack, 
      VStack 
} from "native-base";

const HomeView = (props) => {
  return (
  <>
      <HStack space={2} justifyContent="center">
            {/* TouchableOpacity 는 View와 동일한 역할을 합니다. 리스너 담으려고 넣음 */}
            <TouchableOpacity
                  style={styles.CardContainer}
                  onPress={() => props.navigation.navigate('EvCharger')}
            >
                  <Box h="40" w="40" bg="primary.300" rounded="md" shadow={3}>
                        <MaterialCommunityIcons name="map-marker" size={40} color="black" > <Text style={styles.CardTitle}>충전소 지도</Text></MaterialCommunityIcons> 
                  </Box>
            </TouchableOpacity >
            <TouchableOpacity
                  style={styles.CardContainer}
                  onPress={() => props.navigation.navigate('EvCharger')}
            >
                  <Box h="40" w="40" bg="primary.500" rounded="md" shadow={3}>
                        <MaterialIcons name="electric-car" size={40} color="black" > <Text style={styles.CardTitle}>충전 기록하기</Text></MaterialIcons>
                  </Box>
            </TouchableOpacity >
      </HStack>
      <VStack space={4} alignItems="center">
            <Center w="64" h="20" bg="indigo.300" rounded="md" shadow={3}>
                  <MaterialIcons name="my-location" size={24} color="black" />
                  <Text>수원시 영통구 이의동 </Text>
            </Center>
            <TouchableOpacity onPress={() => props.navigation.navigate('Test')}>
                  <Center w="64" h="20" bg="indigo.500" rounded="md" shadow={3}>
                        <Text>|테스트 메뉴로 이동하기|</Text>
                  </Center>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => props.navigation.navigate('Docs')}>
                  <Center w="64" h="20" bg="indigo.500" rounded="md" shadow={3}>
                        <Text>|Documents로 이동하기|</Text>
                  </Center>
            </TouchableOpacity>
      </VStack>
      </>
 );
}
const styles = StyleSheet.create({

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