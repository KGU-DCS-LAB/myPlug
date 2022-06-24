import React, { useState, useEffect, Component } from 'react'; 
import { StyleSheet, View, Text, Modal, Pressable, Alert, TouchableWithoutFeedback, TouchableOpacity  } from "react-native";
import { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import MapView from "react-native-map-clustering";
import { MaterialIcons } from '@expo/vector-icons'; 

class EvChargerMapView extends React.Component {

  setSmallModalVisible = (visible) => {
    this.setState({ smallModalVisible: visible });
  }

  setBigModalVisible = (visible) => {
    this.setState({ bigModalVisible: visible });
  }

  setCheck = (check) => {
    this.setState({check:check});
  }

  setChargingStation = (station) => {
    this.setState({station: station})
  }


  constructor(props) {
    super(props);

    //지도 스타일은 추후에 바깥으로 빼는 것을 고려해야 할 것으로 보임. 코드가 너무 길어서 뒤에 내용이 하나도 안보임
    const MapStyle = [    ]

    this.state = {
      charging_stations : JSON.parse(props.charging_stations), 
      station : '{}',
      MapStyle : MapStyle, 
      smallModalVisible : false,
      bigModalVisible : false,
      check:false, //나중에 회원가입 기능 생기면 수정 필요함
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

    const openBigModalView = () =>{
      this.setSmallModalVisible(!smallModalVisible);
      this.setBigModalVisible(!bigModalVisible);
    }

    const closeBigModalView = () =>{
      this.setBigModalVisible(!bigModalVisible);
      this.setSmallModalVisible(!smallModalVisible);
    }

    const SmallModalView = () => {
      const station = this.state.station;
      return(
        <Modal
        animationType="slide"
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
          
              <Text style={styles.modalText}>{station.statNm}
                <TouchableOpacity activeOpacity={0.8} onPress ={()=>this.setCheck(!this.state.check)}>

                <MaterialIcons name={this.state.check ? "star" : "star-border"} size={24} color={this.state.check ? "orange" : "black" } />

                {/* <MaterialIcons name="star" size={24} color="orange" /> */}
                </TouchableOpacity>
              </Text>
              <Text style={styles.modalTextAddress}>{station.addr}</Text>
              <View>
                {/* <Pressable
                  style={[styles.button, styles.buttonClose]}a
                  onPress={() => this.setSmallModalVisible(!smallModalVisible)}
                >
                  <Text style={styles.textStyle}>닫기</Text>
                </Pressable> */}
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={ () => openBigModalView() }
                >
                  <Text style={styles.textStyle}>상세보기</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      )
    }

    const BigModalView = () => {
      const station = this.state.station;
      return(
        <Modal
          animationType="slide"
          transparent={true}
          visible={bigModalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            this.setBigModalVisible(!bigModalVisible);
          }}
        >
          <TouchableWithoutFeedback onPress={() => this.setBigModalVisible(!bigModalVisible)}>
            <View style={styles.flexEndView}>
              <View style={styles.bigModalView}>
                <Text>This is Big Modal</Text>
                <Text style={styles.modalText}>{station.statNm+"("+station.statId+")"}</Text>
                <Text>{station.addr}</Text>
                <Text>{station.busiCall}</Text>
                <Text>{station.busiId}</Text>
                <Text>{station.note?'note가 없습니다.':station.note}</Text>
                <Text>{station.parkingFree}</Text>
                <Text>{station.useTime}</Text>
                
                <View>
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={ () => closeBigModalView() }
                  >
                    <Text style={styles.textStyle}>Hide Modal</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      )
    }
  

    return (
      <View style={{ flex: 1 }}>
        <SmallModalView/>
        <BigModalView/>
        {/* 
        지도사용방법 : 
        https://github.com/react-native-maps/react-native-maps
        https://github.com/venits/react-native-map-clustering
        */}
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
            coordinate={{latitude:Number(marker.lat), longitude:Number(marker.lng)}}
            title={marker.statNm}
            description={marker.addr}
            onPress={
              () => {
                this.setSmallModalVisible(true);
                this.setChargingStation(marker);
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
    height: '95%',
    margin: 5,
    marginBottom : 0,
    backgroundColor: "white",
    borderRadius: 10,
    borderBottomLeftRadius : 0,
    borderBottomRightRadius : 0,
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
    marginBottom: 20,
    textAlign: "center",
    fontSize : 20,

  },
  modalTextAddress: {
    marginBottom: 28,
    textAlign: "center",
    fontSize : 15,

  }
});




export default EvChargerMapView;