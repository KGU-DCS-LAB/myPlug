import React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import {
    Box,
    useColorMode,
    Heading,
    HStack,
    Text,
    useBreakpointValue,
    Fab,
    Icon,
    useColorModeValue,
    MoonIcon,
    SunIcon,
    Stagger,
    IconButton,
} from 'native-base';
// import { mapping } from '../../config/map';
import { Dimensions, ScrollView, StatusBar } from 'react-native';
import { Layout } from '../../components/layout/Layout';
import { MasonaryLayout } from '../../components/layout/MansonaryLayout';
import { StoryBook } from '../../components/layout/StoryBook';
import PressableButton from '../../components/common/PressableButton';
// import { MasonaryLayout } from '../../components/MasonLayout/MasonaryLayout';
// import { MasonMobile } from '../../components/MasonLayout/mobile';
// import { MasonWeb } from '../../components/MasonLayout/web';
// import { Logo } from '../../components/Logo';
// import { StoryBook } from '../../components/StoryBook';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';
// import { Layout } from '../../components/Layout';

export default ({ navigation }) => {
    return (
        <>
            <Layout>
                <ScrollView
                    contentContainerStyle={{ width: '100%' }}
                    showsVerticalScrollIndicator={false}
                >
                    <MasonaryLayout
                        column={useBreakpointValue({
                            base: [1, 1],
                            sm: [1, 1],
                            md: [1, 1, 1],
                            // lg: [1, 1, 1, 1],
                            // xl: [1, 1, 1, 1, 1],
                        })}
                        _hStack={{
                            space: 4,
                            mb: 4,
                            pt: '70px',
                        }}
                        _vStack={{ space: 4 }}
                    >
                        {/* 컴포넌트가 올 자리 */}
                        {/* <StoryBook
                            navigation={navigation}
                            name="Actionsheet"
                            minH={32}
                            _box={{
                                lightGrad: ['cyan.400', 'teal.200'],
                                darkGrad: ['cyan.600', 'teal.300'],
                            }}
                            _heading={{
                                color: 'amber.100',
                            }}
                        /> */}
                        <PressableButton
                            width={10}
                            height={10}
                            onPress={() => console.log('헤헤')}
                            title="충전소 지도"
                        />
                        <PressableButton
                            width={10}
                            height={10}
                            onPress={() => console.log('헤헤')}
                            title="충전소 지도"
                        />
                        <PressableButton
                            width={10}
                            height={10}
                            onPress={() => console.log('헤헤')}
                            title="충전소 지도"
                        />
                        <PressableButton
                            width={10}
                            height={10}
                            onPress={() => console.log('헤헤')}
                            title="충전소 지도"
                        />
                        <PressableButton
                            width={10}
                            height={10}
                            onPress={() => console.log('헤헤')}
                            title="충전소 지도"
                        />
                    </MasonaryLayout>
                </ScrollView>
            </Layout>
        </>
    )
}