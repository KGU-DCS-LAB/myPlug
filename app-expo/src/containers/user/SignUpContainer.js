import React, { useState } from 'react';
import { Box, Heading, VStack, FormControl, Input, Button, Center, View } from "native-base";
import { StyleSheet, Alert } from "react-native";
import { config } from '../../../config'
import axios from 'axios';

const SignUpContainer = (props) => {
    const [userId, setUserId] = React.useState('');
    const [password, setPassword] = useState('');
    const [checkPassword, setCheckPassword] = useState('');
    const [name, setName] = useState('');

    const signUp = () => {
        if (!userId) {
            alert('아이디를 입력해주세요');
            return;
        }
        if (!password) {
            alert('비밀번호를 입력해주세요');
            return;
        }
        if (!checkPassword) {
            alert('비밀번호 확인을 입력해주세요');
            return;
        }
        if (password !== checkPassword) {
            alert('비밀번호가 일치하지 않습니다.');
            console.log(password);
            console.log(checkPassword);
            return;
        }
        if (!name) {
            alert('이름을 입력해주세요');
            return;
        }
        axios.post(config.ip + ':5000/usersRouter/save', {
            data: {
                user_id: userId,
                password: password,
                name: name,
            }
        }).then((response) => {
            if (response.data.status === 'success') {
                Alert.alert('회원가입 되었습니다.');
                props.navigation.navigate('Login');
            } else {
                alert('사용할 수 없는 아이디입니다.');
            }
        }).catch(function (error) {
            console.log(error);
        })
    }

    return (
        <>
            <Button title="홈으로" 
            onPress={() => props.navigation.navigate('Home')}>홈으로</Button>
            <View style={styles.container}>
            <Box safeArea p="2" w="90%" maxW="290" py="8">
              <Heading size="lg" color="coolGray.800" _dark={{
              color: "warmGray.50"
            }} fontWeight="semibold">
                회원가입
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
                <FormControl>
                    <FormControl.Label>비밀번호 확인</FormControl.Label>
                        <Input type="password" onChangeText={(value) => setCheckPassword(value)} />
                    </FormControl>
                    <FormControl>
                        <FormControl.Label>이름</FormControl.Label>
                        <Input onChangeText={(value) => setName(value)} />
                    </FormControl>
                <Button mt="2" colorScheme="indigo" onPress={() => signUp()}>
                  회원가입
                </Button>
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
export default SignUpContainer;