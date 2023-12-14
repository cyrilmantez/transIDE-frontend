import { Button, StyleSheet, Text, View, TouchableWithoutFeedback, KeyboardAvoidingView, ScrollView, Keyboard, TouchableOpacity, SafeAreaView, Modal } from 'react-native';
import { TextInput} from 'react-native-paper';
import { useFonts, Poppins_400Regular, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import React, { useState, useEffect } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux';
//import PatientScreen from './screens/PatientScreen';
//import users from '../reducers/users';
import patients from '../reducers/patients';

export default function ConsultationScreen() {
    const dispatch = useDispatch();
    
    //const users = useSelector((state) => state.users.value.username);
    const [patient, setPatient]= useState(null);
    // récupère les soins prévus lors du fetch initial :
    const [initialPlannedTreatments, setInitialPlannedTreatments] = useState('');
    // remplacer le texte en dur par initialPlannedTreatments
    const [plannedTreatments, setPlannedTreatments] = useState('15h00 : piqûre dans la fesse gauche');
    const [newTreatments, setNewTreatments] = useState('');
    const [transmission, setTransmission] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    const openModal = () => setModalVisible(true);
    const closeModal = () => setModalVisible(false);

    // Récupération des données du patient :
    /* ${props._id} */
    useEffect(() => {
        fetch(`http://192.168.1.5:3000/patients/6579c5d4c2873da0530e41bf`).then(response => response.json())
        .then(data => {
            console.log(data.result);
            setPatient({firstname: data.firstname, name: data.name, address: data.address, homePhone: data.homephone, mobile: data.mobile});
            setInitialPlannedTreatments({treatments: {date: data.treatments.date, action: date.treatments.actions}});
        });
    }, [plannedTreatments]);
    
    // Fonction pour mettre à jour la valeur des soins prévus :
    const updatePlannedTreatments = (newText) => {
        setPlannedTreatments(newText);
    };

    console.log(patient);
    console.log(plannedTreatments);
    
    // Mise en page données patient :
    //const patientInfo = 

    // modale de confirmation de validation :


    // Effet du clic sur "validation" :
    const handleSubmit = () => {
        {openModal}
        /* navigation.navigate('TabNavigator'); */
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
                            <View styles={styles.titleContainer}>
                                <Text style={styles.titlePage}>Consultation</Text>
                            </View>
                            <View style={styles.patient}>
                                <View>
                                    <View style={styles.name}>{/* {patientInfo} */}</View>
                                    <View></View>
                                </View>
                            </View>
                            <View style={styles.inputContainer}>
                                <View>
                                    <Text style={styles.titleSoins}>Soins prévus</Text>
                                </View>      
                                <View>    
                                    <TextInput   
                                        mode='outlined'
                                        value={plannedTreatments}
                                        multiline
                                        theme={{ 
                                        colors: { 
                                            primary: '#99BD8F', 
                                        }
                                        }}
                                        style={styles.soinsPrevus} 
                                        onChangeText={updatePlannedTreatments}/>
                                </View>
                                <View>
                                    <Text style={styles.titleSoins}>Soins supplémentaires</Text>
                                </View>            
                                <TextInput 
                                    mode='outlined'
                                    multiline
                                    theme={{ 
                                    colors: { 
                                        primary: '#99BD8F', 
                                    }
                                    }}
                                    style={styles.soinsPrevus} 
                                    onChangeText={text => setNewTreatments(text)} 
                                    value={newTreatments}/>
                                <View>
                                    <Text style={styles.titleSoins}>Transmissions</Text>
                                </View>            
                                <TextInput 
                                    mode='outlined'
                                    multiline
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
       marginBottom: 30,
       fontFamily: 'Poppins_600SemiBold',
   },
    patient: {
        backgroundColor: '#99BD8F',
   },
    titleSoins: {
       color: '#99BD8F',
       fontSize: 22,
       marginBottom: 0,
       marginTop: 20,
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
        width: 340,
        height: 180,
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
   });