import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

function HomeView() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text>Home Screen!!!!!</Text>
    <Button
      title="Go to Details"
      onPress={() => navigation.navigate('Details')}
    />
  </View>
  );
}


export default HomeView;