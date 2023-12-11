import { Button, Keyboard, StyleSheet, Text, View, TouchableWithoutFeedback, KeyboardAvoidingView, ScrollView, Image } from 'react-native';

export default function SignInScreen() {
 
return (
  <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View>
          <Text>Encore toi ?</Text>
          <Text>Connecte-toi</Text>
          <Image
                    style={styles.image}
                    source={require('../assets/logo.png')}
                />
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
  width: 450, 
  height: 450,
  marginRight: 20,
},
});