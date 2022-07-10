import { useEffect, useState } from "react";
import { Center, Heading, Box, View, Button, VStack, FormControl, Input, HStack, Link, Text } from "native-base";
import { StyleSheet, Alert } from "react-native";
import { config } from '../../../config';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const LoginContainer = (props) => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');

    const signIn = () => {
        if (!userId) {
            Alert.alert('아이디를 입력해주세요.');
            return;
        }
        if (!password) {
            Alert.alert('비밀번호를 입력해주세요.');
            return;
        }

        axios.post(config.ip + ':5000/usersRouter/findOne', {
            data: {
                user_id: userId
            }
        }).then((response) => {
            if (!response.data) {
                alert('존재하지 않는 아이디입니다.');
            } else {
                console.log(response.data[0]);
                if (response.data[0].password === password) {
                    setDate(response.data);
                } else {
                    alert('비밀번호가 일치하지 않습니다.');
                }
            }
        }).catch(function (error) {
            console.log(error);
        })
    }

    const setDate = async (user) => {
        try {
            await AsyncStorage.setItem('userInfo', JSON.stringify(user), () => {console.log('유저 정보 저장')});
            props.navigation.replace('Home');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <Button title="홈으로" 
            onPress={() => props.navigation.navigate('Home')}>홈으로</Button>
            <View style={styles.container}>
            <Box safeArea p="2" py="8" w="90%" maxW="290">
              <Heading size="lg" fontWeight="600" color="coolGray.800" _dark={{
              color: "warmGray.50"
            }}>
                로그인
              </Heading>
      
              <VStack space={3} mt="5">
                <FormControl>
                  <FormControl.Label>아이디</FormControl.Label>
                  <Input onChangeText={(value) => setUserId(value)} />
                </FormControl>
                <FormControl>
                  <FormControl.Label>비밀번호</FormControl.Label>
                  <Input type="password" onChangeText={(value) => setPassword(value)} />
                </FormControl>
                <Button mt="2" colorScheme="indigo" onPress={() => signIn()}>
                  로그인
                </Button>
                <HStack mt="6" justifyContent="center">
                  <Link _text={{
                  color: "indigo.500",
                  fontWeight: "medium",
                  fontSize: "sm"
                }} onPress={() => props.navigation.navigate('SignUp')}>
                    회원가입
                  </Link>
                </HStack>
              </VStack>
            </Box>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    }
})
export default LoginContainer;