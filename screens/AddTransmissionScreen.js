import { Button, TouchableWithoutFeedback, ScrollView, Modal, Keyboard, SafeAreaView, Image, StyleSheet, Text, TouchableOpacity, View,  } from 'react-native';
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
    const [patientName, setPatientName] = useState('');
    const [message, setMessage] = useState('');
    const [documents, setDocuments] = useState('');
    const [allPatients, setAllPatients] = useState([]);

    useEffect (() => {
      fetch('http://192.168.1.162:3000/patients/allPatientDay').then(
        response => response.json())
        .then(data => setAllPatients(data.Patients))
    }, [])
    console.log('allPatients :', allPatients);

        return (
    <>
      <SafeAreaView style={{flex: 0, backgroundColor: '#99BD8F'}} />
        <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
          <View style={styles.container}>
            <View style={styles.header}>
              <Dropdown style={styles.dropdown} navigation={navigation} />
              <TouchableOpacity onPress={() => navigation.navigate('TabNavigator')}>
                 <Image 
              style={styles.image}
              source={require('../assets/logo.png')} />
              </TouchableOpacity>
             
            </View>
            <Text style={styles.transmission} >Nouvelle transmission</Text>
            <TextInput style={styles.patientInput}
                label='Nom du patient' 
                mode='outlined'
                theme={{ 
                  colors: { 
                    primary: '#99BD8F', 
                  }
                }}
               
                onChangeText={text => setPatientName(text)} 
                value={patientName}/>
            <Text style={styles.message} >Message</Text>
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
              <TouchableOpacity style={styles.button} onPress={() => 'handleConnexion()'}>
                  <Text style={styles.text}>Valider</Text>
                </TouchableOpacity>

          </View>
        </SafeAreaView>
    </>
        );
    }


    const styles = StyleSheet.create({
      container: {
       flex: 1,
       backgroundColor: '#fff',
       alignItems: 'center',
       marginTop: 0,
       marginLeft: 0,
       marginRight: 0,
      },
      dropdown: {
       top: 0,
       left: 0,
       },
     header: {
       height: '8%',
       justifyContent: 'space-between',
       flexDirection: 'row',
     },
     image: {
       width: 60,
       height: 60,
     },


     transmission: {
       color: '#99BD8F',
       fontSize: 30,
       marginBottom: 50,
       fontFamily: 'Poppins_600SemiBold',
      },

      patientInput : {
        width: 350,
        marginTop: -20,
      },

      message: {
        color: '#99BD8F',
        fontSize: 20,
        paddingTop: 60,
        fontFamily: 'Poppins_600SemiBold',
       }, 

       transmissionInput : {
        width: 350,
        height: 240,
        marginTop: 5,
        borderRadius: 50
      },
      documentsInput : {
        width: 350,
        marginTop: 15 
      },

      button : {
        backgroundColor: '#99BD8F',
        width: 350,
        height: 50,
        borderRadius: 10,
        marginTop: 60,
        justifyContent: 'center',
        alignItems: 'center',
      },
 
     });