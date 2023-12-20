import { Button, StyleSheet, Text, View, TouchableWithoutFeedback, KeyboardAvoidingView, ScrollView, Image, Keyboard, TouchableOpacity, SafeAreaView,Modal } from 'react-native';
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
  const [modalMessage, setModalMessage] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false)
 //console.log('coucou');
 
 
  const handleConnexion = () => {

    fetch('http://192.168.1.5:3000/users/signin', {

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
        }else{
          if(data.error === 'Missing or empty fields'){
            setModalMessage('Merci de renseigner les champs de saisie');
            setIsModalVisible(true);
          }else{
            setModalMessage('Utilisateur et/ou mot de pass incorrect');
            setIsModalVisible(true);
          }
          
        }
        
      })
  }
  const closeModal = () => {
    setIsModalVisible(false);
    setModalMessage('');
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
                          <View style={styles.passwordStyle}>
                            <TextInput 
                            label='Ton mot de passe'
                            mode='outlined'
                            theme={{ 
                              colors: { 
                                primary: '#99BD8F', 
                              }
                            }}
                            secureTextEntry={passwordVisible} 
                            style={{ width: 350, marginTop: 15}}
                            onChangeText={text => setSignInPassword(text)} 
                            value={signInPassword}/>
                            <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)} style={{marginTop: 35, marginLeft : -24}}>
                              <FontAwesome name={passwordVisible ? 'eye-slash' : 'eye'} size={24} color='grey' />
                            </TouchableOpacity>
                          </View>
                          <TouchableOpacity style={styles.button} onPress={() => handleConnexion()}>
                            <Text style={styles.text}>Valider</Text>
                          </TouchableOpacity>
                          <TouchableOpacity>
                            <Text style={[styles.footertext, {marginTop: 10, color: 'blue'}]}>Des trous de mémoire ?</Text>
                          </TouchableOpacity>
                          <View style={styles.footer}>
                            <Text style={styles.footertext}>Pas encore de compte ?</Text>
                            <TouchableOpacity onPress={() => navigation.navigate('SignUpScreen')}>
                              <Text style={[styles.footertext, {marginTop: 5, color: 'blue'}]}>Vite! Crée le en 10 secondes</Text>
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
  passwordStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between'
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
    marginTop: 45,
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