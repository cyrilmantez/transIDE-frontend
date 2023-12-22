import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Image, TouchableOpacity, StatusBar, Platform, Modal} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useFonts, Poppins_400Regular, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import { Card, Paragraph, ProgressBar, Switch, Icon, Button } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useFocusEffect } from '@react-navigation/native';
import * as Linking from 'expo-linking';


export default function TourScreen({navigation}) {
  const user = useSelector((state) => state.users.value)

 
  const [date, setDate] = useState(new Date());
  const [visible, setVisible] = useState(false);
  const [mode, setMode] = useState('');
  const [allPatients, setAllPatients] = useState([])
  const [patientModal, setPatientModal] = useState({})
  const [modalVisible, setModalVisible] = useState(false);
  const [modalAddressVisible, setModalAddressVisible] = useState(false);
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  ////////////// gestion des tous/restants :
  const [seeAll, setSeeAll] = useState(true)

  ////////////////////// Progress bar :
  const [progress, setProgress] = useState(0);


  //////////////// fonction en chage du fetch pour récupérer les patients à voir :
  const allData =()=> {
    const tokenByDefault = user.officesTokens;
    console.log(tokenByDefault.filter(e => e.isByDefault)[0].token)
    fetch('http://192.168.1.14:3000/patients/allPatients', {
      method: 'POST',
      headers: {'Content-Type' : 'application/json'},
      body: JSON.stringify({officeToken: tokenByDefault.filter(e => e.isByDefault)[0].token, dateOfToday : date })
    }).then(response => response.json())
      .then(data => {
        setAllPatients(data.patientsToSee)
      })

  };


  useFocusEffect(
    React.useCallback(() => {
      allData()  
    }, [date, modalVisible, user.officesTokens])
  );

  useEffect( () => {
    const tous = allPatients.length
    const restants = allPatients.filter(item => !item.isVisited).length
    if (tous > 0 && restants > 0) {
      setProgress((tous-restants)/tous)
    } else {
      setProgress(1)
    }
  }, [allPatients]);


  const showPicker = (currentMode) => {
    setVisible(true);
    setMode(currentMode)
  };

  const showDate = () => {
    showPicker();
    
  };

  const dateChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setVisible(false);
    setDate(currentDate);
  };

  const changeDate = (days) => {
    let newDate = new Date(date);
    newDate.setDate(newDate.getDate() + days);
    setDate(newDate);
  }
   //Close Menu
   const closeMenu = () => {
    setIsMenuVisible(false)
   }
   const menu = () => {
    return (<Modal transparent visible={isMenuVisible} animationType='slide' onRequestClose={closeMenu}>
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
                                          <TouchableOpacity style={styles.link} onPress={() => {navigation.navigate("MyPatientsScreen"), closeMenu()}}>
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
                  </Modal>)
   }

  // Switch :
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  
  const onToggleSwitch = () => {
    setIsSwitchOn(!isSwitchOn);
    setSeeAll(!seeAll)
  }

/////////////////////////////////////////////////  modal:
  
  
/////////////fonction en charge du fetch de mise à jour treatment in DB:
const updateTreatmentInDB = (a, b, c) => {
  fetch('http://192.168.1.162:3000/patients/updateTreatment', {
    method: 'PUT',
    headers: {'Content-Type' : 'application/json'},
    body: JSON.stringify({
      _id: patientModal._id,
      _idTreatment: patientModal._idTreatment,
      isVisited: a,
      isOk: b,
      isOkWithModification: c,
      actions: patientModal.actions,
      nurse: user.username,
      date: patientModal.date,
      documentsOfTreatment: patientModal.documentsOfTreatment,
    })
  }).then(response => response.json())
  .then(data => {
  });
};


////// validation du soin :     
  const validation = () => {
    updateTreatmentInDB(true, true, false)
    setModalVisible(!modalVisible);
  }

