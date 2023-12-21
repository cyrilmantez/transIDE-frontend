import React, { useState, useRef } from 'react';
import { Button, StyleSheet, Text, View, SafeAreaView, ScrollView, Image,TouchableOpacity, StatusBar , Platform ,Modal, Animated} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useFonts, Poppins_400Regular, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import { useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import { Icon } from 'react-native-paper';


 
export default function TransmissionScreen({navigation}) {
  const initialDate = new Date();
  initialDate.setDate(initialDate.getDate() - 10);
  const [date, setDate] = useState (initialDate)
  const [transmissions, setTransmissions] = useState([])
  const [visible, setVisible] = useState(false);
  const [mode, setMode] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const user = useSelector((state) => state.users.value)
  const [ideVisible, setIdeVisible] = useState(false);
  const [patientsVisible, setPatientsVisible] = useState(false);
  const [modalList, setModalList] = useState([])
  const [ideFiltered, setIdeFiltered] = useState('Tout le cabinet');
  const [patientFiltered, setPatientFiltered] = useState('Tous les patients');
  const [isMenuVisible, setIsMenuVisible] = useState(false);



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

   //Close Menu
   const closeMenu = () => {
    setIsMenuVisible(false)
   }
   

  //get 10lastDayData from dataBase, and dispatch in the reducer
  useFocusEffect(
    React.useCallback(() => {

    const tokenByDefault = user.officesTokens;
    fetch(`http://192.168.1.162:3000/transmissions/allTransmissions/${tokenByDefault.filter(e => e.isByDefault)[0].token}/${date}`).then(response => response.json())
        .then((data) => {
          if(data.result){
            const compareDates = (a, b) => new Date(b.date) - new Date(a.date);
            const sortedData = data.transmissions.sort(compareDates);
            setTransmissions(sortedData)
          }else{
            setTransmissions([])
          }
        })
    }, [date, user.officesTokens])
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
      <Modal transparent visible={isMenuVisible} animationType='slide' onRequestClose={closeMenu}>
                <View style={styles.menuContainer}>
                  <View style={styles.menuContent}>
                            <View style={styles.skipMenu}>
                               <TouchableOpacity  onPress={ closeMenu}>
                                <FontAwesome name='bars' size={36} color='white'/>
                              </TouchableOpacity>
                              <Text style={{fontSize: 26,fontFamily: 'Poppins_600SemiBold',color:'white', textAlign: 'center', marginTop: 10}} >Menu</Text>
                            </View>
                             
                      <View style={{width:'100%', marginTop:60, marginLeft:10}}>
                          <View style={styles.linkContainer}>
                            <Icon source={'account-box'} size={30} color={'white'}/>
                             <TouchableOpacity style={styles.link} onPress={() => {navigation.navigate("Mon compte"), closeMenu()}}>
                              <Text style={styles.linkText}>Mon Compte</Text>
                            </TouchableOpacity>
                          </View >
                            <View style={styles.linkContainer}>
                              <Icon source={'account-group'} size={30} color={'white'}/>
                              <TouchableOpacity style={styles.link} onPress={() => {navigation.navigate("ManagementScreen"),closeMenu()}}>
                                <Text style={styles.linkText}>Gérer mon cabinet</Text>
                              </TouchableOpacity>
                            </View>
                            <View style={styles.linkContainer}>
                              <Icon source={'account-multiple-plus'} size={30} color={'white'}/>  
                              <TouchableOpacity style={styles.link} onPress={() => closeMenu()}>
                                <Text style={styles.linkText}>Mes patients</Text>
                              </TouchableOpacity>
                            </View>
                            <View style={styles.linkContainer}>
                               <Icon source={'book-open-variant'} size={30} color={'white'}/>
                              <TouchableOpacity style={styles.link} onPress={() => {navigation.navigate("RessourcesScreen"), closeMenu()}}>
                                <Text style={styles.linkText}>Ressources</Text>
                              </TouchableOpacity>
                            </View>
                            <View style={styles.linkContainerDeconnexion}>
                                <Icon source={'logout'} size={30} color={'white'}/>  
                                <TouchableOpacity style={styles.link} onPress={() => {navigation.navigate("ConnectionScreen"), closeMenu()}}>
                                  <Text style={styles.linkText}>Déconnexion</Text>
                                </TouchableOpacity>
                            </View>
                              
                      </View>
                            
                      
                  </View>
                </View>
      </Modal>
        <View style={styles.header}>
            <TouchableOpacity onPress={() => setIsMenuVisible(true)}>
                  <FontAwesome marginLeft={20} marginTop={10} name='bars' size={36} color='#99BD8F'/>
              </TouchableOpacity>
           
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
  marginTop: 10,
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
  fontFamily: 'Poppins_400Regular',
  textDecorationLine: 'underline',
  
 },
 text : {
  fontSize: 14,
  fontFamily: 'Poppins_400Regular',

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
  fontFamily: 'Poppins_400Regular',
  paddingTop: 17,
  textDecorationLine: 'underline'
},
navigation_infos : {
  display : 'flex',
  flexDirection : 'row',
  justifyContent: 'space-between',
  marginTop: 45,
},
modalContainer: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
},
modalContent: {
  backgroundColor: 'white',
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
 
},
modalTextButton:{
 textAlign: 'center',
 backgroundColor: 'white',
 height: 30,
 ...Platform.select({
  ios: {
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
  android: {
    elevation: 2,
  },
}),
},
modalText:{
 textAlign: 'center'
},
closeButton : {

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
    
},
innerContainer: {
  margin : 10,
  backgroundColor: 'white', 
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
  fontFamily: 'Poppins_400Regular',
  paddingLeft: 5,
  
},
message : {
  fontSize: 12,
  fontFamily: 'Poppins_400Regular',
  marginTop:10,
  paddingLeft: 5,
  paddingRight: 8,
  paddingBottom: 5,
  textAlign: 'justify',
},


//CSS MENU
menuContainer: {
  flex: 1,
  alignItems: 'flex-start',
},
menuContent: {
  backgroundColor: '#99BD8F',
  padding: 8,
  borderTopRightRadius: 10,
  borderBottomRightRadius: 10,
  elevation: 5,
  height: '93%',
  width: '80%',
  justifyContent: 'flex-start',
  alignContent: 'center',
},
skipMenu:{
  marginLeft: 10,
},
linkContainer:{
  flexDirection: 'row',
  marginTop: 25,

},
link:{
  marginLeft:10,
},
linkText : {
  fontSize: 20,
  fontFamily: 'Poppins_400Regular',
  color:'white',
},
linkContainerDeconnexion : {
  fontSize: 20,
  fontFamily: 'Poppins_400Regular',
  color:'white',
  marginTop:270,
  marginLeft:5,
  flexDirection: 'row',
}

});