import React from 'react';
import MainRoute from './src/routes/main/MainRoute';
import { NativeBaseProvider } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
       <MainRoute/>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}