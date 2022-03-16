// import * as React from 'react';
// import { StyleSheet, View, Text } from "react-native";
// import LoadingView from '../../views/main/LoadingView';


import React, { useState, useEffect } from 'react';
import { Alert, Platform, Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import { 
  Heading,
  HStack,
  Spinner
} from "native-base";

class Loading extends React.Component {


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
        console.log('loading constructor')
        this.state = {
          props : props,
          location : null, 
          errorMsg : null, 
          latitude : null,
          longitude : null,
          seconds : 0,
        };
    }
    
    componentDidMount(){
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
        console.log(this.state.location); 
      };

      // 프로그램 최초 로딩 시 여기에서 모든 것을 불러와야함
      // 로딩뷰 렌더링 이후에 이 함수가 실행됨
      // 스택으로 등록되어 있으므로 뒤로가기 방지 코딩이 필요
      // 초기에는 setInteval 같은 코드로 로딩 화면이 뜬다는 것을 보여줄 필요도 있어보임
        console.log('loading componentDidMount')
        gps();
        let checkGPS = setInterval( (props) =>{
          if (this.state.location){
            console.log('location is not null! this interval is going to be clear.')
            this.state.props.navigation.navigate('Home');
            clearInterval(checkGPS);
          }
          else{
            if(this.state.seconds==15){
              Alert.alert('GPS를 제한 시간 내에 수신하지 못한 것 같습니다.');
              this.state.props.navigation.navigate('Home');
              clearInterval(checkGPS);
            }
            console.log('location is '+this.state.location);
            this.setSeconds(this.state.seconds+1);
          }
        }, 1000 );

    }

    render() {
      const ToastBasic = () => {
        return <HStack space={2} justifyContent="center">
            <Spinner accessibilityLabel="Loading posts" />
            <Heading color="primary.500" fontSize="md">
              Loading...{this.state.seconds}
            </Heading>
          </HStack>;
      };

      return (
        <View style={styles.container}>
          <Text>myPlug</Text>
          <ToastBasic/>
        </View>
        );
    }
}

export default Loading;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  paragraph: {
    fontSize: 18,
    textAlign: 'center',
  },
});
