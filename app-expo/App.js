import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainRoute from './src/routes/main/MainRoute';


function App() {
  return (
    <NavigationContainer>
      <MainRoute/>
    </NavigationContainer>
  );
}


export default App;
