import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, View, SafeAreaView, ScrollView, Image,TouchableOpacity, StatusBar , Platform } from 'react-native';
import Dropdown from './Dropdown';
import DateTimePicker from '@react-native-community/datetimepicker';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useFonts, Poppins_400Regular, Poppins_600SemiBold } from '@expo-google-fonts/poppins';

 

export default function TransmissionScreen(navigation) {
  const [date, setDate] = useState (new Date())
  const [transmissions, setTransmissions] = useState([])
  
  
  //get data from dataBase, and dispatch in the reducer, avec la limite de 7j
  useEffect(() => {
    fetch(`http://192.168.1.162:3000/transmissions/allTraransmissions/${date}`).then(response => response.json())
    .then((data) => {
      console.log(data)
      if(data){
        setTransmissions(data.transmissions)
      }
    })
  },[])
  //display data from the hook
  const transmissionsToDisplay = transmissions.map(element => {
    const years = element.date.getFullYear();
    const month = element.date.getMonth();
    const day = element.date.getDate();
    const hours = 

    return 
    <ScrollView style={styles.transmission}>
      <Text style={styles.personAbout}>Pour {element.name} {element.firstname}</Text>
      <Text style={styles.publicationDate}>Publié le {day}/{month}/{years} à 13h00, par {element.nurse}.</Text>
      <Text style={styles.message}>Ceci est un message random Ceci est un message random Ceci est un message random Ceci est un message random Ceci est un message random Ceci est un message random Ceci est un message random  Ceci est un message random Ceci est un message random Ceci est un message random Ceci est un message random Ceci est un message random Ceci est un message random </Text>
  </ScrollView>
  })

 return (
  <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
    <StatusBar barStyle="light-content"/>
      <View style={styles.container}>
        <View style={styles.header}>
          <Dropdown style={styles.dropdown} navigation={navigation} />
          <Image 
          style={styles.image}
          source={require('../assets/logo.png')} />
        </View>
        <Text style={styles.journal} >Journal</Text>
        <View style={styles.filterContainer}>
            <Text style={styles.text}>Filtrer par :</Text>
            <View style={styles.buttonContainer}>
                  <TouchableOpacity style={styles.button} >
                      <Text style={styles.text} >IDE</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.button} >
                      <Text style={styles.text} >Date</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.button} >
                      <Text style={styles.text} >Patient</Text>
                  </TouchableOpacity>
            </View>
            <Text style={styles.text}>Transmission non lu: 10/100</Text>
        </View>
        <ScrollView style={styles.transmissionsContainer}>
          <View style={styles.transmissions}>
              <ScrollView style={styles.transmission}>
                <Text style={styles.personAbout}>Pour Mme Musk ELONA</Text>
                <Text style={styles.publicationDate}>Publié le 04/12/2023 à 13h00, par SuperCyril.</Text>
                <Text style={styles.message}>Ceci est un message random Ceci est un message random Ceci est un message random Ceci est un message random Ceci est un message random Ceci est un message random Ceci est un message random  Ceci est un message random Ceci est un message random Ceci est un message random Ceci est un message random Ceci est un message random Ceci est un message random </Text>
              </ScrollView>
              <ScrollView style={styles.transmission}>
                <Text style={styles.personAbout}>Pour Mme Musk ELONA</Text>
                <Text style={styles.publicationDate}>Publié le 04/12/2023 à 13h00, par SuperCyril.</Text>
                <Text style={styles.message}>Ceci est un message random Ceci est un messagi est un message random Ceci est un message random  Ceci est un message random Ceci est un message random Ceci est un message random Ceci est un message random Ceci est un message random Ceci est un message random </Text>
              </ScrollView>
              <ScrollView style={styles.transmission}>
                <Text style={styles.personAbout}>Pour Mme Musk ELONA</Text>
                <Text style={styles.publicationDate}>Publié le 04/12/2023 à 13h00, par SuperCyril.</Text>
                <Text style={styles.message}>Ceci est un message random Ceci est un message random Ceci est un message random Ceci est un message random Ceci est un message random Ceci est un message random Ceci est un message random  Ceci est un message random Ceci est un message random Ceci est un message random Ceci est un message random Ceci est un message random Ceci est un message random </Text>
              </ScrollView>
              <ScrollView style={styles.transmission}>
                <Text style={styles.personAbout}>Pour Mme Musk ELONA</Text>
                <Text style={styles.publicationDate}>Publié le 04/12/2023 à 13h00, par SuperCyril.</Text>
                <Text style={styles.message}>Ceci est un message random Ceci est un message random Ceci est st un message random Ceci est un message random  Ceci est un message random Ceci est un message random Ceci est un message random Ceci est un message random Ceci est un message random Ceci est un message random </Text>
              </ScrollView>
              <ScrollView style={styles.transmission}>
                <Text style={styles.personAbout}>Pour Mme Musk ELONA</Text>
                <Text style={styles.publicationDate}>Publié le 04/12/2023 à 13h00, par SuperCyril.</Text>
                <Text style={styles.message}>Ceci est un message random Ceci est un message random Ceci est un message random Ceci est un message random Ceci est un message random Ceci est un message random Ceci est un message random  Ceci est un message random Ceci est un message random Ceci est un message random Ceci est un message random Ceci est un message random Ceci est un message random </Text>
              </ScrollView>
              <ScrollView style={styles.transmission}>
                <Text style={styles.personAbout}>Pour Mme Musk ELONA</Text>
                <Text style={styles.publicationDate}>Publié le 04/12/2023 à 13h00, par SuperCyril.</Text>
                <Text style={styles.message}>Ceci est un message random Ceci est un message random Ceci est un message random Ceci est un message random Ceci est un message random Ceci est un message random Ceci est un message random  Ceci est un message random Ceci est un message random Ceci est un message random Ceci est un message random Ceci est un message random Ceci est un message random </Text>
              </ScrollView>

          </View>
         
        </ScrollView>
      </View>
   
  </SafeAreaView>
);
}

