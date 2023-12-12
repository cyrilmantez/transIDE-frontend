import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Image, TouchableOpacity } from 'react-native';
import Dropdown from './Dropdown';
import DateTimePicker from '@react-native-community/datetimepicker';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useFonts, Poppins_400Regular, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';

export default function TourScreen({navigation}) {
  
  //Date
  const [date, setDate] = useState(new Date());
  const [visible, setVisible] = useState(false);
  const [mode, setMode] = useState('');

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


  // liste patient du jour

  const allpatients = [
    { id: '1', nom: 'Patient 1', soin: 'Soin 1', adresse: 'Adresse 1', date: new Date('2023-12-12'), heure: '10:00' },
    { id: '2', nom: 'Patient 2', soin: 'Soin 2', adresse: 'Adresse 2', date: new Date('2023-12-12'), heure: '11:00' },
    { id: '3', nom: 'Patient 3', soin: 'Soin 3', adresse: 'Adresse 3', date: new Date('2023-12-13'), heure: '12:00' },
    { id: '4', nom: 'Patient 4000000000000000000000', soin: 'Soin 4', adresse: 'Adresse 4', date: new Date('2023-12-13'), heure: '13:00' },
    { id: '5', nom: 'Patient 5', soin: 'Soin 5', adresse: 'Adresse 5', date: new Date('2023-12-13'), heure: '14:00' },
    { id: '6', nom: 'Patient 6', soin: 'Soin 6', adresse: 'Adresse 6', date: new Date('2023-12-13'), heure: '15:00' },
    { id: '7', nom: 'Patient 7', soin: 'Soin 7', adresse: 'Adresse 7', date: new Date('2023-12-13'), heure: '16:00' },
    { id: '8', nom: 'Patient 8', soin: 'Soin 8', adresse: 'Adresse 8', date: new Date('2023-12-13'), heure: '17:00' },
    { id: '9', nom: 'Patient 9', soin: 'Soin 9', adresse: 'Adresse 9', date: new Date('2023-12-13'), heure: '18:00' },
    { id: '10', nom: 'Patient 1000000', soin: 'Soin 10', adresse: 'Adresse 10', date: new Date('2023-12-13'), heure: '19:00' },
  ];
  
  // const [patients, setPatients] = useState([]);

  // useEffect(() => {
  //   fetch('///patient')
  //     .then(response => response.json())
  //     .then(data => {
  //       setPatients(data.patient);
  //     });
  // }, []);

  const dateDuJour = new Date(date);
  dateDuJour.setHours(0, 0, 0, 0);

  const allDayPatients = allpatients.filter(patient => {
    const datePatient = new Date(patient.date);
    datePatient.setHours(0, 0, 0, 0);
    return datePatient.getTime() === dateDuJour.getTime();
  }).map((patient, i) => {
    let truncatedNom;
    if (patient.nom.length > 15) {
      truncatedNom = `${patient.nom.substring(0, 15)}...`;
    } else {
      truncatedNom = patient.nom;
    }
    return (
        <View key={i}>
          <Card style={styles.contentcard}>
            <Card.Content style={styles.card}>
              <View>
                <Paragraph >{patient.heure}</Paragraph>
              </View>
              <View>
                <Paragraph style={styles.nompatient}>{truncatedNom}</Paragraph>
              </View>
              <View>
                <FontAwesome  name={'map-pin'} size={24} color='#99BD8F' />
              </View>
              <View>
                <FontAwesome name={'user'} size={24} color='#99BD8F' />
              </View>
              <View>
                <FontAwesome name={'square-o'} size={24} color='#99BD8F' />
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
    return <View />;
  } else {
    return (
      <>
        <SafeAreaView style={{ flex: 0, backgroundColor: '#99BD8F' }} />
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
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
            <View style={styles.pluscircle}>
              <TouchableOpacity>
                <FontAwesome name={'plus-circle'} size={50} color='#99BD8F' onPress={() => navigation.navigate('AddPatientScreen')}/>
              </TouchableOpacity>
            </View>
            <ScrollView contentContainerStyle={styles.allcards}>
            {allDayPatients}
          </ScrollView>
          </ScrollView>
        </SafeAreaView>
      </>
    );
  }
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
  }
});
