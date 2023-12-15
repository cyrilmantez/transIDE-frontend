import { Button, StyleSheet, Text, View, TouchableWithoutFeedback, KeyboardAvoidingView, ScrollView, Keyboard, TouchableOpacity, SafeAreaView, Modal, TextInput } from 'react-native';
//import { TextInput} from 'react-native-paper';
import { useFonts, Poppins_400Regular, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import React, { useState, useEffect } from 'react';
<<<<<<< HEAD
import FontAwesome from 'react-native-vector-icons/FontAwesome';
//import { FontAwesomeIcon } from '@fontawesome/react-fontawesome';
=======
//import FontAwesome from 'react-native-vector-icons/FontAwesome';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import { faPhone, faMapLocationDot } from '@fortawesome/free-solid-svg-icons';
//import { useDispatch, useSelector } from 'react-redux';
//import PatientScreen from './screens/PatientScreen';
//import users from '../reducers/users';
import patients from '../reducers/patients';

export default function ConsultationScreen({ navigation, route }) {
    
    
    // Récupération des données du patient de TourScreen :
    const [patient, setPatient]= useState({firstname: route.params.firstname, name: route.params.name, address: route.params.address, mobile: route.params.mobile, homePhone: route.params.homePhone});
    // Récupération des soins prévus de TourScreen (tableau de strings):
    const [plannedTreatments, setPlannedTreatments] = useState('');
    //  Enregistrement des inputs :
    const [textInputValue, setTextInputValue] = useState('');
    // Transmission :
    const [transmission, setTransmission] = useState(' ');
    // Appel à la modale de validation :
    const [modalVisible, setModalVisible] = useState(false);
    
    const openModal = () => setModalVisible(true);
    const closeModal = () => setModalVisible(false);
    
    // Transformation des soins récupérés du tourScreen :
    // '\n'
    useEffect(() => {
        let treatments = '';
        for( const treatment of route.params.actions) {
            treatments = `${treatments} ${treatment}`;
        }
        setPlannedTreatments(treatments);
    }, []);

    //console.log('soinsprévus', plannedTreatments)
    //console.log('patient', patient);
    //console.log('firstname', patient.firstname);

    // Traitement des données du patient :
    const patientInfo = () => {
        const patientName = `${patient.firstname} ${patient.name.toUpperCase()}`;
        const patientPhones = `${patient.mobile} ${patient.homePhone}`;
        return (
            <View style={styles.patientInfo}>
                <View>
                    <Text style={styles.patientName}>{patientName}</Text>
                </View>
                <View style={styles.patientData}>
                    <View style={styles.dataLeft}>
                        <FontAwesome name={'map-pin'} size={24} color='black' />
                        <View>
                            <Text>{patient.address}</Text>
                        </View>
                    </View>
                    <View style={styles.dataRight}>
                        <FontAwesome name={'phone'} size={24} color='black' />
                        <View>
                            <Text>{patientPhones}</Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    };

    /* useEffect(() => {
        fetch(`http://192.168.0.25:3000/patients/patient/6579c5d4c2873da0530e41bf`).then(response => response.json())
        .then(data => {
            //console.log('retour du back', data.result);
            setPatient({firstname: data.patient.firstname, name: data.patient.name, address: data.patient.address, homePhone: data.patient.homephone, mobile: data.patient.mobile});
            for(const treatments of data.patient.treatments) {
                setPlannedTreatments(treatments.actions.join('\n'));                        
            }
        });
    }, []); */

    // modale de confirmation de validation :


    // Effet du clic sur "validation" :
    const handleSubmit = () => {
        {openModal}
      };

    let [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Poppins_600SemiBold,
      });
    
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
                                <Text style={styles.titlePage}>Consultation</Text>
                            </View>
                            <View style={styles.patient}>
                                {patientInfo()}
                            </View>
                            <View style={styles.inputContainer}>
                                <View>
                                    <Text style={styles.titleSoins}>Soins réalisés</Text>
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
                                {/* <View>
                                    <Text style={styles.titleSoins}>Soins supplémentaires</Text>
                                </View>
                                <View>      
                                    <TextInput 
                                        mode='outlined'
                                        multiline={true}
                                        textAlignVertical= 'top'
                                        theme={{ 
                                        colors: { 
                                            primary: '#99BD8F', 
                                        }
                                        }}
                                        style={styles.soinsPrevus} 
                                        onChangeText={text => setNewTreatments(text)} 
                                        value={newTreatments}/>
                                </View>  */}
                                <View>
                                    <Text style={styles.titleSoins}>Transmission</Text>
                                </View>            
                                <TextInput 
                                    mode='outlined'
                                    multiline={true}
                                    textAlignVertical= 'top'
                                    theme={{ 
                                    colors: { 
                                        primary: '#99BD8F', 
                                    }
                                    }}
                                    style={styles.soinsPrevus} 
                                    onChangeText={text => setTransmission(text)} 
                                    value={transmission}/>
                            </View>
                            <View>
                                <TouchableOpacity onPress={() => handleSubmit()} style={styles.button} activeOpacity={0.8}>  
                                    <Text style={styles.text}>Valider</Text>            
                                </TouchableOpacity>
                            </View>
                            {/* <Modal transparent visible={modalVisible} onRequestClose={closeModal}>
                                <View style={styles.modalContainer}>
                                <View style={styles.modalContent}>
                                    <ScrollView style={styles.modalList}>
                                    <Text style={styles.modalText}>Mr LEGRAND François</Text>
                                    </ScrollView>
                                    <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                                    <Text style={styles.modalButtonText}>Fermer la modale</Text>
                                    </TouchableOpacity>
                                </View>
                                </View>
                            </Modal> */}
                        </ScrollView>
                    </KeyboardAvoidingView>
                </TouchableWithoutFeedback>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      marginTop: 35, 
      marginBottom: 10,
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    titlePage: {
       color: '#99BD8F',
       fontSize: 30,
       fontFamily: 'Poppins_600SemiBold',
   },
    chevron: {
        /* justifyContent: 'flex-start',
        alignContent: 'flex-start',
        alignItems: 'flex-start', */
    },
    patient: {
        //backgroundColor: '#99BD8F',
   },
    titleSoins: {
       color: '#99BD8F',
       fontSize: 22,
       marginBottom: 0,
       //marginTop: 20,
       fontFamily: 'Poppins_400Regular',
   },
    text:{
       fontSize: 17,
       fontFamily: 'Poppins_400Regular', 
   },
    button : {
       flexDirection: 'row',
       justifyContent: 'space-between',
       backgroundColor: '#99BD8F',
       width: 350,
       height: 50,
       borderRadius: 10,
       marginTop: 25,
       justifyContent: 'center',
       alignItems: 'center',
     },
    buttonDispo:{
       flexDirection: 'row',
       justifyContent: 'space-between',
     },
    inputContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
     },
     /* soinsPrevusContainer: {
         //marginTop: 0,
         //marginLeft: 10,
         //marginRight: 10,
        }, */
    soinsPrevus:{
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        textAlign: 'left',
        width: 340,
        height: 100,
        backgroundColor: '#F0F0F0',
        borderRadius: 10,
        marginLeft: 10,
        marginRight: 10,
        },
    scrollView: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
    patientInfo : {
        backgroundColor: '#99BD8F',
        alignItems: 'center',
        width: 340,
        height: 100,
        borderRadius: 10,
    },
    patientName: {
        //alignItems: 'center',
        //justifyContent: 'center',
        //textAlign: 'center',
        fontSize: 20,
        fontWeight: '600',
    },
    patientData: {
        justifyContent: 'center',
    },
    dataLeft: {
        flexDirection: 'row',
    },
    dataRight: {
        flexDirection: 'row',
    },
   });