import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, View, SafeAreaView, ScrollView, Image,TouchableOpacity, StatusBar , Platform ,Modal} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useFonts, Poppins_400Regular, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import { useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';


 
export default function TransmissionScreen({navigation}) {
  const initialDate = new Date();
  initialDate.setDate(initialDate.getDate() - 10);
  const [date, setDate] = useState (initialDate)
  const [transmissions, setTransmissions] = useState([])
  const [visible, setVisible] = useState(false);
  const [mode, setMode] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const userToken = useSelector((state) => state.users.value.officesTokens[0].token)
  const [ideVisible, setIdeVisible] = useState(false);
  const [patientsVisible, setPatientsVisible] = useState(false);
  const [modalList, setModalList] = useState([])
  const [ideFiltered, setIdeFiltered] = useState('Tout le cabinet');
  const [patientFiltered, setPatientFiltered] = useState('Tous les patients');

  //Open the Modal
  const openModal = (target) => {
    setModalVisible(true);
    target === 'IDE' ? setIdeVisible(true) : setPatientsVisible(true);
    // target === 'Patients' ?
  };
  //Close Modal
  const closeModal = () => {
    setModalVisible(false);
    setIdeVisible(false);
    setPatientsVisible(false);
    setModalList([]); 
  }

  //get 10lastDayData from dataBase, and dispatch in the reducer
  useFocusEffect(
    React.useCallback(() => {
    fetch(`http://192.168.1.5:3000/transmissions/allTransmissions/${userToken}/${date}`).then(response => response.json())
        .then((data) => {
          if(data.result){
            const compareDates = (a, b) => new Date(b.date) - new Date(a.date);
            const sortedData = data.transmissions.sort(compareDates);
            setTransmissions(sortedData)
          }else{
            setTransmissions([])
          }
        })
    }, [date])
  )


  const showPicker = (currentMode) => {
    setVisible(true);
    setMode(currentMode)
  };
  //Filter by date
  const showDate = () => {
    showPicker();
  };

 

  const dateChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setVisible(false);
    setDate(currentDate);
  };


  //display data from the hook
  const transmissionsToDisplay = transmissions.filter((element) => {
  
    const isPatientFiltered =
      patientFiltered === 'Tous les patients' ||
      `${element.name} ${element.firstname}` === patientFiltered;

    const isIDEFiltered =
      ideFiltered === 'Tout le cabinet' || element.nurse === ideFiltered;

    return isPatientFiltered && isIDEFiltered;
  }).map((element, id) => {
      const newDate= new Date(element.date);
      
      return (
      <ScrollView style={styles.transmission} key={id}>
        <View style={styles.innerContainer}>
           <Text style={styles.personAbout}>Pour {element.name} {element.firstname}</Text>
          <Text style={styles.publicationDate}>Publié le {newDate.getDate()}/{newDate.getMonth() + 1}/{newDate.getFullYear()} à {String(newDate.getHours()).padStart(2, '0')}h{String(newDate.getMinutes()).padStart(2, '0')}, par {element.nurse}.</Text>
          <Text style={styles.message}>{element.info} </Text>
        </View>
    </ScrollView>)
    })

console.log('transmissions' ,transmissions)


 //IDE List
  const ideListToDisplay = transmissions.filter((element, index, array) => {
    const isUnique = array.slice(0, index).every(
        (prevElement) => prevElement.nurse !== element.nurse);
    return isUnique;
  }).map((element,index) => {
        return (<TouchableOpacity key={index} style={styles.modalTextButton} onPress={() => {setIdeFiltered(element.nurse), closeModal()}}>
                  <Text style={styles.modalText} >{element.nurse}</Text>
                </TouchableOpacity>
    )
})
  //Patients List
  const patientsListToDisplay = transmissions.filter((element, index, array) => {
    const isUnique = array.slice(0, index).every(
        (prevElement) =>
          `${prevElement.name} ${prevElement.firstname}` !==
          `${element.name} ${element.firstname}`
      );
    return isUnique;
  }).map((element,index) => {
        return (
          <TouchableOpacity key={index} style={styles.modalTextButton} onPress={() => {setPatientFiltered(`${element.name} ${element.firstname}`), closeModal()}}>
             <Text style={styles.modalText}  >{element.name} {element.firstname}</Text>
          </TouchableOpacity>
     
     
    )
})
 return (
  <SafeAreaView style={{flex: 1, backgroundColor: '#99BD8F'}}>
    <StatusBar barStyle="light-content"/>
      <View style={styles.container}>
        <View style={styles.header}>
          {/* <Dropdown style={styles.dropdown} navigation={navigation} /> */}
          <Image 
          style={styles.image}
          source={require('../assets/logo.png')} />
        </View>
        <Text style={styles.journal} >Journal</Text>
        <View style={styles.filterContainer}>
            <Text style={styles.textFilter}>Filtrer par :</Text>
            <View style={styles.buttonContainer}>
                  <TouchableOpacity style={styles.button} onPress={() => openModal('IDE')}>
                      <Text style={styles.textButton} >{ideFiltered}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.button} onPress={showDate}>
                      <Text style={styles.textButton} >{date.getDate().toString()}-{(date.getMonth()+1).toString()}-{(date.getFullYear()).toString()}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.button} onPress={() => openModal('Patients')}>
                      <Text style={styles.textButton} >{patientFiltered}</Text>
                  </TouchableOpacity>
            </View>
            <Modal transparent visible={modalVisible} onRequestClose={closeModal}>
                <View style={styles.modalContainer}>
                  <View style={styles.modalContent}>
                    <ScrollView style={styles.modalList}>
                    {ideVisible && (
                      <>
                      <TouchableOpacity style={styles.modalTextButton}
                          onPress={() => {
                            setIdeFiltered('Tout le cabinet');
                            closeModal();
                          }}>
                         <Text style={{ textAlign: 'center', fontWeight: 'bold'}}
                        >
                          TOUT LE CABINET
                        </Text>
                      </TouchableOpacity>
                       
                        {ideListToDisplay}
                      </>
                    )}
                      {patientsVisible &&  (
                      <>
                      <TouchableOpacity style={styles.modalTextButton}
                          onPress={() => {
                            setPatientFiltered('Tous les patients');
                            closeModal();
                          }}>
                        <Text
                          style={{ textAlign: 'center', fontWeight: 'bold'}}
                        >
                          TOUS LES PATIENTS
                        </Text>
                      </TouchableOpacity>
                        {patientsListToDisplay}
                      </>
                    )}
                    </ScrollView>
                    <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                      <Text style={styles.modalButtonText}>Fermer</Text>
                    </TouchableOpacity>
                  </View>
                </View>
            </Modal>
            <View>
                  {visible && <DateTimePicker value={date} mode={mode} onChange={dateChange} />}
            </View>
            <View style={styles.navigation_infos} >
              <Text style={styles.transmissionText}>{transmissionsToDisplay.length} transmissions</Text>
              <TouchableOpacity>
                <FontAwesome name={'plus-circle'} size={50} color='#99BD8F'  onPress={() => navigation.navigate('AddTransmissionScreen')}/>
              </TouchableOpacity>
              
            </View>
        </View>
        <ScrollView style={styles.transmissionsContainer}>
          <View style={styles.transmissions}>
             {transmissionsToDisplay}
          </View>
        </ScrollView>
      </View>
   
  </SafeAreaView>
);
};

