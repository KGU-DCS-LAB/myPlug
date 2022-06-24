/* 디자인 테스트 */

import React from 'react';
import { 
  AspectRatio, 
  Box, 
  Button, 
  Center, 
  Container, 
  Divider, 
  Heading, 
  HStack,
  Icon, 
  Image, 
  Ionicons,
  ScrollView, 
  Stack, 
  Text, 
  VStack,
  ZStack
} from "native-base";


export default function TestNativeBaseFormsView() {

  const Example9 = () => {
    return <Box alignItems="center">
        <Button onPress={() => console.log("hello world")}>Click Me</Button>
      </Box>;
  };

  const Example10 = () => {
    return <ScrollView showsVerticalScrollIndicator={false} px="3">
        <VStack w="100%" space={4} px="2" mt="4" alignItems="center" justifyContent="center">
          {
          /* Solid */
        }
          <Heading size="md">Solid</Heading>
          <Stack mb="2.5" mt="1.5" direction={{
          base: "column",
          md: "row"
        }} space={2} mx={{
          base: "auto",
          md: "0"
        }}>
            <Button size="sm">PRIMARY</Button>
            <Button size="sm" colorScheme="secondary">
              SECONDARY
            </Button>
            <Button size="sm" isDisabled>
              DISABLED
            </Button>
          </Stack>
  
          <Divider w="100%" />
  
          <Heading size="md">Subtle</Heading>
  
          {
          /* Subtle */
        }
          <Stack mb="2.5" mt="1.5" direction={{
          base: "column",
          md: "row"
        }} space={2} mx={{
          base: "auto",
          md: "0"
        }}>
            <Button size="sm" variant="subtle">
              PRIMARY
            </Button>
            <Button size="sm" variant="subtle" colorScheme="secondary">
              SECONDARY
            </Button>
            <Button size="sm" variant="subtle" isDisabled>
              DISABLED
            </Button>
          </Stack>
          <Divider />
          <Heading size="md">Outline</Heading>
  
          {
          /* Outline */
        }
          <Stack mb="2.5" mt="1.5" direction={{
          base: "column",
          md: "row"
        }} space={2} mx={{
          base: "auto",
          md: "0"
        }}>
            <Button size="sm" variant="outline">
              PRIMARY
            </Button>
            <Button size="sm" variant="outline" colorScheme="secondary">
              SECONDARY
            </Button>
            <Button size="sm" variant="outline" isDisabled>
              DISABLED
            </Button>
          </Stack>
          <Divider w="100%" />
  
          <Heading size="md">Link</Heading>
  
          {
          /* Link */
        }
          <Stack mb="2.5" mt="1.5" direction={{
          base: "column",
          md: "row"
        }} space={2} mx={{
          base: "auto",
          md: "0"
        }}>
            <Button size="sm" variant="link">
              PRIMARY
            </Button>
            <Button size="sm" variant="link" colorScheme="secondary">
              SECONDARY
            </Button>
            <Button size="sm" variant="link" isDisabled>
              DISABLED
            </Button>
          </Stack>
          <Divider w="100%" />
  
          <Heading size="md">Ghost</Heading>
  
          {
          /* Ghost */
        }
          <Stack mb="2.5" mt="1.5" direction={{
          base: "column",
          md: "row"
        }} space={2} mx={{
          base: "auto",
          md: "0"
        }}>
            <Button size="sm" variant="ghost">
              PRIMARY
            </Button>
            <Button size="sm" variant="ghost" colorScheme="secondary">
              SECONDARY
            </Button>
            <Button size="sm" variant="ghost" isDisabled>
              DISABLED
            </Button>
          </Stack>
  
          <Divider w="100%" />
  
          <Heading size="md">Unstyled</Heading>
  
          {
          /* Unstyled */
        }
          <Stack mb="2.5" mt="1.5" direction={{
          base: "column",
          md: "row"
        }} space={2} mx={{
          base: "auto",
          md: "0"
        }}>
            <Button variant="unstyled">Unstyled</Button>
          </Stack>
        </VStack>
      </ScrollView>;
  };

  const Example12 = () => {
    return <Stack direction={{
      base: "column",
      md: "row"
    }} space={2} alignItems={{
      base: "center",
      md: "flex-start"
    }}>
        <Button isLoading>Button</Button>
        <Button isLoading isLoadingText="Submitting">
          Button
        </Button>
        <Button isLoading spinnerPlacement="end" isLoadingText="Submitting">
          Button
        </Button>
        <Button isLoading _loading={{
        bg: "amber.400:alpha.70",
        _text: {
          color: "coolGray.700"
        }
      }} _spinner={{
        color: "white"
      }} isLoadingText="Submitting">
          Button
        </Button>
        <Button isLoading isLoadingText="Submitting" variant="outline">
          Button
        </Button>
      </Stack>;
  };

  const Example11 = () => {
    return <Stack direction={{
      base: "column",
      md: "row"
    }} space={4}>
        <Button leftIcon={<Icon as={Ionicons} name="cloud-upload-outline" size="sm" />}>
          Upload
        </Button>
        <Button variant="subtle" endIcon={<Icon as={Ionicons} name="cloud-download-outline" size="sm" />}>
          Download
        </Button>
      </Stack>;
  };




    return (
    <ScrollView>
        <Example9/>
        <Example10/>
        <Example11/>
        <Example12/>
    </ScrollView>
    );
}
