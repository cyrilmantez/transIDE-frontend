import { Button, StyleSheet, Text, View, TouchableWithoutFeedback, KeyboardAvoidingView, ScrollView, Image, Keyboard, TouchableOpacity, SafeAreaView } from 'react-native';
import { TextInput} from 'react-native-paper';
import { useFonts, Poppins_400Regular, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import React, { useState } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useDispatch } from 'react-redux';
import PatientScreen from './screens/PatientScreen';

export default function ConsultationScreen() {
    const dispatch = useDispatch();

    let [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Poppins_600SemiBold,
      });


    return (
    <SafeAreaView  style={styles.container}>
        <View styles={styles.titleContainer}>
            <Text style={styles.titlePage}>Fiche Consultation</Text>
        </View>
        <View>
            <Text style={styles.name}></Text>
            <View>
                <View style={styles.name}></View>
                <View></View>
            </View>
            <View></View>
        </View>
        <View>
        <Text style={styles.titleSoins}>Soins prévus</Text>
        </View>            
        <View style={styles.rdv}>
            <View style={styles.soinsPrevusContainer}></View>
        </View>
        <View>
            <TouchableOpacity  style={styles.button}>  
            <Text style={styles.text}>Valider</Text>            
            </TouchableOpacity>
        </View>
    </SafeAreaView >
    );
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
       marginBottom: 50,
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
     soinsPrevusContainer: {
        marginTop: 5,
        marginLeft: 5,
     },
     
   });