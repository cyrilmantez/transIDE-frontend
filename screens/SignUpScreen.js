import { Button, StyleSheet, Text, View, Keyboard, KeyboardAvoidingView, ScrollView, TouchableWithoutFeedback, Platform, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function SignUpScreen() {
  const [passwordVisible, setPasswordVisible] = useState(true);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <View>
            <Text>Bienvenue</Text>
          </View>
          <View>
            <Text>Crée ton compte</Text>
          </View>
          <View>
            <TextInput placeholder='Ton adresse mail'/>
            <TextInput placeholder='Ton NOM et Prénom'/>
            <TextInput placeholder='Ton mot de passe' 
                secureTextEntry={passwordVisible}
                right={
                  <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
                      <FontAwesome name={passwordVisible ? 'eye-slash' : 'eye'} size={24} color='grey' />
                  </TouchableOpacity>
                }/>
            <TextInput placeholder='Ton mot de passe (oui et encore)' 
                secureTextEntry={passwordVisible}
                right={
                  <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
                      <FontAwesome name={passwordVisible ? 'eye-slash' : 'eye'} size={24} color='grey' />
                  </TouchableOpacity>
                }/>
            <TouchableOpacity>
              <Text>Valider</Text>
            </TouchableOpacity>
          </View>
          <View>
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


const styles = StyleSheet.create({
 container: {
   flex: 1,
   alignItems: 'center',
   justifyContent: 'center',
 },
});