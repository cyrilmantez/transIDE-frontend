import React, { useState } from 'react';
import { Button, StyleSheet, Text, View, SafeAreaView, ScrollView, Image } from 'react-native';
import Dropdown from './Dropdown';
import DateTimePicker from '@react-native-community/datetimepicker';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useFonts, Poppins_400Regular, Poppins_600SemiBold } from '@expo-google-fonts/poppins';

export default function TourScreen({navigation}) {

  const [date, setDate] = useState(new Date());
  const [visible, setVisible] = useState(false);
  const [mode, setMode] = useState('');

  const showPicker = () => {
    setVisible(true);
  };

  const showDate = () => {
    setMode('date');
    showPicker();
    
  };

  const dateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setVisible(false);
    setDate(currentDate);
  };

  const changeDate = (days) => {
    let newDate = new Date(date);
    newDate.setDate(newDate.getDate() + days);
    setDate(newDate);
  }

  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
  });
 
  if (!fontsLoaded) {
    return <View />;
  } else {
    return (
      <>
      <SafeAreaView style={{flex: 0, backgroundColor: '#99BD8F'}} />
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.container}>
            <View style={styles.header}>
              <Dropdown style={styles.dropdown} navigation={navigation} />
              <Image 
              style={styles.image}
              source={require('../assets/logo.png')} />
            </View>
            <View style={styles.calendarContain}>
              <View style={styles.previous}>
                <FontAwesome name={'chevron-left'} size={24} color='#99BD8F'onPress={() => changeDate(-1)}/>
              </View>
              <View style={styles.calendar}>
                <Text style={styles.text} onPress={showDate}>
                  {`${('0' + date.getDate()).slice(-2)}/${('0' + (date.getMonth() + 1)).slice(-2)}/${date.getFullYear()}`}
                </Text>
              </View>
              <View style={styles.next}>
                <FontAwesome name={'chevron-right'} size={24} color='#99BD8F'onPress={() => changeDate(+1)}/>
              </View>
              <View>
             {visible && <DateTimePicker value={date} mode={mode} onChange={dateChange} />}
              </View>
              </View>
          </View>
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
  }
});
