import { View } from "native-base"
import { Center, Box, Heading, VStack, FormControl, Input, Link, Button, HStack, Text } from "native-base"

const LoginView = ( props ) => {
    return (
        <Center w="100%" h="100%">
            <Box safeArea p="2" py="8" w="90%" maxW="290">
                <Heading size="lg" fontWeight="600" color="coolGray.800" _dark={{
                    color: "warmGray.50"
                }}>
                    Welcome
                </Heading>
                <Heading mt="1" _dark={{
                    color: "warmGray.200"
                }} color="coolGray.600" fontWeight="medium" size="xs">
                    Sign in to continue!
                </Heading>

                <VStack space={3} mt="5">
                    <FormControl>
                        <FormControl.Label>Email ID</FormControl.Label>
                        <Input />
                    </FormControl>
                    <FormControl>
                        <FormControl.Label>Password</FormControl.Label>
                        <Input type="password" />
                        <Link _text={{
                            fontSize: "xs",
                            fontWeight: "500",
                            color: "indigo.500"
                        }} alignSelf="flex-end" mt="1">
                            비밀번호 찾기
                        </Link>
                    </FormControl>
                    <Button mt="2" colorScheme="indigo">
                        로그인
                    </Button>
                    <HStack mt="6" justifyContent="center">
                        <Link _text={{
                            color: "indigo.500",
                            fontWeight: "medium",
                            fontSize: "sm"
                        }} 
                        onPress={() => props.navigation.navigate('SignIn')}>
                            회원가입
                        </Link>
                    </HStack>
                </VStack>
            </Box>
        </Center>
    )
}

export default LoginView;