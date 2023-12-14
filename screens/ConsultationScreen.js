import { Button, StyleSheet, Text, View, TouchableWithoutFeedback, KeyboardAvoidingView, ScrollView, Keyboard, TouchableOpacity, SafeAreaView } from 'react-native';
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
    const [soinsPrevus, setSoinsPrevus] = useState(null);
    const [transmission, setTransmission] = useState(null);


    /* ${props._id} */
    useEffect(() => {
        fetch(`http://192.168.1.5:3000/patient/6579c5d4c2873da0530e41bf`).then(response => response.json())
        .then(data => {
            setPatient(data.patient)
        })
      }, []);

    console.log(patient);
    //const patientInfo = 

    const handleSubmit = () => {
        
        navigation.navigate('TabNavigator');
      };

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
                                <View style={styles.soinsPrevus}>
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
                                    onChangeText={text => setSoinsPrevus(text)} 
                                    value={soinsPrevus}/>
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
                        </ScrollView>
                    </KeyboardAvoidingView>
                </TouchableWithoutFeedback>
            </SafeAreaView>
            </>
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