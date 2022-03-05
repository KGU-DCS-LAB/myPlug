import * as React from 'react';
import { StyleSheet, View, Text } from "react-native";

class LoadingView extends React.Component {

    constructor(props) {
        super(props);
        console.log('loading view')
    }

    render() {
      // 로딩 화면을 여기에서 꾸며주세요!
        return (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <Text>MyPlug</Text>
              <Text>Loading...</Text>
          </View>
        );
      }
}

export default LoadingView;