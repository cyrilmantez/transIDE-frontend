import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, View, SafeAreaView, ScrollView, Image,TouchableOpacity, StatusBar , Platform ,Modal} from 'react-native';
import Dropdown from './Dropdown';
import DateTimePicker from '@react-native-community/datetimepicker';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useFonts, Poppins_400Regular, Poppins_600SemiBold } from '@expo-google-fonts/poppins';

 

export default function TransmissionScreen(navigation) {
  const [date, setDate] = useState (new Date())
  const [transmissions, setTransmissions] = useState([])
  const [visible, setVisible] = useState(false);
  const [mode, setMode] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);
  console.log(date)
  
  //get data from dataBase, and dispatch in the reducer, avec la limite de 7j
  useEffect(() => {
    fetch(`http://192.168.1.162:3000/transmissions/allTransmissions/${date}`).then(response => response.json())
    .then((data) => {
      console.log(data)
      if(data.result){
        const compareDates = (a, b) => new Date(b.date) - new Date(a.date);
        const sortedData = data.transmissions.sort(compareDates);
        setTransmissions(sortedData)
      }else{
        setTransmissions([])
      }
    })
  },[date])

  const showPicker = (currentMode) => {
    setVisible(true);
    setMode(currentMode)
  };

  const showDate = () => {
    showPicker();
    
  };
  const dateChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    console.log('selectedDate', selectedDate)
    setVisible(false);
    setDate(currentDate);
  };


  //display data from the hook
  const transmissionsToDisplay = transmissions.map((element, id) => {
      const newDate= new Date(element.date);
      return (
      <ScrollView style={styles.transmission} key={id}>
        <Text style={styles.personAbout}>Pour {element.name} {element.firstname}</Text>
        <Text style={styles.publicationDate}>Publié le {newDate.getDate()}/{newDate.getMonth() + 1}/{newDate.getFullYear()} à {newDate.getHours()}h{newDate.getMinutes()}, par {element.nurse}.</Text>
        <Text style={styles.message}>{element.info} </Text>
    </ScrollView>)
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
                  <TouchableOpacity style={styles.button} onPress={openModal}>
                      <Text style={styles.text} >IDE</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.button} onPress={showDate}>
                      <Text style={styles.text} >Date</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.button} onPress={openModal}>
                      <Text style={styles.text} >Patient</Text>
                  </TouchableOpacity>
            </View>
            <Modal transparent visible={modalVisible} onRequestClose={closeModal}>
                <View style={styles.modalContainer}>
                  <View style={styles.modalContent}>
                    <ScrollView style={styles.modalList}>
                       <Text style={styles.modalText}>Mr LEGRAND François</Text>
                       <Text style={styles.modalText}>Mme LAGRANDE Françoise</Text>
                       <Text style={styles.modalText}>Mr LEGRAND François</Text>
                       <Text style={styles.modalText}>Mme LAGRANDE Françoise</Text>
                       <Text style={styles.modalText}>Mr LEGRAND François</Text>
                       <Text style={styles.modalText}>Mme LAGRANDE Françoise</Text>
                       <Text style={styles.modalText}>Mr LEGRAND François</Text>
                       <Text style={styles.modalText}>Mme LAGRANDE Françoise</Text>
                       <Text style={styles.modalText}>Mr LEGRAND François</Text>
                       <Text style={styles.modalText}>Mme LAGRANDE Françoise</Text>
                       <Text style={styles.modalText}>Mr LEGRAND François</Text>
                       <Text style={styles.modalText}>Mme LAGRANDE Françoise</Text>
                       <Text style={styles.modalText}>Mr LEGRAND François</Text>
                       <Text style={styles.modalText}>Mme LAGRANDE Françoise</Text>
                       <Text style={styles.modalText}>Mr LEGRAND François</Text>
                       <Text style={styles.modalText}>Mme LAGRANDE Françoise</Text>
                       <Text style={styles.modalText}>Mr LEGRAND François</Text>
                       <Text style={styles.modalText}>Mme LAGRANDE Françoise</Text>
                    </ScrollView>
                    <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                      <Text style={styles.modalButtonText}>Fermer la modale</Text>
                    </TouchableOpacity>
                  </View>
                </View>
            </Modal>
            <View>
                  {visible && <DateTimePicker value={date} mode={mode} onChange={dateChange} />}
            </View>
            <Text style={styles.text}>Transmission non lu: 10/100</Text>
        </View>
        <ScrollView style={styles.transmissionsContainer}>
          <View style={styles.transmissions}>
             {transmissionsToDisplay}
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
modalContainer: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
},
modalContent: {
  backgroundColor: '#99BD8F',
  padding: 8,
  borderRadius: 10,
  elevation: 5,
  height: 300,
  width: 250,
  display:'flex',
  justifyContent: 'space-between',
  alignContent: 'center'
},
modalList:{
  width: '100%',
  maxHeight: '80%',
 backgroundColor: 'white',
 borderColor: '#99BD8F',
 borderWidth: 1,
},
modalText:{
 textAlign: 'center',
 paddingTop: 10,
 backgroundColor: 'white',
},
closeButton : {
  borderColor: 'white',
  borderWidth: 1,
  display:'flex',
  justifyContent: 'center',
  alignContent: 'center',
  marginBottom: 10,
  height: 40,
  backgroundColor:'#99BD8F',
},
modalButtonText:{
  textAlign: 'center',
  color: 'white',
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
  height: 150,
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