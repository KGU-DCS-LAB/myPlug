import { 
    Heading,
    HStack,
    Spinner
  } from "native-base";
  
export default (props) => {
    return(
        <HStack space={2} justifyContent="center">
          <Spinner accessibilityLabel="Loading posts" />
        </HStack>
    )
}