import * as React from 'react';
import { StyleSheet, View, Text } from "react-native";
import LoadingView from '../../views/main/LoadingView';


class Loading extends React.Component {

    constructor(props) {
        super(props);
        console.log('loading constructor')
    }
    
    componentDidMount(){
      // 프로그램 최초 로딩 시 여기에서 모든 것을 불러와야함
      // 로딩뷰 렌더링 이후에 이 함수가 실행됨
      // 뒤로가기 방지 코딩이 필요
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