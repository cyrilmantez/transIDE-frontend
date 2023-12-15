import React, { useState, useEffect } from 'react';
import * as React from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Image, TouchableOpacity } from 'react-native';
import Dropdown from './Dropdown';
import DateTimePicker from '@react-native-community/datetimepicker';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useFonts, Poppins_400Regular, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import { Card, Paragraph, ProgressBar, Switch, Icon } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


export default function TourScreen({navigation}) {
  const user = useSelector((state) => state.users.value)

  const [date, setDate] = useState(new Date());
  const [visible, setVisible] = useState(false);
  const [mode, setMode] = useState('');
  const [allPatients, setAllPatients] = useState([])

  const allData =()=> {
    fetch('http://192.168.1.14:3000/patients/allPatients', {
      method: 'POST',
      headers: {'Content-Type' : 'application/json'},
      body: JSON.stringify({officeToken: user.officesTokens, dateOfToday : date })
    }).then(response => response.json())
      .then(data => {
        setAllPatients(data.patientsToSee)
      })

  };

  useEffect(()=>{
    allData()
  }, [date] )



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



  // Progess bar
  const [progress, setProgress] = useState(0);

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setProgress((oldProgress) => {
  //       if (oldProgress === 1) {
  //         return 0;
  //       }
  //       const newProgress = oldProgress + 0.1;
  //       return newProgress > 1 ? 1 : newProgress;
  //     });
  //   }, 1000);

  //   return () => {
  //     clearInterval(timer);
  //   };
  // }, []);


  // Switch :
  const [isSwitchOn, setIsSwitchOn] = useState(false);

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);


  // Affichage des patients 
  // useEffect(() => {
  
  //   fetch('http://192.168.1.14:3000/patients/allPatientDay')
  //     .then(response => response.json())
  //     .then(data => {
  //       console.log('Data structure:', data);
  //       if (data.allPatient) {
  //         // Filtrer les patients par date
  //         const filteredPatients = data.allPatient.filter(patient => {
  //           // Convertir la date du patient en objet Date pour la comparaison
  //           const patientDate = new Date(patient.date);
  //           // Comparer l'année, le mois et le jour
  //           return patientDate.getFullYear() === date.getFullYear() &&
  //                  patientDate.getMonth() === date.getMonth() &&
  //                  patientDate.getDate() === date.getDate();
  //         });
  
  //         // Trier les patients par date, office token et heure
  //         const sortedPatients = filteredPatients.sort((a, b) => {
  //           // Comparer les dates
  //           const dateComparison = new Date(a.date) - new Date(b.date);
  //           if (dateComparison !== 0) return dateComparison;
  
  //           // Si les dates sont les mêmes, comparer les office tokens
  //           const officeTokenComparison = a.officeToken.localeCompare(user.officesTokens);
  //           if (officeTokenComparison !== 0) return officeTokenComparison;
  
  //           // Si les office tokens sont les mêmes, comparer les heures
  //           return new Date(`1970-01-01T${a.time}:00`) - new Date(`1970-01-01T${b.time}:00`);
  //         });
  
  //         setPatients(sortedPatients);
  //       }
  //     });
  // }, [date]);

  ////////////////  modal:
  const [modalVisible, setModalVisible] = useState(false);
  const [actionsState, setActionsState] = useState();


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
        <Button
          title="Retour"
          onPress={() => {
            setModalVisible(!modalVisible);
            navigation.navigate('TabNavigator');
          }}
        />
      </View>
      <View>
        <TouchableOpacity onPress={()=> setModalVisible(true)}>
          <Text>soins validés</Text>
          <FontAwesome name={'square-o'} size={24} color='#99BD8F' />
        </TouchableOpacity>
        <TouchableOpacity onPress={()=> setModalVisible(true)}>
          <Text>soins à modifier</Text>
          <FontAwesome name={'draw-pen'} size={24} color='#99BD8F' />
        </TouchableOpacity>
        <TouchableOpacity onPress={()=> setModalVisible(true)}>
          <Text>soins annulés</Text>
          <FontAwesome name={'alpha-x-box-outline'} size={24} color='#99BD8F' />
        </TouchableOpacity>

      </View>e
    </View>
  </Modal>
  )

  const changeState = () => {
    setActionsState()
    setModalVisible(true)

  }
  /////////////////
  
  
   
  
// Afficher les patients
  const toMinutes = (time) => {
    const [hours, minutes] = time.split(':');
    return Number(hours) * 60 + Number(minutes);
  };
    const allPatientsInorder = allPatients.sort((a, b) => toMinutes(a.hour) - toMinutes(b.hour));
  
    const AfficherPatients =  allPatientsInorder.map((patient, i) => {

    let nameAll = `${patient.name} ${patient.firstname}`;
    let truncatedNom;
    if (nameAll.length > 15) {
      truncatedNom = `${nameAll.substring(0, 15)}...`;
    } else {
      truncatedNom = nameAll;
    }
 
    return (
        <View key={i}>
          <Card style={styles.contentcard}>
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
                <TouchableOpacity>
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
                  date : patient.date

                })}>
                  <Icon source={'medical-bag'} size={24} color='#99BD8F'/>
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity onPress={()=> changeState()}>
                  <FontAwesome name={'square-o'} size={24} color='#99BD8F'/>
                </TouchableOpacity>
                {modalContent}
              </View>
            </Card.Content>
          </Card>
        </View>
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
      <>
        <SafeAreaView style={{ flex: 0, backgroundColor: '#99BD8F' }} />
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <KeyboardAwareScrollView contentContainerStyle={styles.scrollView} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} enableOnAndroid={true}>
              <ScrollView contentContainerStyle={styles.scrollView}>
                <View style={styles.container}>
                  <View style={styles.header}>
                    <Dropdown style={styles.dropdown} navigation={navigation} />
                    <Image
                      style={styles.image}
                      source={require('../assets/logo.png')}
                    />
                  </View>
                  <View style={styles.calendarContain}>
                    <View style={styles.previous}>
                      <FontAwesome name={'chevron-left'} size={24} color='#99BD8F' onPress={() => changeDate(-1)} />
                    </View>
                    <View style={styles.calendar}>
                      <Text style={styles.text} onPress={showDate}>
                        {`${('0' + date.getDate()).slice(-2)}/${('0' + (date.getMonth() + 1)).slice(-2)}/${date.getFullYear()}`}
                      </Text>
                    </View>
                    <View style={styles.next}>
                      <FontAwesome name={'chevron-right'} size={24} color='#99BD8F' onPress={() => changeDate(+1)} />
                    </View>
                    <View>
                      {visible && <DateTimePicker value={date} mode={mode} onChange={dateChange} />}
                    </View>
                  </View>
                </View>
                <View style={styles.nbrpatient}>
                  <Text style={styles.textnbrpatient}>Patients visités 3/5</Text>
                </View>
                <View style={styles.progressBar}>
                  <ProgressBar progress={progress} style={{width: 200}} theme={{ colors: { primary: '#99BD8F' } }}   />
                </View>
                <View style={styles.pluscircle}>
                    <FontAwesome name={'plus-circle'} size={50} color='#99BD8F' onPress={() => navigation.navigate('AddPatientScreen')}/>
                </View>
                <View style={styles.switchitem}>
                  <Text style={styles.switchitemtext}>Tout</Text>
                  <Switch value={isSwitchOn} theme={{ colors: { primary: '#99BD8F' } }}  onValueChange={onToggleSwitch}/>
                  <Text style={styles.switchitemtext}>Restant</Text>
                </View>
                <ScrollView contentContainerStyle={styles.allcards}>
                {AfficherPatients}
              </ScrollView>
            </ScrollView>
          </KeyboardAwareScrollView>
        </SafeAreaView>
      </>
    );
  }
};

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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  image: {
    width: 60,
    height: 60,
  },
  calendarContain: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  previous: {
  marginRight: 20,
  },
  next: {
    marginLeft: 20,
    },
  calendar: {
    backgroundColor: '#99BD8F',
    width: 150,
    height: 70,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    color: '#F1FFEE',
    fontFamily: 'Poppins_400Regular',
    fontSize: 20,
  },
  pluscircle: {
    marginTop: 25,
    alignItems: 'flex-end',
    marginRight: 20,
  },
  card: {
    flex: 1, 
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  contentcard:{
    marginTop: 15, 
    marginBottom: 2,
  },
  nompatient: {
    width: 100,
    fontFamily: 'Poppins_400Regular',
  },
  allcards: {
    width: '95%',
    marginLeft: 10,
  },
  progressBar: {
    marginTop: 20,
    alignItems: 'center',
  },
  nbrpatient: {
    alignItems: 'center',
    marginTop: 30,
  },
  textnbrpatient: {
    fontFamily: 'Poppins_400Regular',
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
});
