import * as React from 'react';
import { StyleSheet, View, Text } from "react-native";
import LoadingView from '../../views/main/LoadingView';


class Loading extends React.Component {

    constructor(props) {
        super(props);
        console.log('loading constructor')
    }
    
    componentDidMount(){
        console.log('loading componentDidMount')
        this.props.navigation.navigate('Home');
    }

    render() {
        return (
          <LoadingView/>
        );
      }
}

export default Loading;