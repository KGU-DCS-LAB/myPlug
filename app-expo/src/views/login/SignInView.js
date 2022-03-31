import { Center, Box, Heading, VStack, FormControl, Input, Pressable, Button, HStack, Text } from "native-base"

const SignInView = () => {
    return (
        <Center w="100%" h="100%">
            <Box safeArea p="2" w="90%" maxW="290" py="8">
                <Heading size="lg" color="coolGray.800" _dark={{
                    color: "warmGray.50"
                }} fontWeight="semibold">
                    Welcome
                </Heading>
                <Heading mt="1" color="coolGray.600" _dark={{
                    color: "warmGray.200"
                }} fontWeight="medium" size="xs">
                    Sign up to continue!
                </Heading>
                <VStack space={3} mt="5">
                    <FormControl>
                        <FormControl.Label>이름</FormControl.Label>
                        <Input />
                    </FormControl>
                    <FormControl>
                        <FormControl.Label>아이디</FormControl.Label>
                        <Input />
                    </FormControl>
                    <FormControl>
                        <FormControl.Label>비밀번호</FormControl.Label>
                        <Input type="password" />
                    </FormControl>
                    <FormControl>
                        <FormControl.Label>비밀번호 확인</FormControl.Label>
                        <Input type="password" />
                    </FormControl>
                    <FormControl>
                        <FormControl.Label>닉네임</FormControl.Label>
                        <Input />
                    </FormControl>
                    <FormControl>
                        <FormControl.Label>생년월일</FormControl.Label>
                        {/* <Pressable onPress={showDatePicker}>
                            <Input
                                value={UserBirthDay}
                                returnKeyType="next"
                                editable={false}
                                blurOnSubmit={false}
                            />
                            <DateTimePickerModal
                                isVisible={isDatePickerVisible}
                                headerTextIOS={'생년월일'}
                                mode="date"
                                onConfirm={handleConfirm}
                                onCancel={hideDatePicker}
                            />
                        </Pressable> */}
                    </FormControl>
                    <Button mt="2" colorScheme="indigo">
                        Sign up
                    </Button>
                </VStack>
            </Box>
        </Center>
    );
}

export default SignInView;