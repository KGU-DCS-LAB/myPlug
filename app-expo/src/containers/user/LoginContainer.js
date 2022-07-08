import { Center, Heading, Box, View, Button, VStack, FormControl, Input, HStack, Link, Text } from "native-base";
import { StyleSheet } from "react-native";

const LoginContainer = (props) => {

    const Container = () => {
        return <Center w="100%">
            <Box safeArea p="2" py="8" w="90%" maxW="290">
              <Heading size="lg" fontWeight="600" color="coolGray.800" _dark={{
              color: "warmGray.50"
            }}>
                로그인
              </Heading>
      
              <VStack space={3} mt="5">
                <FormControl>
                  <FormControl.Label>아이디</FormControl.Label>
                  <Input />
                </FormControl>
                <FormControl>
                  <FormControl.Label>비밀번호</FormControl.Label>
                  <Input type="password" />
                </FormControl>
                <Button mt="2" colorScheme="indigo">
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
          </Center>
      };

    return (
        <>
            <Button title="홈으로" 
            onPress={() => props.navigation.navigate('Home')}>홈으로</Button>
            <View style={styles.container}>
                <Container/>
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