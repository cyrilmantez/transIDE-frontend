import { Button, StyleSheet, Text, View, TouchableWithoutFeedback, KeyboardAvoidingView, ScrollView, Keyboard, TouchableOpacity, SafeAreaView, Modal, TextInput } from 'react-native';
//import { TextInput} from 'react-native-paper';
import { useFonts, Poppins_400Regular, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import React, { useState, useEffect } from 'react';
import moment from 'moment'; 
import FontAwesome from 'react-native-vector-icons/FontAwesome';
//import { FontAwesomeIcon } from '@fontawesome/react-fontawesome';

//import FontAwesome from 'react-native-vector-icons/FontAwesome';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import { faPhone, faMapLocationDot } from '@fortawesome/free-solid-svg-icons';
//import { useDispatch, useSelector } from 'react-redux';
//import PatientScreen from './screens/PatientScreen';
//import users from '../reducers/users';
//import patients from '../reducers/patients';

export default function ConsultationScreen({ navigation, route }) {
    
    
    // Récupération des données du patient de TourScreen :
    const [patient, setPatient]= useState({_id : route.params._id, date: route.params.date, firstname: route.params.firstname, name: route.params.name, address: route.params.address, mobile: route.params.mobile, homePhone: route.params.homePhone, isOk: route.params.isOk, isOkWithModification: route.params.isOkWithModification, _idTreatment: route.params._idTreatment});
    // Récupération des soins prévus de TourScreen (tableau de strings):
    const [plannedTreatments, setPlannedTreatments] = useState('');
    // Enregistrement des inputs :
    const [textInputValue, setTextInputValue] = useState('');
    // Transmission :
    const [transmission, setTransmission] = useState(' ');
    // Appel à la modale de validation :
    const [modalVisible, setModalVisible] = useState(false);

    
    // Transformation des soins récupérés du tourScreen :
    // '\n'
    useEffect(() => {
        let treatments = '';
        for( const treatment of route.params.actions) {
            treatments = `${treatments} 
            ${treatment} `;
        }
        setPlannedTreatments(treatments);
    }, []);
    
    //console.log('soinsprévus', plannedTreatments)
    //console.log('patient', patient);
    //console.log('firstname', patient.firstname);
    
    // Formatage de la date de la consultation :
    const date = moment(route.params.date).format('L');
    
    // Traitement des données du patient :
    const patientInfo = () => {
        let patientName = `${patient.firstname} ${patient.name.toUpperCase()}`;
        const patientPhones = `${patient.mobile}   ${patient.homePhone}`;
        let truncatedName;
        
        if (patientName.length > 20) {
            truncatedName = `${patientName.substring(0, 20)}...`;
        } else {
            truncatedName = patientName;
        }

        return (
            <View style={styles.patientInfo}>
                <TouchableOpacity 
                    onPress={() => navigation.navigate('PatientScreen', { _id : patient._id})}>
                    <View style={styles.patientName}>
                        <Text style={styles.patientName}>{truncatedName}</Text>
                    </View>
                    <View>
                        <View style={styles.dataTop}>
                            <FontAwesome name={'map-pin'} size={24} color='black' />
                            <View>
                                <Text>  {patient.address}</Text>
                            </View>
                        </View>
                        <View style={styles.dataBottom}>
                            <FontAwesome name={'phone'} size={24} color='black' />
                            <View>
                                <Text>  {patientPhones}</Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        );
    };

    const modalContent = (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
            setModalVisible(!modalVisible);
            }}
        >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>validation des soins réalisés</Text>
            <Button
              title="Retour"
              onPress={() => {
                setModalVisible(!modalVisible);
                navigation.navigate('TabNavigator');
              }}
            />
          </View>
          <View>
            <TouchableOpacity onPress={()=> setModalVisible(true)}>
              <Text>soins validés</Text>
              <FontAwesome name={'square-o'} size={24} color='#99BD8F' />
            </TouchableOpacity>
            <TouchableOpacity onPress={()=> setModalVisible(true)}>
              <Text>soins à modifier</Text>
              <FontAwesome name={'draw-pen'} size={24} color='#99BD8F' />
            </TouchableOpacity>
            <TouchableOpacity onPress={()=> setModalVisible(true)}>
              <Text>soins annulés</Text>
              <FontAwesome name={'alpha-x-box-outline'} size={24} color='#99BD8F' />
            </TouchableOpacity>
    
          </View>
        </View>
        </Modal>
    )

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
        setModalVisible(true);
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
                                <Text style={styles.day}>{`du ${date}`}</Text>
                            </View>
                            <View>
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
                                {/* {modalContent} */}
                            </View>
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
        textAlign: 'center',
    },
    day: {
        color: '#99BD8F',
        fontSize: 15,
        fontFamily: 'Poppins_600SemiBold',
        textAlign: 'center',
        marginTop: 0,
    },
    chevron: {
       alignSelf: 'flex-start',
       marginLeft: 20,
    },
    titleSoins: {
       color: '#99BD8F',
       fontSize: 22,
       marginBottom: 0,
       marginTop: 10,
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
    soinsPrevus:{
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        textAlign: 'left',
        width: 340,
        height: 120,
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
        width: 340,
        height: 150,
        borderRadius: 10,
    },  
    patientName: {
        alignSelf: 'center',
        marginTop: 5,
        marginBottom: 5,
        fontSize: 20,
        fontWeight: '600',
    },
    dataTop: {
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 10,
        alignItems: 'flex-start',
        paddingLeft: 10,
    },
    dataBottom: {
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 10,
        alignItems: 'flex-start',
        paddingLeft: 10,
    },
   });