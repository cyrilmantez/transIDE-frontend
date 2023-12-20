import { Button, StyleSheet, Text, View, TouchableWithoutFeedback, KeyboardAvoidingView, ScrollView, Keyboard, TouchableOpacity, SafeAreaView, Modal, TextInput, Image } from 'react-native';
import { useFonts, Poppins_400Regular, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import React, { useState, useEffect } from 'react';
import moment from 'moment'; 
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function AddConsultationScreen({ navigation, route }) {
    const [plannedTreatments, setPlannedTreatments] = useState('');
    const [patient, setPatient] = useState();
    const [patientName, setPatientName] = useState();
    const [startDay, setStartDay] = useState();
    const [endDay, setEndDay] = useState();
    const [hour, setHour] = useState();
    const [frequency, setFrequency] = useState();
    
    // Recherche des patients avec le même nom de famille :
    const findPatient = (name) => {
        // Affichage modale multichoix des patients avec le même nom :
        fetch(`http://192.168.0.25:3000/patients/patientByName/${name}`)
        .then(response => response.json())
        .then(data => {
            if (data.result) {
                setPatient(data)
            }
        })
    };

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                    <ScrollView contentContainerStyle={styles.scrollView}>
                        <View style={styles.header}>
                            <TouchableOpacity>
                            <FontAwesome name={'chevron-left'} size={24} color='#99BD8F' marginTop={20} marginLeft={15} onPress={() => navigation.navigate('TabNavigator')} />
                            </TouchableOpacity>
                            <Image 
                            style={styles.image}
                            source={require('../assets/logo.png')} />
                        </View>
                        <View styles={styles.titleContainer}>
                            <Text style={styles.titlePage}>Nouvelle consultation</Text>
                        </View>
                        <View style={styles.inputContainer}>   
                            <View>    
                                <TextInput  
                                    label='Nom du patient'
                                    mode='outlined'
                                    multiline={true}
                                    textAlignVertical= 'top'
                                    theme={{ 
                                        colors: { 
                                        primary: '#99BD8F', 
                                        }
                                    }}
                                    style={{ width: 350, marginTop: 15 }}
                                    value={patientName}
                                    onChangeText={text => findPatient(text)}/>
                            </View>
                            <View>
                            <TextInput 
                                label='soins prévus'
                                mode='outlined'
                                theme={{ 
                                    colors: { 
                                    primary: '#99BD8F', 
                                    }
                                }}
                                style={{ width: 350, marginTop: 15 }}
                                onChangeText={text => setPlannedTreatments(text)} 
                                value={plannedTreatments}/>
                            <TextInput 
                                label='date de début'
                                mode='outlined'
                                theme={{ 
                                    colors: { 
                                    primary: '#99BD8F', 
                                    }
                                }}
                                style={{ width: 350, marginTop: 15 }}
                                onChangeText={text => setStartDay(text)} 
                                value={startDay}/>
                            <TextInput 
                                label='date de fin'
                                mode='outlined'
                                theme={{ 
                                    colors: { 
                                    primary: '#99BD8F', 
                                    }
                                }}
                                style={{ width: 350, marginTop: 15 }}
                                onChangeText={text => setEndDay(text)} 
                                value={endDay}/>
                            <TextInput 
                                label='heure de passage'
                                mode='outlined'
                                theme={{ 
                                    colors: { 
                                    primary: '#99BD8F', 
                                    }
                                }}
                                style={{ width: 350, marginTop: 15 }}
                                onChangeText={text => setHour(text)} 
                                value={hour}/>
                            </View>
                            
                        </View>
                        <View>
                            <TouchableOpacity onPress={() => handleSubmit()} style={styles.buttonValidate} activeOpacity={0.8}>  
                                <Text style={styles.textButton}>Valider</Text>            
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    scrollView: {
        justifyContent: 'space-between',
        alignItems: 'center',
        // flex: 1,
        // backgroundColor: '#fff',

    },
    header: {
        height: '10%',
        width : '100%',
        justifyContent: 'space-between',
        flexDirection: 'row',
 
      },
      image: {
        width: 60,
        height: 60,
      },
    input: {
        width: 350,
    },
    buttonValidate : {
        marginTop: 120,
        backgroundColor: '#99BD8F',
        width: 350,
        height: 50,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
      },
      textButton:{
        color: 'white',
        fontSize: 15,
        fontFamily: 'Poppins_600SemiBold',
      },
      titlePage: {
        color: '#99BD8F',
        fontSize: 30,
        fontFamily: 'Poppins_600SemiBold',
       },
});