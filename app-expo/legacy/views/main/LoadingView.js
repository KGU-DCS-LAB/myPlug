import ToastBasic from "../../components/Loading/ToastBasic";
import { StyleSheet, Text, View } from 'react-native';

export default (props) => {
    return(
        <View style={styles.container}>
            <Text style={styles.paragraph}>myPlug</Text>
            <ToastBasic seconds={props.seconds}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
    },
    paragraph: {
        fontSize: 18,
        textAlign: 'center',
      },
});
