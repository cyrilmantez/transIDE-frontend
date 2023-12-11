import { Button, StyleSheet, Text, View, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback, ScrollView, Platform, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useFonts, Poppins_400Regular, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import { useDispatch } from 'react-redux';
import { login } from '../reducers/users';
import { TextInput } from 'react-native-paper';

export default function SignUpScreen({navigation}) {
  const [passwordVisible, setPasswordVisible] = useState(true);

  const dispatch = useDispatch();

  const [signUpEmail, setSignUpEmail] = useState();
  const [signUpName, setSignUpName] = useState();
  const [signUpPassword, setSignUpPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const handleRegister = () => {
    if (signUpPassword !== confirmPassword) {
      alert('Les mots de passe ne correspondent pas.');
      return;
    }

    fetch('//', {
      method: 'POST',
      headers: {'Content-Type' : 'application/json'},
      body: JSON.stringify({email: signUpEmail, username: signUpName, password: signUpPassword})
    }).then(response => response.json())
      .then(data => {
        if (data.result){
          dispatch(login({username: signUpName, token: data.token }));
          setSignUpEmail('');
          setSignUpName('');
          setSignUpPassword('');
          setConfirmPassword('');
          navigation.navigate('TabNavigator');
        }
      })
  }

  // Pour changer la couleur de l'input au "clic"
  const [isFocusedEmail, setIsFocusedEmail] = useState(false);
  const [isFocusedName, setIsFocusedName] = useState(false);
  const [isFocusedPassword, setIsFocusedPassword] = useState(false);
  const [isFocusedConfirmPassword, setIsFocusedConfirmPassword] = useState(false);

  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
  });

  if (!fontsLoaded) {
    return <View />;
  } else {
    return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.innerContainer}>
            <Text style={styles.bienvenue} >Bienvenue !</Text>
          </View>
          <View style={styles.innerContainer}>
            <Text style={styles.creetoncompte} >Crée ton compte</Text>
          </View>
          <View style={styles.innerContainer}>
            <TextInput 
              label='Ton adresse mail' 
              style={[styles.input, { borderColor: isFocusedEmail ? '#99BD8F' : 'gray' }]}
              onFocus={() => setIsFocusedEmail(true)}
              onBlur={() => setIsFocusedEmail(false)}
              mode='outlined'
              onChangeText={text => setSignUpEmail(text)} 
              value={signUpEmail}/>
            <TextInput 
              label='Ton NOM et Prénom'
              style={[styles.input, { borderColor: isFocusedName ? '#99BD8F' : 'gray' }]}
              onFocus={() => setIsFocusedName(true)}
              onBlur={() => setIsFocusedName(false)}
              mode='outlined'
              onChangeText={text => setSignUpName(text)} 
              value={signUpName}/>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <TextInput 
                  label='Ton mot de passe' 
                  style={[styles.input, { borderColor: isFocusedPassword ? '#99BD8F' : 'gray' }]}
                  onFocus={() => setIsFocusedPassword(true)}
                  onBlur={() => setIsFocusedPassword(false)}
                  mode='outlined'
                  secureTextEntry={passwordVisible}
                  onChangeText={text => setSignUpPassword(text)}
                  value={signUpPassword}
                />
                <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)} style={{position: 'absolute', right: 10}}>
                    <FontAwesome name={passwordVisible ? 'eye-slash' : 'eye'} size={24} color='grey' />
                </TouchableOpacity>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <TextInput 
                  label='Ton mot de passe (oui et encore)' 
                  style={[styles.input, { borderColor: isFocusedConfirmPassword ? '#99BD8F' : 'gray' }]}
                  onFocus={() => setIsFocusedConfirmPassword(true)}
                  onBlur={() => setIsFocusedConfirmPassword(false)}
                  mode='outlined'
                  secureTextEntry={passwordVisible}
                  onChangeText={text => setConfirmPassword(text)}
                  value={confirmPassword}
                />
                <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)} style={{position: 'absolute', right: 10}}>
                    <FontAwesome name={passwordVisible ? 'eye-slash' : 'eye'} size={24} color='grey' />
                </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => handleRegister()}>
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
 bienvenue: {
  color: '#99BD8F',
  fontFamily: 'Poppins_600SemiBold',
  fontSize: 30,
 },
 creetoncompte: {
  color: '#99BD8F',
  fontFamily: 'Poppins_600SemiBold',
  fontSize: 40,
 },
 input: {
  height: 40,
  width: '100%',
  borderWidth: 1,
  textAlignVertical: 'top',
  borderRadius: 10, 
  width: 350,
  height: 40,
  marginTop: 15, 
},
});
