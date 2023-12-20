// Commentaire
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
import { useSelector } from 'react-redux';
//import PatientScreen from './screens/PatientScreen';
//import users from '../reducers/users';
//import patients from '../reducers/patients';

export default function ConsultationScreen({ navigation, route }) {
    
    const user = useSelector((state) => state.users.value);
    const officeToken = useSelector((state) => state.users.value.officesTokens[0].token);
    console.log(officeToken);
    // Récupération des données du patient de TourScreen :
    const [patient, setPatient]= useState({_id : route.params._id, date: route.params.date, firstname: route.params.firstname, name: route.params.name, yearOfBirthday: route.params.yearOfBirthday, address: route.params.address, mobile: route.params.mobile, homePhone: route.params.homePhone, isOk: route.params.isOk, isOkWithModification: route.params.isOkWithModification, _idTreatment: route.params._idTreatment, documentsOfTreatment: route.params.documentsOfTreatment});
    console.log(patient);
    console.log( patient.yearOfBirthday);
    // Récupération des soins prévus de TourScreen (tableau de strings):
    const [plannedTreatments, setPlannedTreatments] = useState('');
    // Transmission :
    const [transmission, setTransmission] = useState('');
    // Statut de la consultation à la validation :
    const [consultationDone, setConsultationDone] = useState(false);
    // Appel à la modale de confirmation de fin de la consultation :
    const [consultationModalVisible, setConsultationModalVisible] = useState(false);
    // Appel à la modale de validation :
    const [modalVisible, setModalVisible] = useState(false);

    
    // Transformation des soins récupérés du tourScreen '\n' :
    useEffect(() => {
        let treatments = '';
        for( const treatment of route.params.actions) {
            treatments = `${treatment} 
            ${treatments} `;
        }
        setPlannedTreatments(treatments);
    }, []);

    // Validation des modifications effectuées :
    const validation = () => {
        let isVisited = false;
        let isOkWithModification = false;

        if(route.params.actions !== plannedTreatments) {
            isOkWithModification = true;
        }
        if (consultationDone) {
            isVisited = true;
        }
        
        fetch('http://192.168.0.25:3000/patients/updateTreatment', {
            method: 'PUT',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({
                _id: patient._id,
                isVisited: isVisited,
                isOk: true,
                isOkWithModification: isOkWithModification,
                date: patient.date,
                nurse: user.username,
                documentsOfTreatment: patient.documentsOfTreatment,
                actions: plannedTreatments,
                _idTreatment: patient._idTreatment,
             })
            }).then(response => response.json())
            .then(data => {
                if(data.result) {
                    console.log('updateTreatment', data);
                    navigation.navigate('TabNavigator');
            }
        })

        if(transmission > 0) {
            fetch('http://192.168.0.25:3000/transmissions/addtransmission', {
                method: 'POST',
                headers: {'Content-Type' : 'application/json'},
                body: JSON.stringify({
                    transmission: {
                        date: new Date(),
                        nurse: user.username,
                        info: transmission,
                        UrlDocument: '',
                    },
                    patient: {
                        name: patient.name, 
                        yearOfBirthday: patient.yearOfBirthday, 
                    },
                    token: officeToken,
                })
            })
            .then(response => response.json())
            .then(data => {
                if(data.result) {
                    console.log('addtransmission', data);
                }
            })
        }
      };
    
    

        /* if(route.params.actions !== plannedTreatments) {
            validation(true, true, true);
        } else {
            validation(true, true, false);
        } */

    /* const updateTreatmentInDB = () => {
        fetch('http://192.168.0.25:3000/patients/allPatients', {
            method: 'PUT',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({officeToken: user.officesTokens, dateOfToday : date })
        }).then(response => response.json())
        .then(data => {
            setIsVisited(false);
            setIsOk(false);
            setIsOkWithModification(false);
        })
    } */
        
    // Formatage de la date de la consultation :
    const date = moment(route.params.date).format('L');
    // Formatage de l'heure de la consultation :
    const treatmentHour = moment(route.params.date).format('kk:mm');
    
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

    // Modale de validation des modifications :
    let modalContent = (
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
            <Text style={styles.modalText}>Souhaites-tu valider tes modifications ?</Text>
            <View style={styles.modalChoice}>
                <TouchableOpacity onPress={()=> {
                    setModalVisible(!modalVisible);
                }}>
                <Text style={styles.modalChoiceText}>Non</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> {
                    setModalVisible(!modalVisible);
                    setConsultationModalVisible(true);
                }}>
                <Text style={styles.modalChoiceText}>Oui</Text>
                </TouchableOpacity>
            </View>
        </View>
    </View>
    </Modal>)

    // modale de confirmation de consultation :
    let consultationModalContent = (
        <Modal
        animationType="slide"
        transparent={true}
        visible={consultationModalVisible}
        onRequestClose={() => {
            setConsultationModalVisible(!consultationModalVisible);
        }}
        >
        <View style={styles.centeredView}>
            <View style={styles.modalView}>
                <Text style={styles.modalText}>As-tu déjà effectué la consultation ?</Text>
                <View style={styles.modalChoice}>
                    <TouchableOpacity onPress={()=> {
                        setConsultationModalVisible(!consultationModalVisible);
                        validation();
                    }}>
                    <Text style={styles.modalChoiceText}>Non</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=> {
                        setConsultationModalVisible(!consultationModalVisible);
                        setConsultationDone(true);
                        validation();
                    }}>
                    <Text style={styles.modalChoiceText}>Oui</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
        </Modal>
    )
    
    
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

    // Effet du clic sur "validation" :
    const handleSubmit = () => {
        setModalVisible(true);
      };

    // Effet du clic sur "Soin non réalisé" :
    /* const handleCancel = () => {

    } */

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
                                <Text style={styles.day}>{`du ${date} à ${treatmentHour}`}</Text>
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
                            </View>
                            {/* <View>
                                <TouchableOpacity onPress={() => handleCancel()} style={styles.cancelButton} activeOpacity={0.8}>  
                                    <Text style={styles.cancelText}>Soin non réalisé</Text>            
                                </TouchableOpacity>
                            </View> */}
                        </ScrollView>
                        {consultationModalContent}
                        {modalContent}
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
   cancelText:{
    fontSize: 17,
    fontFamily: 'Poppins_400Regular', 
    color: 'white',
},
    button : {
       flexDirection: 'row',
       justifyContent: 'space-between',
       backgroundColor: '#99BD8F',
       width: 350,
       height: 50,
       borderRadius: 10,
       marginTop: 20,
       justifyContent: 'center',
       alignItems: 'center',
     },
    cancelButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'red',
        width: 350,
        height: 50,
        borderRadius: 10,
        marginTop: 15,
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
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
        backgroundColor: "rgba(0,0,0,0,0.5)",
      },
    modalView: {
        height: 300,
        width: '80%',
        backgroundColor: "#F0F0F0",
        borderRadius: 20,
        padding: 35,
        justifyContent: 'flex-start',
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
    modalText: {
        marginTop: 10,
        marginBottom: 25,
        color: '#99BD8F',
        fontSize: 20,
        textAlign: 'center',
        fontFamily: 'Poppins_400Regular',
        fontWeight: 'bold',
      },
    modalChoice: {
        flexDirection: 'row',
        margin: 20,
        fontSize: 20,
        fontFamily: 'Poppins_400Regular',
    },
    modalChoiceText: {
        fontFamily: 'Poppins_600SemiBold',
        fontWeight: '300',
        fontSize: 20,
        marginLeft: 30,
        marginRight: 30,
        backgroundColor: "#99BD8F",
        padding: 5,
        borderRadius: 10,
        width: 90,
        height: 50,
        textAlign: 'center',
        textAlignVertical: 'center',
    },
   });