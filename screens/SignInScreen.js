import { Button, StyleSheet, Text, View, TouchableWithoutFeedback, KeyboardAvoidingView, ScrollView, Image, Keyboard, TouchableOpacity, SafeAreaView } from 'react-native';
import { TextInput} from 'react-native-paper';
import { useFonts, Poppins_400Regular, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import React, { useState } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useDispatch } from 'react-redux';
import { login } from '../reducers/users';

export default function SignInScreen({navigation}) {
  const [passwordVisible, setPasswordVisible] = useState(true);
  const dispatch = useDispatch();
  const [signInName, setSignInName] = useState('');
  const [signInPassword, setSignInPassword] = useState('');

  const handleConnexion = () => {
    if (!signInName || !signInPassword) {
      alert('Champs manquants ou incomplets');
      return;
    }

    fetch('http://192.168.1.14:3000/users/signin', {
      method: 'POST',
      headers: {'Content-Type' : 'application/json'},
      body: JSON.stringify({username: signInName, password: signInPassword})
    }).then(response => response.json())
      .then(data => {
        if (data.result){
          dispatch(login({username: signInName, token: data.token, officesTokens : data.officesToken }));
          setSignInName('');
          setSignInPassword('');
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
            <View>
              <View style={styles.header}>
                  <View >
                    <Text style={styles.text1}>Encore toi ?</Text>
                  </View>
                  <View >
                    <Text style={styles.text2}>Connecte-toi</Text>
                  </View>
                  <View >
                    <Image
                      style={styles.image}
                      source={require('../assets/logo.png')}
                          />
                  </View>
              </View>

              <View style={styles.inputContainer}>  
                      <TextInput 
                      label='Ton nom utilisateur' 
                      mode='outlined'
                      theme={{ 
                        colors: { 
                          primary: '#99BD8F', 
                        }
                      }}
                      style={{ width: 350, marginTop: 15 }}
                      onChangeText={text => setSignInName(text)} 
                      value={signInName}/>
                      <TextInput 
                      label='Ton mot de passe'
                      mode='outlined'
                      theme={{ 
                        colors: { 
                          primary: '#99BD8F', 
                        }
                      }}
                      secureTextEntry={passwordVisible} 
                      style={{ width: 350, marginTop: 15 }}
                      onChangeText={text => setSignInPassword(text)} 
                      value={signInPassword}/>
                      <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)} style={{position: 'absolute', right: 10, top: 104}}>
                        <FontAwesome name={passwordVisible ? 'eye-slash' : 'eye'} size={24} color='grey' />
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.button} onPress={() => handleConnexion()}>
                        <Text style={styles.text}>Valider</Text>
                      </TouchableOpacity>
                      <TouchableOpacity>
                        <Text style={[styles.footertext, {marginTop: 20, color: 'blue'}]}>Des trous de mémoire ?</Text>
                      </TouchableOpacity>
                      <View style={styles.footer}>
                        <Text style={styles.footertext}>Pas encore de compte ?</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('SignUpScreen')}>
                          <Text style={[styles.footertext, {marginTop: 20, color: 'blue'}]}>Vite! Crée le en 10 secondes</Text>
                        </TouchableOpacity>
                </View>
              </View>
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
 },
 image : {
  width: 200, 
  height: 200,
},
  header: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },  
  text1: {
    color: '#99BD8F',
    fontSize: 30,
    marginTop: 30,
    fontFamily: 'Poppins_600SemiBold',
  },
  text2: {
    color: '#99BD8F',
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 40,
  },
  inputContainer: {
    flex : 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    alignItems: 'center',
     justifyContent: 'center',
    marginTop: 50,
  },
  footertext: {
    fontFamily: 'Poppins_600SemiBold', 
    marginTop: 40,
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
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});