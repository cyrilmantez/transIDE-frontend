import { Button, StyleSheet, Text, View, TouchableWithoutFeedback, KeyboardAvoidingView, ScrollView, Image, Keyboard, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';
import { useFonts, Poppins_400Regular } from '@expo-google-fonts/poppins';
import React, { useState } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useDispatch } from 'react-redux';

export default function SignInScreen() {
  const [passwordVisible, setPasswordVisible] = useState(true);
  const dispatch = useDispatch();
  const [signInName, setSignInName] = useState('');
  const [signInPassword, setSignInPassword] = useState('');

  const handleConnexion = () => {
    if (!signInName || !signInPassword) {
      alert('Champs manquants ou incomplets');
      return;
    }

    fetch('/http://192.168.1.5:3000/users/signin', {
      method: 'POST',
      headers: {'Content-Type' : 'application/json'},
      body: JSON.stringify({username: signInName, password: signInPassword})
    }).then(response => response.json())
      .then(data => {
        if (data.result){
          dispatch(login({username: signInName, token: data.token }));
          setSignInName('');
          setSignInPassword('');
          navigation.navigate('TabNavigator');
        }
      })
  }

  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
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
          <ScrollView contentContainerStyle={{flexGrow: 1}}>
            <View>
              <View style={styles.innerContainer}>
                <Text style={styles.text1}>Encore toi ?</Text>
              </View>
              <View style={styles.innerContainer}>
                <Text style={styles.text2}>Connecte-toi</Text>
              </View>
              <Image
                style={styles.image}
                source={require('../assets/logo.png')}
                    />
              <View style={styles.inputContainer}>  
                <TextInput placeholder='Ton nom' onChangeText={text => setSignInName(text)} value={signInName}/>
                <TextInput placeholder='Ton mot de passe' secureTextEntry={passwordVisible} style={{flex: 1}} onChangeText={text => setSignInPassword(text)} value={signInPassword}/>
                <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
                  <FontAwesome name={passwordVisible ? 'eye-slash' : 'eye'} size={24} color='grey' />
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => handleConnexion()}>
                  <Text style={styles.text}>Valider</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text>Des trous de mémoire ?</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.footer}>
                <Text style={styles.footertext}>Pas encore de compte ?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('SignUpScreen')}>
                  <Text style={[styles.footertext, {marginTop: 20, color: 'blue'}]}>Créer un compte</Text>
                </TouchableOpacity>
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
 innerContainer: {
  alignItems: 'center',
  justifyContent: 'center',
 },
 image : {
  width: 200, 
  height: 200,
},
textContainer: {
  
},
text1: {
  color: '#99BD8F',
  fontSize: 30,
  marginBottom: 50,
  fontFamily: 'Poppins_600SemiBold',
},
text2: {
  color: '#99BD8F',
  fontFamily: 'Poppins_600SemiBold',
  fontSize: 40,
  marginBottom: 80,
},
inputContainer: {
  flex : 1,
  alignItems: 'center',
  justifyContent: 'center',
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