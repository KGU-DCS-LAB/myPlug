
import { Center, Text } from "native-base";
import { ActivityIndicator, Dimensions, StyleSheet, View } from "react-native";

export default (props) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" />
      <Center><Text>{props.description}</Text></Center>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center', //Centered horizontally
    alignItems: 'center', //Centered vertically
    flex: 1,
    backgroundColor:"white",
  }
});