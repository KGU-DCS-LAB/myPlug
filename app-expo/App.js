import React from 'react';
import { NativeBaseProvider } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import MainStack from './src/containers/main/MainStack';
import { store } from './src/app/redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaView style={styles.AndroidSafeArea}>
        <NativeBaseProvider>
          <NavigationContainer>
            <MainStack />
          </NavigationContainer>
        </NativeBaseProvider>
      </SafeAreaView>
    </Provider>
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