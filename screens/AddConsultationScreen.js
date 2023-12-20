import { Button, StyleSheet, Text, View, TouchableWithoutFeedback, KeyboardAvoidingView, ScrollView, Keyboard, TouchableOpacity, SafeAreaView, Modal, TextInput } from 'react-native';
import { useFonts, Poppins_400Regular, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import React, { useState, useEffect } from 'react';
import moment from 'moment'; 
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function AddConsultationScreen({ navigation, route }) {
    const [patientName, setPatientName] = useState('');
    const [patientFirstname, setPatientFirstname] = useState('');
    const [patientAddress, setPatientAddress] = useState('');
    const [patientAddressInfo, setPatientAddressInfo] = useState('');
    const [patientMobile, setPatientMobile] = useState('');
    const [patientHomePhone, setPatientHomePhone] = useState('');
    const [plannedTreatments, setPlannedTreatments] = useState('');

    const [allPatients, setAllPatients] = useState([]);
    const [suggestions, setSuggestions] = useState([])
    const [modalMessage, setModalMessage] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false)

    useEffect (() => {
        fetch(`http://192.168.0.25:3000/patients/allPatientDay/${officeToken}`).then(
          response => response.json())
          .then(data => setAllPatients(data.Patients))
      }, [])
      console.log('allPatients :', allPatients);

    
    // Recherche des patients avec le même nom de famille :
    const handlePatientNameChange = (text => {
        setPatientName(text);
      const filteredSuggestions = allPatients.filter((item) =>
      item.name.toLowerCase().includes(text.toLowerCase())
    );
      filteredSuggestions.sort((a, b) => {
        //Sort by name
        const nameA = a.name.toUpperCase();
        const nameB = b.name.toUpperCase();
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
      
         //Sort by firstname
        const firstNameA = a.firstname.toUpperCase();
        const firstNameB = b.firstname.toUpperCase();
      
        if (firstNameA < firstNameB) return -1;
        if (firstNameA > firstNameB) return 1;
      
         //Sort by yearOfBirthday
        const dateA = new Date(a.yearOfBirthday.split('/').reverse().join('/'));
        const dateB = new Date(b.yearOfBirthday.split('/').reverse().join('/'));
      
        return dateA - dateB;
      });
      setSuggestions(filteredSuggestions);
      });

      const suggestionsToDisplay = suggestions.map((item, index) => {
        return (
        
           <TouchableOpacity key={index} style={styles.listSuggestionText} onPress={()=>{handlePatientChoice (item.name, item.firstname, item.yearOfBirthday)}}>
           <Text style={styles.textAlign}>{`${item.name} ${item.firstname} - ${item.yearOfBirthday}`} </Text>
         </TouchableOpacity>
        )
        
     });
    // Affichage modale multichoix des patients avec le même nom :

    fetch(`http://192.168.0.25:3000/patients/patient/${name}`)
    .then(response => response.json())
    .then(data => {
        
    })
    

    if (!fontsLoaded) {
        return <View />;
    } else {
        return (
            <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                        <ScrollView contentContainerStyle={styles.scrollView}>
                            <View style={styles.chevron}> 
                                <TouchableOpacity onPress={() => {navigation.navigate('TabNavigator')}}>
                                    <FontAwesome name={'chevron-left'} size={24} color='#99BD8F' />
                                </TouchableOpacity>
                            </View>
                            <View styles={styles.titleContainer}>
                                <Text style={styles.titlePage}>Nouvelle consultation</Text>
                            </View>
                            <View style={styles.inputContainer}>   
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
                                        value={patientName}
                                        onFocus={() => setPatient({name : 'Général', firstname: '', yearOfBirthday : ''})}/>
                                        {patientName && patient.name==='Général' && (<View style={styles.suggestionsContainer}>
                                        <>
                                            {suggestionsToDisplay}
                                        </>
                                        </View>)}
                                </> )}
                            </View>
                            <View>    
                                <TextInput   
                                    mode='outlined'
                                    value={plannedTreatments}
                                    multiline={true}
                                    textAlignVertical= 'top'
                                    theme={{ 
                                        colors: { 
                                            primary: '#99BD8F', 
                                        }
                                    }}
                                    style={styles.soinsPrevus} 
                                    onChangeText={text => setPlannedTreatments(text)}/>
                            </View>
                            <View>
                                <TouchableOpacity onPress={() => handleSubmit()} style={styles.button} activeOpacity={0.8}>  
                                    <Text style={styles.text}>Enregistrer</Text>            
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    </KeyboardAvoidingView>
                </TouchableWithoutFeedback>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({

});