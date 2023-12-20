import { Button, StyleSheet, Text, View, TouchableWithoutFeedback, KeyboardAvoidingView, ScrollView, Keyboard, TouchableOpacity, SafeAreaView, Modal, Image } from 'react-native';
import { TextInput, Icon } from 'react-native-paper';
import { useFonts, Poppins_400Regular, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import React, { useState, useEffect } from 'react';
import moment from 'moment'; 
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function AddConsultationScreen({ navigation, route }) {
    const [plannedTreatments, setPlannedTreatments] = useState('');
    const [patient, setPatient] = useState();
    const [patientName, setPatientName] = useState('');
    const [startDay, setStartDay] = useState();
    const [endDay, setEndDay] = useState('');
    const [hour, setHour] = useState('');
    const [frequency, setFrequency] = useState('');
    
    // // Recherche des patients avec le même nom de famille :
    // const findPatient = (name) => {
    //     name = name.toUpperCase()
    //     // Affichage modale multichoix des patients avec le même nom :
    //     fetch(`http://192.168.1.5:3000/patients/patientByName/${name}`)
    //     .then(response => response.json())
    //     .then(data => {
    //         if (data.result) {
    //             console.log('trouvé :', data.patient)
    //             setPatient(data)
    //         }
    //     })
    // };

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
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
                            <View style={styles.searchPatient}>    
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
                                    style={{ width: 300, marginTop: 15 }}
                                    value={patientName}
                                    onChangeText={text => setPatientName(text)}
                                    />
                                <TouchableOpacity>
                                    <Icon source={'account-search'} size={36} color='#99BD8F' activeOpacity={0.8} style={styles.searchIcon}/>
                                </TouchableOpacity>      
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
                                label='date de début (jj/mm/aaa)'
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
                                label='date de fin (jj/mm/aaaa)'
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
                                label='heure de passage (hh/mm)'
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
                            <View style={styles.frequency}>
                            <TouchableOpacity onPress={()=> validation(patientModal)} style={{ justifyContent: 'space-between', alignItems: 'center'}}>
                            <Text style={{marginTop : 12, fontFamily: 'Poppins_400Regular', fontSize: 10,}}>1X/ jour</Text>
                            <Icon source={'checkbox-blank-circle'} size={42} color='#99BD8F' activeOpacity={0.8}/>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=> validation(patientModal)} style={{ justifyContent: 'space-between', alignItems: 'center'}}>
                            <Text style={{marginTop : 12, fontFamily: 'Poppins_400Regular', fontSize: 10,}}>1X/2 jours</Text>
                            <Icon source={'checkbox-blank-circle'} size={42} color='#99BD8F' activeOpacity={0.8}/>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=> validation(patientModal)} style={{ justifyContent: 'space-between', alignItems: 'center'}}>
                            <Text style={{marginTop : 12, fontFamily: 'Poppins_400Regular', fontSize: 10,}}>1X/3 jours</Text>
                            <Icon source={'checkbox-blank-circle'} size={42} color='#99BD8F' activeOpacity={0.8}/>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=> validation(patientModal)} style={{ justifyContent: 'space-between', alignItems: 'center'}}>
                            <Text style={{marginTop : 12, fontFamily: 'Poppins_400Regular', fontSize: 10,}}>1X/7 jours</Text>
                            <Icon source={'checkbox-blank-circle'} size={42} color='#99BD8F' activeOpacity={0.8}/>
                            </TouchableOpacity>
                            </View>
                        </View>
                        <View>
                            <TouchableOpacity onPress={() => handleSubmit()} style={styles.buttonValidate} activeOpacity={0.8}>  
                                <Text style={styles.textButton}>Valider</Text>            
                            </TouchableOpacity>
                        </View>
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    titleContainer: {
        height: '10%',
        width : '100%',
    },
    // input: {
    //     width: 350,
    // },
    searchPatient:{
        flexDirection: 'row',
    },
    searchIcon: {
        marginRight: -50,
    },
    frequency: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 15,
    },
    titlePage: {
        color: '#99BD8F',
        marginTop: -60,
        fontSize: 30,
        fontFamily: 'Poppins_600SemiBold',
    },
    inputContainer: {
        justifyContent: 'space-between',
    },
    buttonValidate : {
        marginBottom: 35,
        marginTop: 50,
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
});