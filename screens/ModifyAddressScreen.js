import { Button, SafeAreaView, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useFonts, Poppins_400Regular } from '@expo-google-fonts/poppins';
import React, { useState, useEffect } from 'react';
import { TextInput } from 'react-native-paper';

export default function ModifyAddressScreen() {
    const [results, setResults] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [addressPatient, setAddressPatient] = useState('');
    const [additionalAddress, setAdditionalAddress] = useState('');

    const modifications = {
        address: addressPatient,
        infosAddress: additionalAddress,
    }
    if (patient && patient._id) {
        fetch('http://192.168.1.14:3000/patients/updatePatientById', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            _id: patient._id, 
            newObject: modifications
          }),
        })
        .then(response => response.json())
        .then(data => console.log(data))
      } else {
        console.log('Patient object is not defined');
      }
      
  
      // Suggestion adresse
      const fetchAddress = (query) => {
        fetch(`https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(query)}&autocomplete=1`)
          .then(response => response.json())
          .then(data => {
            setResults(data.features);
            setShowSuggestions(true);
        })
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
                <View>
                    <Text style={styles.title}>Nouvelle adresse</Text>
                </View>
                <View>
                <TextInput
                label='Nouvelle adresse'
                multiline
                mode='outlined'
                theme={{ colors: { primary: '#99BD8F' }}}
                style={{marginTop: 5, width: 300}}
                onChangeText={(text) => {
                  setAddressPatient(text);
                  fetchAddress(text);
                  setResults([]);
                }}
                value={addressPatient}              
              />
              { results && results.map((result, index) => (
                    <List.Item
                        key={index}
                        title={result.properties.label}  
                        onPress={() => setAddressPatient(result.properties.label)}                                                
                    />
                ))}
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
    fontSize: 30,
    marginBottom: 50
 }
});