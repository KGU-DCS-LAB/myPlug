import { Center, Box, Heading, VStack, FormControl, Input, Pressable, Button, HStack, Text } from "native-base"
import { useState } from "react";
import DateTimePicker from '@react-native-community/datetimepicker';

Date.prototype.format = function (f) {
    if (!this.valueOf()) return " ";

    const weekName = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
    let d = this;

    return f.replace(/(yyyy|yy|MM|dd|E|hh|mm|ss|a\/p)/gi, function ($1) {
        switch ($1) {
            case "yyyy": return d.getFullYear();
            case "yy": return (d.getFullYear() % 1000).zf(2);
            case "MM": return (d.getMonth() + 1).zf(2);
            case "dd": return d.getDate().zf(2);
            case "E": return weekName[d.getDay()];
            case "HH": return d.getHours().zf(2);
            case "hh": return ((h = d.getHours() % 12) ? h : 12).zf(2);
            case "mm": return d.getMinutes().zf(2);
            case "ss": return d.getSeconds().zf(2);
            case "a/p": return d.getHours() < 12 ? "오전" : "오후";
            default: return $1;
        }
    });
}

String.prototype.string = function (len) { var s = '', i = 0; while (i++ < len) { s += this; } return s; };
String.prototype.zf = function (len) { return "0".string(len - this.length) + this; };
Number.prototype.zf = function (len) { return this.toString().zf(len); };

const SignInView = () => {
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [BirthDay, setBirthDay] = useState(new Date());

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShow(false);
        setBirthDay(currentDate);
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    }

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
                        <Pressable onPress={showDatepicker}>
                            <Input
                                value={BirthDay.format('yyyy-MM-dd')}
                                returnKeyType="next"
                                editable={false}
                                blurOnSubmit={false}
                            />
                            {show && (
                                <DateTimePicker
                                    testID="dateTimePicker"
                                    value={BirthDay}
                                    mode={mode}
                                    is24Hour={true}
                                    onChange={onChange}
                                />
                            )}
                        </Pressable>
                    </FormControl>
                    <Button mt="2" colorScheme="indigo">
                        회원가입
                    </Button>
                </VStack>
            </Box>
        </Center>
    );
}

export default SignInView;