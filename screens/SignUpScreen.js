import { Button, StyleSheet, SafeAreaView, Text, View, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback, ScrollView, Platform, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useFonts, Poppins_400Regular, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import { useDispatch } from 'react-redux';
import { login } from '../reducers/users';
import { TextInput} from 'react-native-paper';

export default function SignUpScreen({navigation}) {
  const [passwordVisible, setPasswordVisible] = useState(true);

  const dispatch = useDispatch();

  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpName, setSignUpName] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

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


  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
  });

  if (!fontsLoaded) {
    return <View />;
  } else {
    return (
      <>
      <SafeAreaView style={{flex: 0, backgroundColor: '#99BD8F'}} />
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
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
                mode='outlined'
                theme={{ 
                  colors: { 
                    primary: '#99BD8F', 
                  }
                }}
                style={{ width: 350, marginTop: 15 }} 
                
                onChangeText={text => setSignUpEmail(text)} 
                value={signUpEmail}/>
              <TextInput 
                label='Ton nom et prénom'
                theme={{ 
                  colors: { 
                    primary: '#99BD8F', 
                  }
                }}
                style={{ width: 350, marginTop: 15 }}  
                mode='outlined'
                onChangeText={text => setSignUpName(text)} 
                value={signUpName}/>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <TextInput 
                    label='Ton mot de passe' 
                    theme={{ 
                      colors: { 
                        primary: '#99BD8F', 
                      }
                    }}
                    style={{ width: 350, marginTop: 15 }} 
                    mode='outlined'
                    secureTextEntry={passwordVisible}
                    onChangeText={text => setSignUpPassword(text)}
                    value={signUpPassword}
                  />
                  <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)} style={{position: 'absolute', right: 10, top: 32}}>
                      <FontAwesome name={passwordVisible ? 'eye-slash' : 'eye'} size={24} color='#99BD8F'/>
                  </TouchableOpacity>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <TextInput 
                    label='Ton mot de passe (oui et encore)' 
                    theme={{ 
                      colors: { 
                        primary: '#99BD8F', 
                      }
                    }}
                    style={{ width: 350, marginTop: 15 }} 
                    mode='outlined'
                    secureTextEntry={passwordVisible}
                    onChangeText={text => setConfirmPassword(text)}
                    value={confirmPassword}
                  />
                  <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)} style={{position: 'absolute', right: 10, top: 33}}>
                      <FontAwesome name={passwordVisible ? 'eye-slash' : 'eye'} size={24} color='#99BD8F' />
                  </TouchableOpacity>
              </View>
              <TouchableOpacity style={styles.button} onPress={() => handleRegister()}>
                <Text style={styles.text} >Valider</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.footer}>
              <Text style={styles.footertext}>Déjà un compte ?</Text>
              <TouchableOpacity onPress={() => navigation.navigate('SignInScreen')}>
                <Text style={[styles.footertext, {marginTop: 20, color: 'blue'}]}>CONNECTE-TOI</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
    </>
  );
}
}


const styles = StyleSheet.create({
 container: {
   flex: 1,
   alignItems: 'center',
   justifyContent: 'center',
   backgroundColor: 'white',
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
  fontSize: 30,
  marginBottom: 50,
  fontFamily: 'Poppins_600SemiBold',
 },
 creetoncompte: {
  color: '#99BD8F',
  fontFamily: 'Poppins_600SemiBold',
  fontSize: 40,
  marginBottom: 80,
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
button : {
  backgroundColor: '#99BD8F',
  width: 350,
  height: 50,
  borderRadius: 10,
  marginTop: 25,
  justifyContent: 'center',
  alignItems: 'center',
},
text: {
  fontSize: 17,
  fontFamily: 'Poppins_600SemiBold', 
},
footer: {
  alignItems: 'center',
   justifyContent: 'center',
  marginTop: 50,
},
footertext: {
  fontFamily: 'Poppins_600SemiBold', 
}
});