const styles = StyleSheet.create({
 container: {
  flex: 1,
  backgroundColor: '#fff',
  alignItems: 'center',
  marginTop: 0,
  marginLeft: 0,
  marginRight: 0,
 },

header: {
  height: '8%',
  width: '100%',
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
  height: '20%',
  display: 'flex',
  justifyContent: 'space-between',
  alignContent: 'space-between',
  marginTop: -20,
  marginBottom: 10,
 },
 textFilter : {
  fontSize: 14,
  fontFamily: 'Poppins_600SemiBold',
  
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
  marginTop: 10,
 },
 button : {
  backgroundColor: '#99BD8F',
  width: 90,
  height: 40,
  borderRadius: 10,
  justifyContent: 'center',
  alignItems: 'center',
}, 
textButton : {
  fontSize: 14,
  fontFamily: 'Poppins_600SemiBold',
  textAlign : 'center',
  color: 'white',
},
transmissionText:{
  fontSize: 14,
  fontFamily: 'Poppins_600SemiBold',
  paddingTop: 17,
},
navigation_infos : {
  display : 'flex',
  flexDirection : 'row',
  justifyContent: 'space-between',
  marginTop: 30,
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
modalTextButton:{
 textAlign: 'center',
 backgroundColor: 'white',
 marginTop: 10,
 height: 30,
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
},
modalText:{
 textAlign: 'center'
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
  marginTop: 30,
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
  height: 150,
  marginBottom: 10,
  ...Platform.select({
    ios: {
      shadowColor: 'black',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.5,
      shadowRadius: 3,
    },
    android: {
      elevation: 2,
    }, }),
    borderColor: 'blue',
},
innerContainer: {
  margin : 10,
  backgroundColor: 'white', // Assurez-vous que le fond de l'élément à l'intérieur est blanc
  borderColor : 'red',
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
  marginTop:10,
  paddingLeft: 5,
  paddingRight: 8,
  paddingBottom: 5,
  textAlign: 'justify',
},

});