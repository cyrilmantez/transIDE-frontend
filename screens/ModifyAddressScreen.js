import { Button, SafeAreaView, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useFonts, Poppins_400Regular } from '@expo-google-fonts/poppins';
import React, { useState, useEffect } from 'react';
import { TextInput, List } from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function ModifyAddressScreen({ navigation, route }) {
    const { _id } = route.params;

    const [results, setResults] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [addressPatient, setAddressPatient] = useState('');
    const [additionalAddress, setAdditionalAddress] = useState('');

 
      // Suggestion adresse
      const fetchAddress = (query) => {
        fetch(`https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(query)}&autocomplete=1`)
          .then(response => response.json())
          .then(data => {
            setResults(data.features);
            setShowSuggestions(true);
        })
      };

      // 
      const modifications = {
        address: addressPatient,
        infosAddress: additionalAddress,
    }

    const handleButtonPress = () => {
        if (_id) {
          fetch('http://192.168.1.162:3000/patients/updatePatientById', {
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
          .then(data => console.log('datttaaa', ata))
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
                    <Text style={styles.title}>Nouvelle adresse</Text>
                </View>
                <View>
                <TextInput
                label='Nouvelle adresse'
                multiline
                mode='outlined'
                theme={{ colors: { primary: '#99BD8F' }}}
                style={{marginTop: 5, width: 350}}
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
                <TextInput
                label="Complément d'adresse"
                multiline
                mode='outlined'
                theme={{ colors: { primary: '#99BD8F' }}}
                style={{marginTop: 10, width: 350}}
                onChangeText={(text) => {
                  setAdditionalAddress(text)
                  setResults([]);
                }}
                value={additionalAddress}              
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
    fontSize: 30,
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