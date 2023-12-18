import { Button, TouchableWithoutFeedback, ScrollView, Modal, KeyboardAvoidingView, SafeAreaView, Image, StyleSheet, Text, TouchableOpacity, View, Platform } from 'react-native';
import { useFonts, Poppins_400Regular, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import { TextInput, List} from 'react-native-paper';
import { useEffect, useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Dropdown from './Dropdown';

import { addPatient } from '../reducers/patients';
import { useDispatch, useSelector } from 'react-redux';
import { Camera, FlashMode} from 'expo-camera';
import { addPhoto } from '../reducers/users';


export default function AddTransmissionScreen({navigation}) {
    //const dispatch = useDispatch();
    const officeToken = useSelector((state) => state.users.value.officesTokens[0].token)
    const [isPatient, setIsPatient] = useState(false)
    const [isGeneral, setIsGeneral] = useState(true)
    const [patientName, setPatientName] = useState('');
    const [message, setMessage] = useState('');
    const [documents, setDocuments] = useState('');
    const [allPatients, setAllPatients] = useState([]);
    const [suggestions, setSuggestions] = useState([])

    useEffect (() => {
      fetch(`http://192.168.1.162:3000/patients/allPatientDay/${officeToken}`).then(
        response => response.json())
        .then(data => setAllPatients(data.Patients))
    }, [])
    console.log('allPatients :', allPatients);

    const handleIsGeneral = (state) => {
      setIsGeneral(state);
      setIsPatient(false);
    }
    const handleIsPatient = (state) => {
      setIsPatient(state);
      setIsGeneral(false);
    }

    const handlePatientNameChange = (text => {
      setPatientName(text);
    const filteredSuggestions = allPatients.filter((item) =>
    `${item.name} ${item.firstname}`.toLowerCase().includes(text.toLowerCase())
  );
    setSuggestions(filteredSuggestions);
    })

    const suggestionsToDisplay = suggestions.map((item, index) => {
       return (
       
          <TouchableOpacity key={index} onPress={()=>setPatientName(`${item.name} ${item.firstname}`)}>
          <Text >{`${item.name} ${item.firstname}`} </Text>
        </TouchableOpacity>
       
        
       )
       
    })

  

        return (
    <>
      <SafeAreaView style={{flex: 0, backgroundColor: '#99BD8F'}} />
        <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <KeyboardAvoidingView  behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
            <View style={styles.header}>
              <Dropdown style={styles.dropdown} navigation={navigation} />
              <TouchableOpacity onPress={() => navigation.navigate('TabNavigator')}>
                 <Image 
              style={styles.image}
              source={require('../assets/logo.png')} />
              </TouchableOpacity>
            </View>
            <View style={styles.content}>
                <Text style={styles.transmission} >Nouvelle transmission</Text>
                <View style={styles.buttonContainer}>
                    {!isGeneral && <TouchableOpacity style={styles.button} onPress={() => handleIsGeneral(true)}>
                        <Text style={styles.textButton} >Général</Text>
                    </TouchableOpacity>}
                    {isGeneral && <TouchableOpacity style={{backgroundColor: '#99BD8F',width: 90,height: 50,borderRadius: 10,justifyContent: 'center',alignItems: 'center'}} >
                        <Text style={styles.textButton} >Général</Text>
                    </TouchableOpacity>}
                  {!isPatient &&  <TouchableOpacity style={styles.button} onPress={() => handleIsPatient(true)}>
                        <Text style={styles.textButton} >Patient</Text>
                    </TouchableOpacity>}
                    {isPatient &&  <TouchableOpacity style={{backgroundColor: '#99BD8F',width: 90,height: 50,borderRadius: 10,justifyContent: 'center',alignItems: 'center'}}>
                        <Text style={styles.textButton} >Patient</Text>
                    </TouchableOpacity>}
                </View>
                
                {isPatient && (<>
                      <TextInput style={styles.patientInput}
                          label='Nom du patient' 
                          mode='outlined'
                          theme={{ 
                            colors: { 
                              primary: '#99BD8F', 
                            }
                      }}
                        onChangeText={text => handlePatientNameChange(text)} 
                        value={patientName}/>
                        {/*<ScrollView style={styles.suggestionsContainer}>
                          <View style={styles.suggestionList}> 
                            {suggestionsToDisplay}
                          </View>
                    </ScrollView>*/}
                        
                  </> )}
                
                
                <View style={styles.messageContainer}>
                    {isPatient &&  <Text style={{color: '#99BD8F',
            fontSize: 20,
            fontFamily: 'Poppins_600SemiBold',borderColor: 'green',
            borderWidth: 5,textAlign : 'center',height:'20%'}} >Message</Text>}
                {!isPatient &&  <Text style={styles.message} >Message</Text>}
                    <TextInput 
                        label='Message' 
                        mode='outlined'
                        theme={{ 
                          colors: { 
                            primary: '#99BD8F', 
                          }
                        }}
                        style={styles.transmissionInput}
                        onChangeText={text => setMessage(text)} 
                        value={message}/>
                   
                </View>
                <TextInput 
                        label='Documents associés' 
                        mode='outlined'
                        theme={{ 
                          colors: { 
                            primary: '#99BD8F', 
                          }
                        }}
                        style={styles.documentsInput}
                        onChangeText={text => setDocuments(text)} 
                        value={documents}/>
                <TouchableOpacity style={styles.buttonValidate} onPress={() => 'handleConnexion()'}>
                      <Text style={styles.textButton}>Valider</Text>
                </TouchableOpacity>
            </View>
           
               </KeyboardAvoidingView>
          </ScrollView>
        </SafeAreaView>
    </>
        );
    }


    const styles = StyleSheet.create({
      container: {
       flex: 1,
       backgroundColor: '#fff',
       alignItems: 'center',
       justifyContent: 'center',
      },
      dropdown: {
       top: 0,
       left: 0,
       },
     header: {
       height: '10%',
       justifyContent: 'space-between',
       flexDirection: 'row',

     },
     image: {
       width: 60,
       height: 60,
      
     },

     content : {
        height: '90%',
        width: '100%',
        borderColor: 'purple',
        borderWidth: 2,
        justifyContent: 'space-around',
        alignItems: 'center',
     },


     transmission: {
       color: '#99BD8F',
       fontSize: 30,
       fontFamily: 'Poppins_600SemiBold',
       borderColor: 'blue',
       borderWidth: 1
      },
      buttonContainer:{
        width: 300,
        height:70,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        
        borderColor: 'blue',
        borderWidth: 1
      },
      button: {
        backgroundColor: '#99BD8F',
        width: 80,
        height: 40,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
      },
      textButton:{
        color: 'white',
        fontSize: 15,
        fontFamily: 'Poppins_600SemiBold',
      },
      patientInput : {
        width: 350,
      },
      suggestionsContainer:{
        width: '70%',
        maxHeight: '20%',
        borderColor: 'red',
        borderWidth: 5,

      },

      suggestionList: {
        width:'95%',
        height:'95%',
        justifyContent: 'center',
        alignItems: 'center'

      },
      
       messageContainer:{
        width: '100%',
        height: '30%',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderColor: 'blue',
        borderWidth: 1
      },
      message: {
        height:'20%',
        color: '#99BD8F',
        fontSize: 20,
        fontFamily: 'Poppins_600SemiBold',
        borderColor: 'red',
        borderWidth: 5,
        textAlign : 'center',

       }, 

       transmissionInput : {
        width: '95%',
        height: '80%',
        borderRadius: 50,
        textAlign: 'left', 
        textAlignVertical: 'top',
     
      },
      documentsInput : {
        width: '95%',
        height:'10%',
        marginBottom: 20,
    
      },

      buttonValidate : {
        backgroundColor: '#99BD8F',
        width: 350,
        height: 50,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'blue',
        borderWidth: 1
      },
 
     });