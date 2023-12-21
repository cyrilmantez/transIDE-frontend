import { Button, StyleSheet, Text, View, TouchableWithoutFeedback, KeyboardAvoidingView, ScrollView, Keyboard, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import { useFonts, Poppins_400Regular, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {Card, TextInput } from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function MyPatientsScreen({ navigation, route }) {
    const user = useSelector((state) => state.users.value)
    const [search, setSearch] = useState('');
    const [data, setData] = useState({ Patients: [] }); 
    const [filteredPatients, setFilteredPatients] = useState([]);

    useEffect(() => {
        const tokenByDefault = user.officesTokens;
        const defaultOffice = tokenByDefault.filter(e => e.isByDefault)[0].token;
        fetch(`http://192.168.1.14:3000/patients/allPatients/${defaultOffice}`)
          .then(response => response.json())
          .then(data => {
            if (data.Patients) {  console.log('data', data)
              setData(data); 
              
            }
          })
          .catch(error => console.error(error));
      }, []);
      
      useEffect(() => {
        const results = data.Patients.filter(patient =>
            patient.name.toLowerCase().includes(search.toLowerCase()) ||
            patient.firstname.toLowerCase().includes(search.toLowerCase()) ||
            patient.yearOfBirthday.toString().includes(search)
        );
    
        const sortedResults = results.sort((a, b) => a.name.localeCompare(b.name));
    
        setFilteredPatients(sortedResults);
    }, [search, data]);

    const afficherPatients = filteredPatients.map((patient, i) => {
        if (patient && patient._id) {
            return (
                <View key={i}>
                    <TouchableOpacity onPress={() => navigation.navigate('PatientScreen', { _id : patient._id})}>
                        <Card style={styles.contentcard}>
                            <Card.Content style={styles.card}>
                                <View>
                                    <Text style={styles.text}>Nom: {patient.name}</Text>
                                    <Text style={styles.text}>Prénom: {patient.firstname}</Text>
                                    <Text style={styles.text}>Date de naissance: {patient.yearOfBirthday}</Text>
                                </View>
                            </Card.Content>
                        </Card>
                    </TouchableOpacity>
                </View>
            )
        }
    });

  const updateSearch = (search) => {
    setSearch(search);
  };

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
                        <View style={styles.container}>
                            <View style={{ position: 'absolute', top: 35, left: 15 }} > 
                                <TouchableOpacity onPress={() => navigation.navigate('TabNavigator')} >
                                    <FontAwesome name={'chevron-left'} size={30} color='#99BD8F'/>
                                </TouchableOpacity>        
                            </View> 
                            <Text style={styles.title}>PATIENTS</Text>
                            <View style={{marginTop: 20}}>
                                <TextInput
                                    label="Tapez ici..."
                                    mode='outlined'
                                    onChangeText={updateSearch}
                                    value={search}
                                    style={styles.searchBar}
                                    theme={{ colors: { primary: '#99BD8F' }}}
                                />
                                </View>
                            <View style={{flex: 1, padding: 10}}>
                                <ScrollView >
                                    {afficherPatients}
                                </ScrollView>
                            </View>
                            <View>
                                <TouchableOpacity onPress={() => navigation.navigate('AddPatientScreen')} style={styles.btn}>
                                    <Text style={styles.textBtn}>Ajouter un nouveau patient</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
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
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        fontFamily: 'Poppins_600SemiBold',
        color: '#99BD8F',
        marginTop: 30,
    },
    searchBar: {
        width: 350,
        backgroundColor: '#F0F0F0',
        borderRadius: 10,
        borderBottomColor: '#99BD8F',
        borderTopWidth: 0
      },
      contentcard: {
        width: 345,
        marginRight: 5,
        marginLeft: 5,
        marginBottom: 15,
      },
      text: {
        fontFamily: 'Poppins_400Regular',
        fontSize: 15        
      },
      btn: {
        backgroundColor: '#99BD8F',
        width: 360,
        height: 50,
        borderRadius: 10,
        marginTop: 20,
        marginBottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
      },
      textBtn: {
        fontFamily: 'Poppins_600SemiBold', 
        fontSize: 17,
      },
});