////// annulation du soin :
  const annulation = () => {
    updateTreatmentInDB(true, false, false)
    setModalVisible(!modalVisible);
  }

////// modification du soin via redirection vers consultationScreen :
  const modification = () =>{  
    setModalVisible(!modalVisible);   
    navigation.navigate('ConsultationScreen', 
      { name: patientModal.name,
        firstname: patientModal.firstname,
        address: patientModal.address,
        mobile: patientModal.mobile,
        homePhone: patientModal.homePhone,
        _idTreatment: patientModal._idTreatment,
        _id: patientModal._id,
        isVisited: true,
        isOk: true,
        isOkWithModification: true,
        actions: patientModal.actions,
        nurse: user.username,
        date: patientModal.date,
        documentsOfTreatment: patientModal.documentsOfTreatment,
        yearOfBirthday : patientModal.yearOfBirthday,
        hour: patientModal.hour
          });          
  };


  ///////// modal de validation des soins :
  const modalContent = (
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
        <Text style={styles.modalText}>validation des soins réalisés</Text>
        <TouchableOpacity onPress={()=> validation(patientModal)} style={{flexDirection: 'row', justifyContent: 'flex-end'}} accessibilityLabel="valider le soin">
          <Text style={{marginTop : 12, marginRight: 30, fontFamily: 'Poppins_400Regular', fontSize: 14,}}>soins validés</Text>
          <Icon source={'checkbox-blank-circle'} size={42} color='#99BD8F' />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => modification(patientModal)} style={{flexDirection: 'row', justifyContent: 'flex-end', marginRight: 20}} accessibilityLabel="Apporter une modification au soin">
          <Text style={{marginTop : 12, marginRight: 30, fontFamily: 'Poppins_400Regular', fontSize: 14, }}>soins à modifier</Text>
          <Icon source={'checkbox-blank-circle'} size={42} color='orange' />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => annulation(patientModal)} style={{flexDirection: 'row', justifyContent: 'flex-end', marginRight: 6}} accessibilityLabel="annuler le soin">
          <Text style={{marginTop : 12, marginRight: 30, fontFamily: 'Poppins_400Regular',fontSize: 14, }}>soins annulés</Text>
          <Icon source={'checkbox-blank-circle'} size={42} color='#FF0000' />
        </TouchableOpacity>

      </View>
    </View>
  </Modal>
  )

  const changeState = (data) => {
    setModalVisible(true)
    setPatientModal(data)
  }


/////////////////////modal Address et redirection vers waze:
  
  const changeStateAddress = (data) => {
    setModalAddressVisible(true)
    setPatientModal(data)
  }

  const openWazeWithAddress = () => {
    const address = patientModal.address;
    const encodedAddress = encodeURIComponent(address);
    // Linking.openURL(`https://waze.com/ul?q=${encodedAddress}&navigate=yes`);
    Linking.openURL(`waze://?q=${encodedAddress}&navigate=yes`);
  };
  
  const modalAddressContent = (
    <Modal
    animationType="slide"
    transparent={true}
    visible={modalAddressVisible}
    onRequestClose={() => {
      setModalAddressVisible(!modalAddressVisible);
    }}
  >
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <Text style={styles.modalText}>Adresse de {patientModal.firstname} {patientModal.name}:</Text>
        <View style={{justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{fontFamily: 'Poppins_400Regular', fontSize: 16, }}>{patientModal.address}</Text>
        <Text style={{fontFamily: 'Poppins_400Regular', fontSize: 14, }}>{patientModal.infosAddress}</Text>
        </View>
        <View>
        <TouchableOpacity onPress={()=> openWazeWithAddress()} style={{flexDirection: 'row', justifyContent: 'flex-end', marginRight: 20, marginBottom: 20}}>
          <Text style={{marginTop : 16, marginRight: 34, fontFamily: 'Poppins_400Regular', fontSize: 14,}}>y aller avec Waze !!!</Text>
          <Icon source={'waze'} size={42} color='#99BD8F' style={{marginLeft: 0}}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setModalAddressVisible(!modalAddressVisible)} style={{flexDirection: 'row', justifyContent: 'flex-end', marginRight: 20}}>
          <Text style={{marginTop : 16, marginRight: 30, fontFamily: 'Poppins_400Regular', fontSize: 14, }}>rester dans TransIDE</Text>
          <Icon source={'close-circle'} size={42} color='#99BD8F' />
        </TouchableOpacity>
        </View>
      </View>
    </View>
  </Modal>
  )

  