const styles = StyleSheet.create({
 container: {
  flex: 1,
  backgroundColor: '#fff',
  alignItems: 'center',
  marginTop: 0,
  marginLeft: 0,
  marginRight: 0,
 },
 dropdown: {
  top: 0,
  left: 0,
  },
header: {
  height: '8%',
  justifyContent: 'space-between',
  flexDirection: 'row',
},
image: {
  width: 60,
  height: 60,
},
journal: {
  color: '#99BD8F',
  fontSize: 30,
  marginBottom: 50,
  fontFamily: 'Poppins_600SemiBold',
 },
 filterContainer:{
  width : '90%',
  height: '15%',
  display: 'flex',
  justifyContent: 'space-between',
  alignContent: 'space-between',
  marginTop: -20,
  marginBottom: 10,
 },
 text : {
  fontSize: 14,
  fontFamily: 'Poppins_600SemiBold',
 },
 buttonContainer:{
  width: '100%',
  display:'flex',
  flexDirection:'row',
  justifyContent: 'space-around',
  marginLeft: 0,
 },
 button : {
  backgroundColor: '#99BD8F',
  width: 70,
  height: 30,
  borderRadius: 10,
  justifyContent: 'center',
  alignItems: 'center',
},
transmissionsContainer:{
  flex:1,
  width: '95%',
  display: 'flex',
},
transmissions : {
  flex:1,
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignContent: 'center',
},
transmission :{
  width: '100%',
 
  ...Platform.select({
    ios: {
      shadowColor: 'black',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.5,
      shadowRadius: 3,
    },
    android: {
      elevation: 5,
    },
  }),
  maxHeight: 150,
  marginTop: 10,
},
personAbout: {
  color: '#99BD8F',
  fontSize: 13,
  fontFamily: 'Poppins_600SemiBold',
  paddingLeft: 5,
  paddingTop: 5,
  marginBottom: -2,
},
publicationDate :{
  fontSize: 10,
  fontFamily: 'Poppins_600SemiBold',
  paddingLeft: 5,
},
message : {
  fontSize: 12,
  fontFamily: 'Poppins_600SemiBold',
  marginTop:2,
  paddingLeft: 5,
  paddingRight: 8,
  paddingBottom: 5,
  textAlign: 'justify',
},

});