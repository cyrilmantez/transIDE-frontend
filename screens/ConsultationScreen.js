import { Button, StyleSheet, Text, View, TouchableWithoutFeedback, KeyboardAvoidingView, ScrollView, Image, Keyboard, TouchableOpacity, SafeAreaView } from 'react-native';
import { TextInput} from 'react-native-paper';
import { useFonts, Poppins_400Regular, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import React, { useState } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux';
//import PatientScreen from './screens/PatientScreen';
//import users from '../reducers/users';
//import patients from '../reducers/patients';

export default function ConsultationScreen() {
    const dispatch = useDispatch();
    //const users = useSelector((state) => state.users.value.username);
    //const patients = useSelector((state) => state.patients.value.XXXX);

    let [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Poppins_600SemiBold,
      });
    
    if (!fontsLoaded) {
        return <View />;
    } else {

        return (
        <SafeAreaView  style={styles.container}>
            <View styles={styles.titleContainer}>
                <Text style={styles.titlePage}>Consultation</Text>
            </View>
            <View>
                <Text style={styles.name}>{/* {patients} */}</Text>
                <View>
                    <View style={styles.name}></View>
                    <View></View>
                </View>
            </View>
            <View style={styles.inputContainer}>
                <View>
                    <Text style={styles.titleSoins}>Soins prévus</Text>
                </View>            
                <View style={styles.soinsPrevusContainer}>
                    <View style={styles.soinsPrevus}></View>
                </View>
                <View>
                    <Text style={styles.titleSoins}>Soins supplémentaires</Text>
                </View>            
                <View style={styles.soinsPrevusContainer}>
                    <View style={styles.soinsPrevus}></View>
                </View>
                <View>
                    <Text style={styles.titleSoins}>Transmissions</Text>
                </View>            
                <View style={styles.soinsPrevusContainer}>
                    <View style={styles.soinsPrevus}></View>
                </View>
            </View>
            <View>
                <TouchableOpacity  style={styles.button}>  
                <Text style={styles.text}>Valider</Text>            
                </TouchableOpacity>
            </View>
        </SafeAreaView >
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
      justifyContent: 'space-between',
    },
   titlePage: {
       color: '#99BD8F',
       fontSize: 30,
       marginBottom: 30,
       fontFamily: 'Poppins_600SemiBold',
   },
   titleSoins: {
       color: '#99BD8F',
       fontSize: 30,
       marginBottom: 50,
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
     },
     soinsPrevus:{
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        width: 350,
        height: 200,
        backgroundColor: '#F0F0F0',
        borderRadius: 10,
      },
     soinsPrevusContainer: {
        marginTop: 5,
        marginLeft: 5,
     },
     
   });