///////////////// Afficher les patients :
  const toMinutes = (time) => {
    const [hours, minutes] = time.split(':');
    return Number(hours) * 60 + Number(minutes);
  };

  const allPatientsInorder = allPatients.sort((a, b) => toMinutes(a.hour) - toMinutes(b.hour)); 
  const afficherPatients =  allPatientsInorder.map((patient, i) => {

    let nameAll = `${patient.name} ${patient.firstname}`;
    let truncatedNom;
    if (nameAll.length > 15) {
      truncatedNom = `${nameAll.substring(0, 15)}...`;
    } else {
      truncatedNom = nameAll;
    }

    ///////////////// gestion de la couleur du bouton valider :
    let finishColor = '#CADDC5'
    if (patient.isVisited && patient.isOk && !patient.isOkWithModification) {
      finishColor = '#52B339';
    } else if (patient.isVisited && patient.isOk && patient.isOkWithModification) {
      finishColor = '#FF9900';
    } else if (patient.isVisited && !patient.isOk) {
      finishColor = '#FF0000';
    }
 
    return (
      
          <Card style={styles.contentcard} key={i}>
            <Card.Content style={styles.card}>
              <View>
                <Paragraph >{patient.hour}</Paragraph>
              </View>
              <View>
                <TouchableOpacity onPress={() => navigation.navigate('PatientScreen', { _id : patient._id})}>
                  <Paragraph style={styles.nompatient}>{truncatedNom}</Paragraph>
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity onPress={()=> changeStateAddress(patient)}>
                  <FontAwesome  name={'map-pin'} size={24} color='#99BD8F' />
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity onPress={() => navigation.navigate('ConsultationScreen', 
                { _id : patient._id,
                  name: patient.name,
                  firstname: patient.firstname,
                  address: patient.address,
                  mobile: patient.mobile,
                  homePhone: patient.homePhone,
                  actions: patient.actions,
                  hour : patient.hour,
                  isOk: patient.isOk,
                  isOkWithModification: patient.isOkWithModification,
                  isVisited: patient.isVisited,
                  _idTreatment: patient._idTreatment,
                  nurse: user.username,
                  date: patient.date,
                  yearOfBirthday : patient.yearOfBirthday,
                  documentsOfTreatment: patient.documentsOfTreatment,

                  date: patient.date,
                  yearOfBirthday : patient.yearOfBirthday,
                  documentsOfTreatment: patient.documentsOfTreatment,
                })}>
                  <Icon source={'medical-bag'} size={24} color='#99BD8F'/>
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity onPress={()=> changeState(patient)}>
                  <Icon source={'checkbox-blank-circle'} size={24} color={finishColor}/>
                </TouchableOpacity>
              </View>
            </Card.Content>
          </Card>
       
    );
  });


  //////////////////  gestion des patients restants :
  const filteredData = allPatientsInorder.filter(item => !item.isVisited);
  const afficherRestants =  filteredData.map((patient, i) => {

    let nameAll = `${patient.name} ${patient.firstname}`;
    let truncatedNom;
    if (nameAll.length > 15) {
      truncatedNom = `${nameAll.substring(0, 15)}...`;
    } else {
      truncatedNom = nameAll;
    }

    ///////////////// gestion de la couleur du bouton valider :
    let finishColor = '#CADDC5'
    if (patient.isVisited && patient.isOk && !patient.isOkWithModification) {
      finishColor = '#52B339';
    } else if (patient.isVisited && patient.isOk && patient.isOkWithModification) {
      finishColor = '#FF9900';
    } else if (patient.isVisited && !patient.isOk) {
      finishColor = '#FF0000';
    }
 
      return (
          <Card style={styles.contentcard} key={i}>
            <Card.Content style={styles.card}>
              <View>
                <Paragraph >{patient.hour}</Paragraph>
              </View>
              <View>
                <TouchableOpacity onPress={() => navigation.navigate('PatientScreen', { _id : patient._id})}>
                  <Paragraph style={styles.nompatient}>{truncatedNom}</Paragraph>
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity onPress={()=> changeStateAddress(patient)}>
                  <FontAwesome  name={'map-pin'} size={24} color='#99BD8F' />
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity onPress={() => navigation.navigate('ConsultationScreen', 
                { _id : patient._id,
                  name: patient.name,
                  firstname: patient.firstname,
                  address: patient.address,
                  mobile: patient.mobile,
                  homePhone: patient.homePhone,
                  actions: patient.actions,
                  hour : patient.hour,
                  isOk: patient.isOk,
                  isOkWithModification: patient.isOkWithModification,
                  isVisited: patient.isVisited,
                  _idTreatment: patient._idTreatment,
                  nurse: user.username,
                  date: patient.date,
                  yearOfBirthday : patient.yearOfBirthday,
                  documentsOfTreatment: patientModal.documentsOfTreatment,

                })}>
                  <Icon source={'medical-bag'} size={24} color='#99BD8F'/>
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity onPress={()=> changeState(patient)}>
                  <Icon source={'checkbox-blank-circle'} size={24} color={finishColor}/>
                </TouchableOpacity>
              </View>
            </Card.Content>
          </Card>
    );
  
  });

  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
  });

  if (!fontsLoaded) {
      return (<View />);
    } else {
     return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#99BD8F' }}>
          <StatusBar barStyle="light-content"/>
            <View style={styles.container}>
                 {menu()}
                <View style={styles.containerHeader}>
                   
                        <View style={styles.header}>
                          <View style={{marginLeft:10, marginBottom: 15}}>
                            <TouchableOpacity style={styles.barsStyle} onPress={() => setIsMenuVisible(true)}> 
                              <FontAwesome name='bars' size={36} color='#99BD8F'/>
                            </TouchableOpacity> 
                          </View>
                          
                          <Image
                            style={styles.image}
                            source={require('../assets/logo.png')}
                          />
                        </View>
                        <Text style={{fontFamily: 'Poppins_600SemiBold', fontSize: 28,color: '#99BD8F', marginTop: 10,}}>Au boulot !</Text>
                        <View style={styles.calendarContain}>
                                <View style={styles.previous}>
                                  <TouchableOpacity accessibilityLabel="revenir à la date d'hier">
                                    <FontAwesome name={'chevron-left'} size={24} color='#99BD8F' onPress={() => changeDate(-1)} />
                                  </TouchableOpacity>
                                </View>
                                <View style={styles.calendar}>
                                  <Text style={styles.text} onPress={showDate}>
                                    {`${('0' + date.getDate()).slice(-2)}/${('0' + (date.getMonth() + 1)).slice(-2)}/${date.getFullYear()}`}
                                  </Text>
                                </View>
                                <View style={styles.next}>
                                  <TouchableOpacity>
                                    <FontAwesome name={'chevron-right'} size={24} color='#99BD8F' onPress={() => changeDate(+1)} />
                                  </TouchableOpacity>
                                </View>
                                <View>
                                  {visible && <DateTimePicker value={date} mode={mode} onChange={dateChange} />}
                                </View>
                        </View>
                </View>
                <View>
                  <View style={styles.nbrpatient}>
                      <Text style={styles.textnbrpatient}>Patients visités: {(afficherPatients.length)-(afficherRestants.length)}/{afficherPatients.length}</Text>
                    </View>
                    <View style={styles.progressBar}>
                      <ProgressBar progress={progress} style={{width: 200}} theme={{ colors: { primary: '#99BD8F' } }}/>
                    </View>
                </View>
                <View style={styles.filterNewContent}>
                    <View style={styles.switchitem}>
                        <Text style={styles.switchitemtext}>Tous</Text>                 
                        <Switch value={isSwitchOn} theme={{ colors: { primary: '#99BD8F' } }}  onValueChange={onToggleSwitch}/>
                        <Text style={styles.switchitemtext}>Restants</Text>
                    </View>
                    {afficherPatients.length>0 && <View style={styles.pluscircle}>
                        <FontAwesome name={'plus-circle'} size={50} color='#99BD8F' onPress={() => navigation.navigate('AddConsultationScreen')}/>
                    </View>}
                    
                </View>
                
                {afficherPatients.length>0 && <ScrollView contentContainerStyle={styles.allcards}>
                {seeAll ? afficherPatients : afficherRestants }
                </ScrollView>}
                {afficherPatients.length<1 && (<View style={styles.noConsultationContainer}>
                    <Text style={{fontFamily: 'Poppins_600SemiBold', fontSize: 15,color: '#99BD8F', marginTop: 10, textAlign:'center'}}>Pas de consultation encore prévue pour aujourd'hui !</Text>
                    <View style={styles.bigPluscircle}>
                        <FontAwesome name={'plus-circle'} size={100} color='#99BD8F' onPress={() => navigation.navigate('AddConsultationScreen')}/>
                    </View>
                </View>)}
               
              {modalContent}
              {modalAddressContent}
           </View>    
        </SafeAreaView>
    );
  }
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    backgroundColor: 'white'
  },
  containerHeader: {
    height: '30%',
    backgroundColor: 'white',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  barsStyle: {
    alignContent: 'flex-start',
    marginTop: 10,
    marginLeft: 10,
    },
  header: {
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Poppins_400Regular',
  },
  image: {
    width: 60,
    height: 60,
    marginLeft: -40,
  },
  calendarContain: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  previous: {
  marginRight: 30,
  },
  next: {
    marginLeft: 30,
    },
  calendar: {
    backgroundColor: '#99BD8F',
    width: 150,
    height: 70,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  filterNewContent: {
    flexDirection:'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  text: {
    color: '#F1FFEE',
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 20,
  },
  pluscircle: {
    marginTop: 5,
    alignItems: 'flex-end',
    marginRight: 20,
  },
  card: {
    flex: 1, 
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: 'white',
  },
  contentcard:{
    width: '100%',
    marginTop: 10, 
    marginBottom: 2,
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
  nompatient: {
    width: 100,
    fontFamily: 'Poppins_400Regular',
  },
  allcards: {
    width: '95%',
    marginLeft: 10,
    borderColor: '#fff',
    borderWidth: 0.5,
  },
  progressBar: {
    marginTop: 10,
    alignItems: 'center',
  },
  nbrpatient: {
    alignItems: 'center',
    marginTop: 20,
  },
  textnbrpatient: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 17,
  },
  switchitem: {
    marginLeft: 20,    
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  switchitemtext: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 17,
    marginLeft: 5,
    marginRight: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    backgroundColor: "rgba(0,0,0,0,0.5)",
  },
  modalView: {
    //margin: 20,
    height: 400,
    width: '95%',
    backgroundColor: "#F0F0F0",
    borderRadius: 20,
    padding: 35,
    justifyContent: 'space-between',
    alignItems: "center",
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
    color: '#99BD8F',
    fontSize: 20,   
    fontFamily: 'Poppins_400Regular',
  },
  noConsultationContainer:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#F0F0F0',
  },
  bigPluscircle: {
    marginTop: 30,
    alignItems: 'flex-end',
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
