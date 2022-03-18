import React from 'react';
import MainRoute from './src/routes/main/MainRoute';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import { NativeBaseProvider } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { Alert, Platform, StyleSheet,StatusBar,SafeAreaView, Text, View } from 'react-native';
import { 
  Heading,
  HStack,
  Spinner
} from "native-base";
import LoadingView from './src/views/main/LoadingView';



class App extends React.Component{

  setLocation = (location) => {
    this.setState({ location: location });
  }
  setErrorMsg = (errorMsg) => {
    this.setState({ errorMsg: errorMsg });
  }
  setLatitude = (latitude) => {
    this.setState({ latitude: latitude });
  }
  setLongitude = (longitude) => {
    this.setState({ longitude: longitude });
  }
  setSeconds = (seconds) => {
    this.setState({ seconds: seconds });
  }

  constructor(props) {
    super(props);
    this.state = {
      location : null, 
      errorMsg : null, 
      latitude : 0,
      longitude : 0,
      seconds : 0,
    };
  }

  componentDidMount(){
    console.log('loading componentDidMount()')
    let gps = async () => {
      if (Platform.OS === 'android' && !Constants.isDevice) {
        setErrorMsg(
          'Oops, this will not work on Snack in an Android emulator. Try it on your device!'
        );
        return;
      }
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location2 = await Location.getCurrentPositionAsync({});
      this.setLocation(location2);
      this.setLatitude(location2.coords.latitude);
      this.setLongitude(location2.coords.longitude);
      console.log('[gps]')
      console.log(this.state.location); 
      console.log(this.state.latitude);
      console.log(this.state.longitude);
    };
    gps();
    let checkGPS = setInterval( (props) =>{
      if (this.state.location){
        console.log('[checkGPS]location is not null! this interval is going to be clear.')
        clearInterval(checkGPS);
      }
      else{
        if(this.state.seconds==15){
          Alert.alert('GPS를 제한 시간 내에 수신하지 못한 것 같습니다.');
          clearInterval(checkGPS);
        }
        console.log('location is '+this.state.location);
        this.setSeconds(this.state.seconds+1);
      }
    }, 1000 );
  }

  render() {

    const LoadingScreen = () => {
        return <LoadingView seconds={this.state.seconds}/>;
    }


    return (
      <SafeAreaView style={styles.AndroidSafeArea}>
        <NativeBaseProvider>
          <NavigationContainer>
          {this.state.location
            ? this.state.latitude==0 || this.state.longitude==0 ? <LoadingScreen/> : <MainRoute latitude={this.state.latitude} longitude={this.state.longitude}/>
            : <LoadingScreen/>
          }
          </NavigationContainer>
        </NativeBaseProvider>
      </SafeAreaView>
    );
  }
}

export default App;

const styles = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  },
});