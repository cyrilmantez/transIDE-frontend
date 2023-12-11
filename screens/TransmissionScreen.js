import { Button, StyleSheet, Text, View } from 'react-native';

export default function TransmissionScreen() {
 return (
   <View style={styles.container}>
     <Text>Transmission Screen</Text>
   </View>
 );
}

const styles = StyleSheet.create({
 container: {
   flex: 1,
   backgroundColor: '#fff',
   alignItems: 'center',
   justifyContent: 'center',
 },
});