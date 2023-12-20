import { Button, StyleSheet, Text, View, TouchableWithoutFeedback, KeyboardAvoidingView, ScrollView, Keyboard, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import { useFonts, Poppins_400Regular, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import React, { useState, useEffect } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useSelector } from 'react-redux';
import { Icon, Card } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { logout } from '../reducers/users';
import { SearchBar } from 'react-native-elements';

export default function MyPatientsScreen({ navigation, route }) {

    const [search, setSearch] = useState('');
    const [patients, setPatients] = useState([]);
    const [data, setData] = useState([]);

    const user = useSelector((state) => state.users.value)
    console.log(user.officesTokens)
    useEffect(() => {
        fetch(`http://192.168.1.14:3000/patients/allPatientDay/${user.officesTokens}`) 
          .then(response => response.json())
          .then(data => {
            if (data.Patients) {
              const filteredData = data.Patients.filter(patient => patient.officeToken === user.officesTokens) // Filtrez les patients par token de cabinet
                .map(patient => ({
                  name: patient.name,
                  firstname: patient.firstname,
                  yearOfBirthday: patient.yearOfBirthday,
                }));
              setPatients(filteredData);
              setData(data); console.log(data)
            }
          })
          .catch(error => console.error(error));
      }, [user]);
      
  const updateSearch = (search) => {
    setSearch(search);
  };


  const afficherPatients =  data.Patients.map((patient, i) => {
    return (
        <View key={i}>
          <Card style={styles.contentcard}>
            <Card.Content style={styles.card}>
              <View>
                <Text>Nom: {patient.name}</Text>
                <Text>Prénom: {patient.firstname}</Text>
                <Text>Date de naissance: {patient.yearOfBirthday}</Text>
              </View>
            </Card.Content>
          </Card>
        </View>
    )
});


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
                            <Text style={styles.title}>MY PATIENTS</Text>
                            <View style={{marginTop: 20}}>
                                <SearchBar
                                    placeholder="Tapez ici..."
                                    onChangeText={updateSearch}
                                    value={search}
                                    containerStyle={styles.searchBar}
                                    inputContainerStyle={{backgroundColor: '#F0F0F0'}}
                                />
                                </View>
                            <ScrollView >
                                <Text> {afficherPatients}</Text>
                            </ScrollView>
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
});