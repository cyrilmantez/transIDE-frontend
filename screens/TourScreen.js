import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Image, TouchableOpacity } from 'react-native';
import Dropdown from './Dropdown';
import DateTimePicker from '@react-native-community/datetimepicker';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useFonts, Poppins_400Regular, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { useSelector } from 'react-redux';

export default function TourScreen({navigation}) {
  
  //Date 
  /*
  const [date, setDate] = useState(new Date());
  const [visible, setVisible] = useState(false);
  const [mode, setMode] = useState('');
  const [allPatients, setAllPatients] = useState([])

  const user = useSelector((state) => state.users.value)
  console.log(user.officesTokens[0].token)

  //const dateToday = new Date(date)

  // useEffect(() => {

  //   fetch('http://192.168.1.5:3000/patients/allPatients', {
  //     method: 'POST',
  //     headers: {'Content-Type' : 'application/json'},
  //     body: JSON.stringify({officeToken: user.officesTokens[0].token, dateOfToday : dateToday })
  //   }).then(response => response.json())
  //     .then(data => {
  //       setAllPatients(data.patientsToSee)
  //     })
  // }, [date]);

  const allData =()=> {
    fetch('http://192.168.1.5:3000/patients/allPatients', {
      method: 'POST',
      headers: {'Content-Type' : 'application/json'},
      body: JSON.stringify({officeToken: user.officesTokens[0].token, dateOfToday : date })
    }).then(response => response.json())
      .then(data => {
        setAllPatients(data.patientsToSee)
      })
  };

  useEffect(()=>{
    allData()
  }
 , [date] )



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

  const changeDate = (days) => {
    let newDate = new Date(date);
    newDate.setDate(newDate.getDate() + days);
    setDate(newDate);
  }

    const allDayPatients = allPatients.map((patient, i) => {
    let truncatedNom;
    if (patient.name.length > 15) {
      truncatedNom = `${patient.name.substring(0, 15)}...`;
    } else {
      truncatedNom = patient.name;
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
                <TouchableOpacity>
                  <FontAwesome  name={'map-pin'} size={24} color='#99BD8F' />
                </TouchableOpacity>
              </View>
              <View>
                <FontAwesome name={'user'} size={24} color='#99BD8F' onPress={() => navigation.navigate('PatientScreen', { _id: patient._id})}/>
              </View>
              <View>
                <FontAwesome name={'square-o'} size={24} color='#99BD8F' />
              </View>
            </Card.Content>
          </Card>
        </View>
    );
  });
  };
 

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
                <FontAwesome name={'plus-circle'} size={50} color='#99BD8F' onPress={() => navigation.navigate('AddPatientScreen')}/>
            </View>
            <ScrollView contentContainerStyle={styles.allcards}>
            {allDayPatients}
          </ScrollView>
          </ScrollView>
        </SafeAreaView>
      </>
    );
  } */
  return(
    <View></View>
  )
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
