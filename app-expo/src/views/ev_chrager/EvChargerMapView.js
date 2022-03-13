import React, { useState, useEffect, Component } from 'react'; 
import { StyleSheet, View, Text, Modal, Pressable, Alert, TouchableWithoutFeedback } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import axios from 'axios';

class EvChargerMapView extends React.Component {

  setSmallModalVisible = (visible) => {
    this.setState({ smallModalVisible: visible });
  }

  setBigModalVisible = (visible) => {
    this.setState({ bigModalVisible: visible });
  }

  setChargingStationName = (name)=>{
    this.setState({charging_station_name:name});
  }

  setChargingStationLocationDetail = (detail)=>{
    this.setState({charging_station_location_detail:detail});
  }


  constructor(props) {
    super(props);

    //지도 스타일은 추후에 바깥으로 빼는 것을 고려해야 할 것으로 보임. 코드가 너무 길어서 뒤에 내용이 하나도 안보임
    const MapStyle = [    ]

    this.state = {
      charging_stations : JSON.parse(props.charging_stations), 
      MapStyle : MapStyle, 
      smallModalVisible : false,
      bigModalVisible : false,
      charging_station_name : "charging_station_name",
      charging_station_location_detail : "charging_station_location_detail"
    };

  }

  componentDidMount(){
    // 지금은 state를 잘 못다뤄서 코드를 이따구로 짰는데 앞으로 바뀌어야 할 사항은 다음과 같음
    // 1. 지도에 marker 찍는 것은 지도가 rendering 된 이후에 이곳에서 수행해줘야 할 것 같음. (단, marker는 렌더링 속도를 위해서 로딩화면에서 미리 로컬로 받아오는 것이 매우 유리할 것)
    // 2. 지도에 marker를 찍자마자 해야할 것은 실시간 사용 여부를 실시간 서버로부터 받아야 함. 그것을 이 함수에서 업데이트 해줘야 한다고 생각함.
    // 3. 다시 정리하면 로딩화면에서 충전소 데이터 사전 수신 및 로컬 저장소에 저장 -> 구글 맵으로 부터 지도를 그림 -> 로컬 저장소로부터 충전소 데이터를 찍음 -> 충전소 데이터의 현재 상태를 요청해서 즉시 업데이트
  }

  render() {
    const { smallModalVisible } = this.state;
    const { bigModalVisible } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={smallModalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            this.setSmallModalVisible(!smallModalVisible);
          }}
        >
          <TouchableWithoutFeedback onPress={() => this.setSmallModalVisible(!smallModalVisible)}>
            <View style={styles.flexEndView}>
              <View style={styles.smallModalView}>
                <Text style={styles.modalText}>{this.state.charging_station_name}</Text>
                <Text>{this.state.charging_station_location_detail}</Text>
                <View>
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => this.setSmallModalVisible(!smallModalVisible)}
                  >
                    <Text style={styles.textStyle}>Hide Modal</Text>
                  </Pressable>
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => this.setBigModalVisible(!bigModalVisible)}
                  >
                    <Text style={styles.textStyle}>상세보기</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
        <Modal
          animationType="fade"
          transparent={true}
          visible={bigModalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            this.setBigModalVisible(!bigModalVisible);
          }}
        >
            <View style={styles.flexEndView}>
              <View style={styles.bigModalView}>
                <Text>This is Big Modal</Text>
                <Text style={styles.modalText}>{this.state.charging_station_name}</Text>
                <Text>{this.state.charging_station_location_detail}</Text>
                <View>
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => this.setBigModalVisible(!smallModalVisible)}
                  >
                    <Text style={styles.textStyle}>Hide Modal</Text>
                  </Pressable>
                </View>
              </View>
            </View>
        </Modal>
        <MapView
          initialRegion={{
          latitude: this.props.latitude,
          longitude: this.props.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        style={{ flex: 1 }}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        showsMyLocationButton={true}
        onMapReady={() => {
          // updateMapStyle()
        }}      
        customMapStyle={this.state.MapStyle}
        >
        {this.state.charging_stations.map((marker, index) => (
          <Marker
            key={index}
            coordinate={{latitude:Number(marker.charging_station_location_latitude), longitude:Number(marker.charging_station_location_longitude)}}
            title={marker.charging_station_name}
            description={marker.charging_station_location_detail}
            onPress={
              () => {
                this.setSmallModalVisible(true);
                this.setChargingStationName(marker.charging_station_name);
                this.setChargingStationLocationDetail(marker.charging_station_location_detail);
              }
            }
          />
        ))}
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  flexEndView:{
    flex: 1 ,
    flexDirection: 'column', 
    justifyContent: 'flex-end'
  },
  smallModalView: {
    height: 240,
    margin: 10,
    marginBottom : 60,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  bigModalView: {
    height: '85%',
    margin: 10,
    marginBottom : 60,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});




export default EvChargerMapView;