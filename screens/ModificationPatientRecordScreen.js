import { Button, SafeAreaView, ScrollView, Image, Keyboard, TouchableWithoutFeedback, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useFonts, Poppins_400Regular } from '@expo-google-fonts/poppins';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { TextInput, Icon} from 'react-native-paper';
import React, { useState, useEffect } from 'react';

export default function ModificationPatientRecordScreen({ navigation, route }) {
    const [data, setData] = useState({}); 
    const [patient, setPatient] = useState(null);

    const [address, setAddress] = useState('');


    useEffect(() => {
      if (patient) { console.log(patient)
        fetch(`http://192.168.0.25:3000/patients/allPatientDay/${patient._id}`)
        .then(response => response.json())
        .then(data => {
          console.log('data.add :', data);
          setAddress(data.address);
        })
      }
    }, []);
    


    useEffect(() => {
        // Assurez-vous que 'patient' est défini avant de l'utiliser
        if (patient) { console.log(patient)
          fetch('http://192.168.1.162:3000/patients/updatePatientById', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              _id: patient._id,
              newObject: {
                address: newAddress,
                infosAddress : newInfosAddress,
                mobile: newMobile,
                homePhone : newHomePhone,
                ICEIdentity : newICEIdentity,
                ICEPhoneNumber : newICEPhoneNumber,
              }
            }),
          })
          .then(response => response.json())
          .then(data => {
            console.log('dataModif:', data);
            setData(data);
          })
          .catch((error) => {
            console.error('Error:', error);
          });
        }
      }, [patient]); 
      
      

  const handleInputChange = (name, text) => {
    setData(prevData => ({ ...prevData, [name]: text }));
  };

  const handleDelete = (name) => {
    setData(prevData => {
      const newData = { ...prevData };
      delete newData[name];
      return newData;
    });
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
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                      <KeyboardAwareScrollView contentContainerStyle={styles.scrollView} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} enableOnAndroid={true}>
                            <ScrollView contentContainerStyle={styles.scrollView}>
                                <View style={styles.container}>
                                
                                    <View>
                                        <Text style={styles.title}>MODIFICATION</Text>
                                    </View>
                                    <View>    
                                        <Text>{data.address}</Text>                               
                                        <TextInput
                                        label='Adresse'
                                        mode='outlined'
                                        theme={{ colors: { primary: '#99BD8F' }}}
                                        value={data.address} 
                                        onChangeText={text => setAddress(text)}
                                      />
                                    <Icon
                                        icon="delete"
                                        size={20}
                                        onPress={() => handleDelete('address')}
                                    />
                                    <TextInput 
                                        label='Complément' 
                                        mode='outlined'
                                        theme={{ 
                                        colors: { 
                                            primary: '#99BD8F', 
                                        }
                                        }}
                                        
                                        
                                        style={{ width: 350, marginTop: 15 }} 
                                    />
                                    <TextInput 
                                        label='Téléphone portable' 
                                        mode='outlined'
                                        multiline
                                        theme={{ 
                                        colors: { 
                                            primary: '#99BD8F', 
                                        }
                                        }}
                                        style={{ width: 350, marginTop: 15 }} 
                                        
                                        placeholder='JJ/MM/AAAA' 
                                    />
                                    <TextInput 
                                        label='Téléphone fixe' 
                                        mode='outlined'
                                        multiline
                                        theme={{ 
                                        colors: { 
                                            primary: '#99BD8F', 
                                        }
                                        }}
                                        
        
                                        style={{ width: 350, marginTop: 15 }} 
                                    />
                                    
                                    <TextInput 
                                        label="Personne à contacter en cas d'urgence"
                                        mode='outlined'
                                        multiline
                                        theme={{ 
                                        colors: { 
                                            primary: '#99BD8F', 
                                        }
                                        }}
                                        
                                        style={{ width: 350, marginTop: 15 }} 
                                    />
                                    <TextInput 
                                        label='Numéro de téléphone portable'
                                        mode='outlined'
                                        theme={{ 
                                        colors: { 
                                            primary: '#99BD8F', 
                                        }
                                        }}
                                        keyboardType='phone-pad'
                                        
                                        style={{ width: 350, marginTop: 15 }} 
                                    />
                                        <TouchableOpacity style={styles.button}>
                                            <Text style={styles.text} >Enregistrer</Text>
                                        </TouchableOpacity>
                                      </View>
                                    </View>                                
                            </ScrollView>
                            </KeyboardAwareScrollView>
                    </TouchableWithoutFeedback>
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
   justifyContent: 'center',
 },
 title: {
    color: '#99BD8F',
    fontFamily: 'Poppins_600SemiBold', 
    fontSize: 30,
    marginTop: 30,
    marginBottom: 40,
 },
 button : {
    backgroundColor: '#99BD8F',
    width: 350,
    height: 50,
    borderRadius: 10,
    marginTop: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  text: {
    fontFamily: 'Poppins_600SemiBold', 
    fontSize: 17,
  },
});