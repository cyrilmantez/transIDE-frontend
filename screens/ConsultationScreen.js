import { Button, StyleSheet, Text, View, TouchableWithoutFeedback, KeyboardAvoidingView, ScrollView, Keyboard, TouchableOpacity, SafeAreaView, Modal, TextInput } from 'react-native';
//import { TextInput} from 'react-native-paper';
import { useFonts, Poppins_400Regular, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import React, { useState, useEffect } from 'react';
import moment from 'moment'; 
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useSelector } from 'react-redux';


export default function ConsultationScreen({ navigation, route }) {
    
    const user = useSelector((state) => state.users.value);

    // Récupération des données du patient de TourScreen :
    const [patient, setPatient]= useState({_id : route.params._id, date: route.params.date, firstname: route.params.firstname, name: route.params.name, yearOfBirthday: route.params.yearOfBirthday, address: route.params.address, mobile: route.params.mobile, homePhone: route.params.homePhone, isOk: route.params.isOk, isOkWithModification: route.params.isOkWithModification, _idTreatment: route.params._idTreatment, documentsOfTreatment: route.params.documentsOfTreatment});
    
    // Récupération des soins prévus de TourScreen (tableau de strings):
    const [plannedTreatments, setPlannedTreatments] = useState('');
    
    // Transmission :
    const [transmission, setTransmission] = useState('');
   
    // Appel à la modale de validation :
    const [modalVisible, setModalVisible] = useState(false);

    // Transformation des soins récupérés du tourScreen '\n' :
    useEffect(() => {
        let treatments = '';
        for( const treatment of route.params.actions) {
            treatments = `${treatments} 
            ${treatment} `;
        }
        setPlannedTreatments(treatments);
    }, []);

    // fonction de fetch de validation du soin avec modif ou non:
    const validation = (a, b, c) => {
        fetch('http://192.168.1.5:3000/patients/updateTreatment', {
            method: 'PUT',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({
                _id: patient._id,
                _idTreatment : patient._idTreatment,
                isVisited: a,
                isOk: b,
                isOkWithModification: c,
                date: patient.date,
                nurse: user.username,
                documentsOfTreatment: patient.documentsOfTreatment,
                actions: plannedTreatments,
             })
            }).then(response => response.json())
            .then(data => {
                if(data.result) {
                    navigation.navigate('TabNavigator');
            }
        })
      };
    


    const validationWithTransmission = () => {
        const data = {
            transmission: {
                date: new Date(),
                nurse: user.username,
                info: transmission,
                UrlDocument: '',
            },
            patient: {
                name: patient.name, 
                yearOfBirthday:patient.yearOfBirthday, 
            },
            token: user.officesTokens[0].token
        }
        fetch('http://192.168.1.5:3000/transmissions/addtransmission', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data).then(response => response.json())
            .then(data => {})
        });
        
        if(route.params.actions !== plannedTreatments) {
            validation(true, true, true);
        } else {
            validation(true, true, false);
        }
        // if(route.params.actions !== treatments) {
        //     validation(true, true, true);
        // } else {
        //     validation(true, true, false);
        // }
    };

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

    // modale de confirmation de validation :
    let modalContent;
    
    if(transmission.length > 0) {
        modalContent = (
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
                <Text style={styles.modalText}>Souhaites-tu valider tes modifications
                et envoyer la transmission ?</Text>
                <View style={styles.modalChoice}>
                    <TouchableOpacity style={styles.modalChoiceText} onPress={()=> {
                        setModalVisible(!modalVisible);
                    }}>
                    <Text>Non</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.modalChoiceText} onPress={()=> {
                        validationWithTransmission();
                    }}>
                    <Text>OK</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    </Modal>)
    } else {
        modalContent = (
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
                    <TouchableOpacity style={styles.modalChoiceText} onPress={()=> {
                        setModalVisible(!modalVisible);
                    }}>
                    <Text>Non</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.modalChoiceText} onPress={()=> {
                        validation(true, true, true);
                    }}>
                    <Text>Ok</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    </Modal>)
    }

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
        validation(true, false, false)
    }

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
                            <View>
                                <TouchableOpacity onPress={() => handleCancel()} style={styles.cancelButton} activeOpacity={0.8}>  
                                    <Text style={styles.cancelText}>Soin non réalisé</Text>            
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
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
       marginTop: 25,
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
        fontFamily: 'Poppins_400Regular',
      
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
        width: '85%',
        backgroundColor: "#F0F0F0",
        borderRadius: 20,
        padding: 35,
        justifyContent: 'flex-start',
        // alignItems: "center",
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
        //marginTop: 20,
        margin: 20,
        fontSize: 20,
        fontFamily: 'Poppins_400Regular',
        justifyContent: 'space-around',
    },
    modalChoiceText: {
        fontFamily: 'Poppins_400Regular',
        fontSize: 20,
        //justifyContent: 'space-between',
        //alignItems: "space-between",
        //textAlign: 'left',
    },
   });