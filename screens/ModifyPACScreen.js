import { Button, SafeAreaView, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useFonts, Poppins_400Regular } from '@expo-google-fonts/poppins';
import React, { useState, useEffect } from 'react';
import { TextInput, List } from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function ModifyPACScreen({ navigation, route }) {
    const { _id } = route.params;

    const [personToContact, setPersonToContact] = useState('');
    const [phonePersonToContact, setPhonePersonToContact] = useState('');

      // 
      const modifications = {
        ICEIdentity: personToContact,
        ICEPhoneNumber: phonePersonToContact,
    }

    const handleButtonPress = () => {
        if (_id) {
          fetch('http://192.168.0.25:3000/patients/updatePatientById', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              _id: _id, 
              newObject: modifications
            }),
          })
          .then(response => response.json())
          .then()
          .catch(error => console.error('Error:', error));
        } else {
          console.log('_id is not defined');
        }
      };
      

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
            <View style={styles.container}>
            <View style={{ position: 'absolute', top: -45, left: 15 }} > 
            <TouchableOpacity onPress={() => navigation.navigate('PatientScreen', { _id : _id})} >
                <FontAwesome name={'chevron-left'} size={30} color='#99BD8F'/>
            </TouchableOpacity>       
            </View>  
                <View>
                    <Text style={styles.title}>Personne à contacter</Text>
                </View>
                <View>
                <TextInput
                label='Personne à contacter'                
                mode='outlined'
                multiline                
                theme={{ colors: { primary: '#99BD8F' }}}
                style={{marginTop: 5, width: 350}}
                onChangeText={(text) => {                    
                    setPersonToContact(text)
                }}
                value={personToContact}              
              />
                <TextInput
                label="Téléphone"                
                mode='outlined'
                keyboardType='phone-pad'
                theme={{ colors: { primary: '#99BD8F' }}}
                style={{marginTop: 10, width: 350}}
                onChangeText={(text) => {
                    let cleaned = ('' + text).replace(/\D/g, '');                    
                    if (cleaned.length > 10) {
                      cleaned = cleaned.substring(0, 10);
                    }                    
                    const match = cleaned.match(/(\d{0,2})/g);
                    const phoneNumber = match.join('.').replace(/\.$/, '');
                    setPhonePersonToContact(phoneNumber);                 
                }}
                value={phonePersonToContact}              
              />
                </View>
                <View style={styles.button}>
                    <TouchableOpacity onPress={() => {
                        handleButtonPress();
                        navigation.navigate('PatientScreen', { _id : _id});
                    }}>
                        <Text style={styles.text}>Enregistrer</Text>
                    </TouchableOpacity>
                </View>
            </View>
            </SafeAreaView>
          </>
        );
      }
    }

const styles = StyleSheet.create({
 container: {
   flex: 1,
   backgroundColor: '#fff',
   alignItems: 'center',
   justifyContent: 'flex-start',
   marginTop: 70,
 },
 title: {
    color: '#99BD8F',
    fontFamily: 'Poppins_600SemiBold', 
    fontSize: 27,
    marginBottom: 50
 },
 button: {
  backgroundColor: '#99BD8F',
  width: 360,
  height: 50,
  borderRadius: 10,
  marginTop: 20,
  marginBottom: 20,
  justifyContent: 'center',
  alignItems: 'center',
 },
 text: {
    fontFamily: 'Poppins_600SemiBold', 
    fontSize: 17,
  },
});