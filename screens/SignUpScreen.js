import { Button, StyleSheet, Text, View } from 'react-native';

export default function SignUpScreen() {
 return (
   <View style={styles.container}>
     <Text >SignUp Screen</Text>
   </View>
 );
}

const styles = StyleSheet.create({
 container: {
   flex: 1,
   alignItems: 'center',
   justifyContent: 'center',
 },
});