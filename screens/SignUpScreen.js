import { Button, StyleSheet, SafeAreaView, Text, View, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback, ScrollView, Platform, TouchableOpacity, Modal} from 'react-native';
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
  const [modalMessage, setModalMessage] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false)

  const closeModal = () => {
    setIsModalVisible(false);
    setModalMessage('');
  }

  const handleRegister = () => {
    fetch('https://transide-backend.vercel.app/users/signup', {
      method: 'POST',
      headers: {'Content-Type' : 'application/json'},
      body: JSON.stringify({email: signUpEmail.toLowerCase(), username: signUpName, password: signUpPassword, confirmPassword: confirmPassword})
    }).then(response => response.json())
      .then(data => {
        if(!data.result){
          setModalMessage(data.error);
          setIsModalVisible(true);
        }else {
          dispatch(login({username: signUpName, token: data.token,  officesTokens : data.officesTokens}));
          setSignUpEmail('');
          setSignUpName('');
          setSignUpPassword('');
          setConfirmPassword('');
          setModalMessage('');
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
                    <View style={styles.innerContainer}>
                      <Text style={styles.bienvenue} >Bienvenue !</Text>
                        <Text style={styles.creetoncompte} >Crée ton compte</Text>
                    </View>
                    <View style={styles.inputContainer}>
                          <TextInput 
                            label="Ton nom d'utilisateur"
                            theme={{ 
                              colors: { 
                                primary: '#99BD8F', 
                              }
                            }}
                            style={{ width: 350, marginTop: 15 }}  
                            mode='outlined'
                            onChangeText={text => setSignUpName(text)} 
                            value={signUpName}/>
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
                              <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)} style={{position: 'absolute', right: 20, top: 32}}>
                                  <FontAwesome name={passwordVisible ? 'eye-slash' : 'eye'} size={24} color='#99BD8F'/>
                              </TouchableOpacity>
                            </View>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                              <TextInput 
                                label='Ton mot de passe (oui oui, encore...)' 
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
                              <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)} style={{position: 'absolute', right: 20, top: 33}}>
                                  <FontAwesome name={passwordVisible ? 'eye-slash' : 'eye'} size={24} color='#99BD8F' />
                              </TouchableOpacity>
                            </View>
                        <TouchableOpacity style={styles.button} onPress={() => handleRegister()}>
                          <Text style={styles.text} >Valider</Text>
                        </TouchableOpacity>
                        <View style={styles.footer}>
                          <Text style={styles.footertext}>Déjà un compte ?</Text>
                          <TouchableOpacity onPress={() => navigation.navigate('SignInScreen')}>
                            <Text style={[styles.footertext, {marginTop: 5, color: 'blue'}]}>CONNECTE-TOI</Text>
                          </TouchableOpacity>
                        </View>
                        <Modal transparent visible={isModalVisible} onRequestClose={closeModal}>
                            <View style={styles.modalContainer}>
                              <View style={styles.modalContent}>
                                  <Text style={styles.modalText}>{modalMessage}</Text>
                                  <TouchableOpacity style={styles.closeButton} onPress={() => closeModal()}>
                                    <Text style={styles.modalButtonText}>Fermer</Text>
                                  </TouchableOpacity>
                              </View>
                            </View>
                      </Modal>
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
   backgroundColor: 'white',

 },
 scrollView: {
   flexGrow: 1,
   alignItems: 'center',
 },
 innerContainer: {
  flex:1,
   alignItems: 'center',

 },
 inputContainer: {
  flex : 1,
  alignItems: 'center',
},

 bienvenue: {
  color: '#99BD8F',
  fontSize: 30,
  marginTop: 40,
  marginBottom: 10,
  fontFamily: 'Poppins_600SemiBold',
 },
 creetoncompte: {
  color: '#99BD8F',
  fontFamily: 'Poppins_600SemiBold',
  fontSize: 40,
  marginBottom: 30,
 },

button : {
  backgroundColor: '#99BD8F',
  width: 350,
  height: 50,
  borderRadius: 10,
  marginTop: 50,
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
  marginTop: 40,
  marginBottom: 20,
},
footertext: {
  fontFamily: 'Poppins_600SemiBold', 
},
modalContainer: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
},
modalContent: {
  backgroundColor: 'white',
  padding: 8,
  borderRadius: 10,
  borderColor: '#99BD8F',
  borderWidth: 5,
  elevation: 5,
  height: 300,
  width: 250,
  display:'flex',
  justifyContent: 'space-between',
  alignContent: 'center'
},
closeButton :{
  borderColor: 'white',
  borderWidth: 1,
  display:'flex',
  justifyContent: 'center',
  alignContent: 'center',
  marginBottom: 10,
  height: 40,
  backgroundColor:'#99BD8F',
},
modalButtonText:{
  textAlign: 'center',
  color: 'white',
 },
 modalText:{
  textAlign: 'center',
  marginTop: 90,
 }
});
