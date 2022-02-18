import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Main from './src/routes/main/Main';

function App() {
  return (
    <NavigationContainer>
      <Main/>
    </NavigationContainer>
  );
}


export default App;
