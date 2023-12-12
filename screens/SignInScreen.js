import { Button, StyleSheet, Text, View, TouchableWithoutFeedback, KeyboardAvoidingView, ScrollView, Image, Keyboard, TextInput, TouchableOpacity } from 'react-native';
import { useFonts, Poppins_400Regular } from '@expo-google-fonts/poppins';
import React, { useState } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function SignInScreen() {
  const [passwordVisible, setPasswordVisible] = useState(true);

  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
  });

  if (!fontsLoaded) {
    return <View />;
  } else {
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
                <TextInput placeholder='Ton nom'/>
                <TextInput placeholder='Ton mot de passe' secureTextEntry={passwordVisible} style={{flex: 1}}
                />
                <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
                  <FontAwesome name={passwordVisible ? 'eye-slash' : 'eye'} size={24} color='grey' />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text>Valider</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text>Des trous de mémoire ?</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.innerContainer}>
                <Text>Pas encore de compte ?</Text>
                <TouchableOpacity>
                  <Text>Créer un compte</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
 container: {
   flex: 1,
   alignItems: 'center',
   justifyContent: 'center',
 },
 innerContainer: {
  alignItems: 'center',
  justifyContent: 'center',
 },
 image : {
  width: 200, 
  height: 200,
},
textContainer: {
  flex: 1,
  
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
  alignItems: 'center',
  justifyContent: 'center',
}
});