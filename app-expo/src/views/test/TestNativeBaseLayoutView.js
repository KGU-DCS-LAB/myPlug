/* 디자인 테스트 */

import React from 'react';
import { 
  AspectRatio, 
  Box, 
  Button, 
  Center, 
  Container, 
  Divider, 
  Flex,
  Heading, 
  HStack,
  Icon, 
  Image, 
  Ionicons,
  ScrollView, 
  Spacer,
  Stack, 
  Text, 
  VStack,
  ZStack
} from "native-base";


export default function TestNativeBaseView() {

    const BoxBasicExample = () => {
        return (
            <Box>
                <Box 
                alignSelf="center" 
                bg="primary.500" 
                _text={{
                    fontSize: "md",
                    fontWeight: "medium",
                    color: "warmGray.50",
                    letterSpacing: "lg"
                }}>
                    This is a Box
                </Box>
            </Box>
        );
    };

    const BoxCompositionExample = () => {
        return <Box alignItems="center">
            <Box maxW="80" rounded="lg" overflow="hidden" borderColor="coolGray.200" borderWidth="1" _dark={{
            borderColor: "coolGray.600",
            backgroundColor: "gray.700"
          }} _web={{
            shadow: 2,
            borderWidth: 0
          }} _light={{
            backgroundColor: "gray.50"
          }}>
              <Box>
                <AspectRatio w="100%" ratio={16 / 9}>
                  <Image source={{
                  uri: "https://www.holidify.com/images/cmsuploads/compressed/Bangalore_citycover_20190613234056.jpg"
                }} alt="image" />
                </AspectRatio>
                <Center bg="violet.500" _dark={{
                bg: "violet.400"
              }} _text={{
                color: "warmGray.50",
                fontWeight: "700",
                fontSize: "xs"
              }} position="absolute" bottom="0" px="3" py="1.5">
                  PHOTOS
                </Center>
              </Box>
              <Stack p="4" space={3}>
                <Stack space={2}>
                  <Heading size="md" ml="-1">
                    The Garden City
                  </Heading>
                  <Text fontSize="xs" _light={{
                  color: "violet.500"
                }} _dark={{
                  color: "violet.400"
                }} fontWeight="500" ml="-0.5" mt="-1">
                    The Silicon Valley of India.
                  </Text>
                </Stack>
                <Text fontWeight="400">
                  Bengaluru (also called Bangalore) is the center of India's high-tech
                  industry. The city is also known for its parks and nightlife.
                </Text>
                <HStack alignItems="center" space={4} justifyContent="space-between">
                  <HStack alignItems="center">
                    <Text color="coolGray.600" _dark={{
                    color: "warmGray.200"
                  }} fontWeight="400">
                      6 mins ago
                    </Text>
                  </HStack>
                </HStack>
              </Stack>
            </Box>
          </Box>;
      };

      function ContainerExample() {
        return <Center>
            <Container>
              <Heading>
                A component library for the
                <Text color="emerald.500"> React Ecosystem</Text>
              </Heading>
              <Text mt="3" fontWeight="medium">
                NativeBase is a simple, modular and accessible component library that
                gives you building blocks to build you React applications.
              </Text>
            </Container>
          </Center>;
      }

  function HStackRowExample() {
    return <HStack space={3} justifyContent="center">
        <Center h="40" w="20" bg="primary.300" rounded="md" shadow={3} />
        <Center h="40" w="20" bg="primary.500" rounded="md" shadow={3} />
        <Center h="40" w="20" bg="primary.700" rounded="md" shadow={3} />
      </HStack>;
  }

      //@ts-nocheck
function StackExample() {
    return (
      <VStack space="2.5" mt="4" px="8">
      <Heading size="md">row</Heading>
      <Stack direction="row" mb="2.5" mt="1.5" space={3}>
        <Center size="16" bg="primary.400" rounded="sm" _text={{
        color: "warmGray.50",
        fontWeight: "medium"
      }} shadow={"3"}>
          Box 1
        </Center>
        <Center bg="primary.500" size="16" rounded="sm" _text={{
        color: "warmGray.50",
        fontWeight: "medium"
      }} shadow={"3"}>
          Box 2
        </Center>
        <Center size="16" bg="primary.700" rounded="sm" _text={{
        color: "warmGray.50",
        fontWeight: "medium"
      }} shadow={"3"}>
          Box 3
        </Center>
      </Stack>
      <Divider />
      <Heading size="md">column</Heading>
      <Stack mb="2.5" mt="1.5" direction="column" space={3}>
        <Center size="16" bg="primary.400" rounded="sm" _text={{
        color: "warmGray.50",
        fontWeight: "medium"
      }} shadow={"3"}>
          Box 1
        </Center>
        <Center bg="primary.500" size="16" rounded="sm" _text={{
        color: "warmGray.50",
        fontWeight: "medium"
      }} shadow={"3"}>
          Box 2
        </Center>
        <Center size="16" bg="primary.700" rounded="sm" _text={{
        color: "warmGray.50",
        fontWeight: "medium"
      }} shadow={"3"}>
          Box 3
        </Center>
      </Stack>
      <Divider />
      <Heading size="md">row-reverse</Heading>
      <Stack mb="2.5" mt="1.5" direction="row" reversed space={3}>
        <Center size="16" bg="primary.400" rounded="sm" _text={{
        color: "warmGray.50",
        fontWeight: "medium"
      }} shadow={"3"}>
          Box 1
        </Center>
        <Center bg="primary.500" size="16" rounded="sm" _text={{
        color: "warmGray.50",
        fontWeight: "medium"
      }} shadow={"3"}>
          Box 2
        </Center>
        <Center size="16" bg="primary.700" rounded="sm" _text={{
        color: "warmGray.50",
        fontWeight: "medium"
      }} shadow={"3"}>
          Box 3
        </Center>
      </Stack>
      <Divider />
      <Heading size="md">column-reverse</Heading>
      <Stack mb="2.5" mt="1.5" direction="column-reverse" space={3}>
        <Center size="16" bg="primary.400" rounded="sm" _text={{
        color: "warmGray.50",
        fontWeight: "medium"
      }} shadow={"3"}>
          Box 1
        </Center>
        <Center bg="primary.500" size="16" rounded="sm" _text={{
        color: "warmGray.50",
        fontWeight: "medium"
      }} shadow={"3"}>
          Box 2
        </Center>
        <Center size="16" bg="primary.700" rounded="sm" _text={{
        color: "warmGray.50",
        fontWeight: "medium"
      }} shadow={"3"}>
          Box 3
        </Center>
      </Stack>
      <Divider />
    </VStack>
    );
  }

  function FlexExample() {
    return <Box flex="1" safeAreaTop>
        <ScrollView>
          <VStack space={2.5} w="100%" px="3">
            {
            /* flexDirection -> row */
          }
            <Heading size="md">row</Heading>
            <Flex direction="row" mb="2.5" mt="1.5" _text={{
            color: "coolGray.800"
          }}>
              <Center size="16" bg="primary.100">
                100
              </Center>
              <Center size="16" bg="primary.200">
                200
              </Center>
              <Center bg="primary.300" size="16">
                300
              </Center>
              <Center size="16" bg="primary.400">
                400
              </Center>
            </Flex>
            <Divider />
            {
            /* flexDirection -> column */
          }
            <Heading size="md">column</Heading>
  
            <Flex direction="column" mb="2.5" mt="1.5" _text={{
            color: "coolGray.800"
          }}>
              <Center size="16" bg="primary.100">
                100
              </Center>
              <Center size="16" bg="primary.200">
                200
              </Center>
              <Center bg="primary.300" size="16">
                300
              </Center>
              <Center size="16" bg="primary.400">
                400
              </Center>
            </Flex>
            <Divider />
            {
            /* flexDirection -> row-reverse */
          }
            <Heading size="md">row-reverse</Heading>
            <Flex direction="row-reverse" mb="2.5" mt="1.5" _text={{
            color: "coolGray.800"
          }}>
              <Center size="16" bg="primary.100">
                100
              </Center>
              <Center size="16" bg="primary.200">
                200
              </Center>
              <Center bg="primary.300" size="16">
                300
              </Center>
              <Center size="16" bg="primary.400">
                400
              </Center>
            </Flex>
            <Divider />
            {
            /* flexDirection -> column-reverse */
          }
            <Heading size="md">column-reverse</Heading>
            <Flex direction="column-reverse" mb="2.5" mt="1.5" _text={{
            color: "coolGray.800"
          }}>
              <Center size="16" bg="primary.100">
                100
              </Center>
              <Center size="16" bg="primary.200">
                200
              </Center>
              <Center bg="primary.300" size="16">
                300
              </Center>
              <Center size="16" bg="primary.400">
                400
              </Center>
            </Flex>
            <Divider />
          </VStack>
        </ScrollView>
      </Box>;
  }

  const FlexUsingTheSpacerExample = () => {
    return <Flex h={40} alignItems="center">
        <Center size={16} bg="primary.500" _dark={{
        bg: "primary.400"
      }} rounded="sm" _text={{
        color: "warmGray.50",
        fontWeight: "medium"
      }}>
          Box 1
        </Center>
        <Spacer />
        <Center size={16} bg="secondary.500" _dark={{
        bg: "secondary.400"
      }} rounded="sm" _text={{
        color: "warmGray.50",
        fontWeight: "medium"
      }}>
          Box 2
        </Center>
      </Flex>;
  };

  function VStackColumnExample() {
    return <VStack space={4} alignItems="center">
        <Center w="64" h="20" bg="indigo.300" rounded="md" shadow={3} />
        <Center w="64" h="20" bg="indigo.500" rounded="md" shadow={3} />
        <Center w="64" h="20" bg="indigo.700" rounded="md" shadow={3} />
      </VStack>;
  }

  const ZStackBasicExample = () => {
    return <Center h="40">
        <Box mt="-32">
          <ZStack mt="3" ml={-50}>
            <Box bg="primary.700" size="20" rounded="lg" shadow={3} />
            <Box bg="primary.500" mt="5" ml="5" size="20" rounded="lg" shadow={5} />
            <Box bg="primary.300" mt="10" ml="10" size="20" rounded="lg" shadow={7} />
          </ZStack>
        </Box>
      </Center>;
  };

  const ZStackItemsCenteredExample = () => {
    return <Center h="96">
        <ZStack alignItems="center" justifyContent="center">
          <Box bg="indigo.700" size="64" rounded="lg" />
          <Box bg="indigo.500" size="48" rounded="lg" shadow={8} />
          <Box bg="indigo.300" size="32" rounded="lg" shadow={8} />
        </ZStack>
      </Center>;
  };

    return (
    <ScrollView>
        <BoxBasicExample/>
        <ContainerExample/>
        <BoxCompositionExample/>
        <HStackRowExample/>
        <StackExample/>
        <FlexExample/>
        <FlexUsingTheSpacerExample/>
        <VStackColumnExample/>
        <ZStackBasicExample/>
        <ZStackItemsCenteredExample/>
    </ScrollView>
    );
}
