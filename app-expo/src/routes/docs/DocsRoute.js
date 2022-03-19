import * as React from 'react';
import { ScrollView, View } from 'react-native';
import { Box, Button } from "native-base";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Version_220319 from '../../views/documentation/Version_220319';
import Version_220318 from '../../views/documentation/Version_220318';
import DocsHomeView from '../../views/documentation/DocsHomeView';

function HomeScreen({ navigation }) {
    return (
      <ScrollView>
          <DocsHomeView/>
      </ScrollView>
    );
  }

  function Version_220318Screen({ navigation }) {
    return (
        <ScrollView>
          <Version_220318/>
        </ScrollView>
    );
  }
  
  function Version_220319Screen({ navigation }) {
    return (
        <ScrollView>
          <Version_220319/>
        </ScrollView>
    );
  }
  
  const Drawer = createDrawerNavigator();

const DocsRoute = (props) => {
    return (
        <>
            <Drawer.Navigator initialRouteName="Home">
                <Drawer.Screen name="Home" component={HomeScreen} />
                <Drawer.Screen name="Version_220318" component={Version_220318Screen} />
                <Drawer.Screen name="Version_220319" component={Version_220319Screen} />
            </Drawer.Navigator>
            <Box alignItems="center">
                <Button onPress={() => props.navigation.navigate('Home')}>메인으로</Button>
            </Box>
        </>
    );
  }
  
export default DocsRoute;