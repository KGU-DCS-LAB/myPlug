import React from 'react';
import { NativeBaseProvider } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import MainContainer from './src/containers/main/MainContainer';

const App = () => {
  return (
    <SafeAreaView style={styles.AndroidSafeArea}>
      <NativeBaseProvider>
        <NavigationContainer>
          <MainContainer />
        </NavigationContainer>
      </NativeBaseProvider>
    </SafeAreaView>
  )
}

export default App;

const styles = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  },
});