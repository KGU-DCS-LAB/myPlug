import { 
    Heading,
    HStack,
    Spinner
  } from "native-base";
  
export default (props) => {
    return(
        <HStack space={2} justifyContent="center">
          <Spinner accessibilityLabel="Loading posts" />
          <Heading color="primary.500" fontSize="md">
            Loading... {props.seconds} seconds...
          </Heading>
        </HStack>
    )
}