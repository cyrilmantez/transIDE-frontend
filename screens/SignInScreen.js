import { Button, StyleSheet, Text, View, TouchableWithoutFeedback, KeyboardAvoidingView, ScrollView, Image, Keyboard } from 'react-native';
import { useFonts, Poppins_400Regular } from '@expo-google-fonts/poppins';

export default function SignInScreen() {
 
return (
  <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View>
          <View style={styles.textContainer}>
            <Text style={styles.text1}>Encore toi ?</Text>
            <Text style={styles.text2}>Connecte-toi</Text>
          </View>
          <Image
            style={styles.image}
            source={require('../assets/logo.png')}
                />
          <View style={styles.inputContainer}>  

          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
 container: {
   flex: 1,
   alignItems: 'center',
   justifyContent: 'center',
 },
 image : {
  width: 200, 
  height: 200,
},
textContainer: {
  flex: 1,
  padding: '20',
},
text1: {
  textAlign: 'center',
  color: '#99BD8F',

},
text2: {
  textAlign: 'center',
  color: '#99BD8F',
  fontWeight: '900',
},
inputContainer: {
  flex : 1,
}
});