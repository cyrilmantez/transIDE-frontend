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

    
    // Recherche des patients avec le même nom de famille :
    const findPatient = (name) => {

        // Affichage modale multichoix des patients avec le même nom :

        fetch(`http://192.168.1.5:3000/patients/patient/${name}`)
        .then(response => response.json())
        .then(data => {
            
        })
    };

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
                            <View>    
                                <TextInput   
                                    label='NOM'
                                    mode='outlined'
                                    theme={{ 
                                        colors: { 
                                          primary: '#99BD8F', 
                                        }
                                      }}
                                    value={plannedTreatments}
                                    style={styles.input} 
                                    onChangeText={text => findPatient(text)}/>
                            </View>
                        </View>
                        <View>
                            <TouchableOpacity onPress={() => handleSubmit()} style={styles.button} activeOpacity={0.8}>  
                                <Text style={styles.text}>Valider</Text>            
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

});