import React, { useState } from 'react';
import { Button, StyleSheet, Text, View, SafeAreaView, ScrollView, Image,TouchableOpacity, StatusBar  } from 'react-native';
import Dropdown from './Dropdown';
import DateTimePicker from '@react-native-community/datetimepicker';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useFonts, Poppins_400Regular, Poppins_600SemiBold } from '@expo-google-fonts/poppins';

 //

export default function TransmissionScreen(navigation) {
 return (
  <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
    <StatusBar barStyle="light-content"/>
    <ScrollView contentContainerStyle={styles.scrollView}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Dropdown style={styles.dropdown} navigation={navigation} />
          <Image 
          style={styles.image}
          source={require('../assets/logo.png')} />
        </View>
        <Text style={styles.journal} >Journal</Text>
        <View styles={styles.filterContainer}>
          <Text style={styles.filter} >Filtrer par :</Text>
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
          <Text style={styles.transmissionState} >Transmission non lu: 10/100</Text>
        </View>
        <View style={styles.calendarContain}>
          </View>
      </View>
    </ScrollView>
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
  marginRight: 15,
 },
 dropdown: {
  top: 0,
  left: 0,
  },
header: {
  marginBottom: 20,
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
  display: 'flex',
  borderColor: 'red',
  borderWidth: 1,
 },
 buttonContainer:{
  width: '80%',
  display:'flex',
  flexDirection:'row',
  justifyContent: 'space-between',
  borderColor: 'blue',
  borderWidth: 1,
  marginLeft: 10,
 },
 button : {
  backgroundColor: '#99BD8F',
  width: 70,
  height: 30,
  borderRadius: 10,
  justifyContent: 'center',
  alignItems: 'center',
}
});