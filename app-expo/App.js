import React from 'react';
import MainRoute from './src/routes/main/MainRoute';
import { NativeBaseProvider } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet,StatusBar,SafeAreaView } from 'react-native';

export default function App() {
  return (
    <SafeAreaView style={styles.AndroidSafeArea}>
      <NativeBaseProvider>
        <NavigationContainer>
          <MainRoute/>
        </NavigationContainer>
      </NativeBaseProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  }
});