import { Button, StyleSheet, Text, View, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback, ScrollView, Platform, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useFonts, Poppins_400Regular } from '@expo-google-fonts/poppins';

export default function SignUpScreen() {
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
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.innerContainer}>
            <Text>Bienvenue</Text>
          </View>
          <View style={styles.innerContainer}>
            <Text>Crée ton compte</Text>
          </View>
          <View style={styles.innerContainer}>
            <TextInput placeholder='Ton adresse mail'/>
            <TextInput placeholder='Ton NOM et Prénom'/>
            <TextInput 
                placeholder='Ton mot de passe' 
                secureTextEntry={passwordVisible}
                style={{flex: 1}}
            />
            <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
                <FontAwesome name={passwordVisible ? 'eye-slash' : 'eye'} size={24} color='grey' />
            </TouchableOpacity>
            <TextInput 
                placeholder='Ton mot de passe (oui et encore)' 
                secureTextEntry={passwordVisible}
                style={{flex: 1}}
            />
              <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
                <FontAwesome name={passwordVisible ? 'eye-slash' : 'eye'} size={24} color='grey' />
              </TouchableOpacity>
            <TouchableOpacity>
              <Text>Valider</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.innerContainer}>
            <Text>Déjà un compte ?</Text>
            <TouchableOpacity>
              <Text>CONNECTE-TOI</Text>
            </TouchableOpacity>
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
 scrollView: {
   flexGrow: 1,
   justifyContent: 'center',
 },
 innerContainer: {
   alignItems: 'center',
   justifyContent: 'center',
 },
});
