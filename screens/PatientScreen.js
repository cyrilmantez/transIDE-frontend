import { Button, StyleSheet, Text, View, SafeAreaView, TouchableOpacity, ScrollView, TouchableWithoutFeedback, Image } from 'react-native';
import { useFonts, Poppins_400Regular, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import React, { useState, useEffect } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux';


export default function PatientScreen( { navigation, route }) {

    let [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Poppins_600SemiBold,
      });

    const [isDisponible, setIsDisponible] = useState(true)
    const [patient, setPatient]= useState(null)

  

//console.log('sur patienScreen :', route.params._id)
  

  useEffect(() => {
    fetch(`http://192.168.1.5:3000/patients/patient/${route.params._id}`).then(response => response.json())
    .then(data => {
        setPatient(data.patient)
    })
  }, []);


    

///////////// création date du jour en MS :    
    const today = new Date();
    const timestamp = today.getTime()
    
    
////////////// 10 prochain jours à afficher dans les prochains rdv :
let rdv;
if (patient) {
    rdv = patient.treatments.map((data) => {
        const tenDaysLaterInMS = timestamp + (10 * 24 * 60 * 60 * 1000);
        if (data.date <= tenDaysLaterInMS)
        return (
            <Text>`${data.date}: ${data.actions}`</Text>
        )
    })
}
     
 ///////////////////// 90 jours passés à afficher dans l'historique : 
 let oldRdv;
 if (patient) {
    oldRdv = patient.treatments.map((data) => {
        const ninetyDaysBeforeInMS = timestamp - (90 * 24 * 60 * 60 * 1000);
        if (data.date >= ninetyDaysBeforeInMS)
        return (
            <Text>`${data.date}: ${data.actions}`</Text>
        )
    })
 }
    

/////////////////////: bouton dispo/indispo :

    const changeDispo = () =>{
        setIsDisponible(!isDisponible)
    }

    const containerStyle = {
        backgroundColor: isDisponible ? '#CADDC5' : '99BD8F',
      };

///////////////////////////////////////////////////////////////
 if (!patient){
    return(
        <SafeAreaView  style={styles.container}>
        <View style={styles.noPatient}>
                <TouchableOpacity 
                    onPress={() => {
                        navigation.navigate('TabNavigator')
                        setPatient(null)}}>
                    <FontAwesome name={'chevron-left'} size={24} color='#99BD8F' />
                </TouchableOpacity>
            <Text>Data not found</Text>
            <Image
                  style={styles.image}
                  source={require('../assets/logo.png')}
            />
        </View>
        </SafeAreaView >

        
    )
    }  else {

    return (
    <SafeAreaView  style={styles.container}>
            <View styles={styles.titleContainer}>
                <TouchableOpacity 
                    onPress={() => {
                        navigation.navigate('TabNavigator')
                        setPatient(null)}}>
                    <FontAwesome name={'chevron-left'} size={24} color='#99BD8F' />
                </TouchableOpacity>
                <Image
                  style={styles.image}
                  source={require('../assets/logo.png')}
                />   
            </View>
            <Text style={styles.titlePage}>Fiche Patient</Text>
            <View style={styles.infos}>
                <Text>{patient.firstname} {patient.name}</Text>
                <View style={styles.address}>
                    <View style={styles.infosLeft}>
                        <FontAwesome name={'map-pin'} size={24} color='black' />
                        <Text>{patient.address}</Text>
                        <Text>{patient.infosAddress}</Text>
                        
                    </View>
                    <View style={styles.infosRight}>
                        <FontAwesome name={'phone'} size={24} color='black' />
                        <Text>portable : {patient.mobile}</Text>
                        <Text>fixe : {patient.homePhone}</Text>
                    </View>
                </View>
                <Text>{patient.ICEIdentity}: {patient.ICEPhoneNumber}</Text>
                <View>

                </View>
            </View>
            <TouchableWithoutFeedback onPress={changeDispo}>
                <View style={[styles.buttonDispo, containerStyle]}>
                    <Text style={[styles.text, styles.leftText, styles.leftTextStyle]}>Disponible</Text>
                    <Text style={[styles.text, styles.rightText, styles.rightTextStyle]}>Indisponible</Text>
                </View>
            </TouchableWithoutFeedback>
            <View>
            <Text style={styles.titleJournal}>Journal des soins</Text>
            <ScrollView style={styles.journalContainer}>
                <View style={styles.rdv}>
                    <View style={styles.previousRdv}>
                        <Text>Historique des RDV:</Text>
                        {oldRdv}
                    </View>
                    <View style={styles.nextRdv}>
                        <Text>Prochains RDV:</Text>
                        {rdv}
                    </View>
                </View> 
            </ScrollView>
            </View>
            <View>
                <TouchableOpacity  style={styles.button}>  
                <Text style={styles.text}>AJOUTER UNE CONSULTATION</Text>            
                </TouchableOpacity>
            </View>
    </SafeAreaView >
    );
    };
}


////////////////// style :

const styles = StyleSheet.create({
 container: {
   marginTop: 35, 
   marginBottom: 10,
   flex: 1,
   backgroundColor: '#fff',
   alignItems: 'center',
   justifyContent: 'space-between',
 },
 noPatient: {
    flexDirection: 'row',
    justifyContent: 'center',

 },
 image: {
    width: 60,
    height: 60,
  },
titlePage: {
    color: '#99BD8F',
    fontSize: 30,
    marginBottom: 50,
    fontFamily: 'Poppins_600SemiBold',
},
infos: {
    backgroundColor: '#99BD8F',
    alignItems: 'center',
    width: 350,
    height: 200,
    borderRadius: 10,
},

titleJournal: {
    color: '#99BD8F',
    fontSize: 30,
    marginBottom: 50,
    fontFamily: 'Poppins_400Regular',
},
text:{
    fontSize: 17,
    fontFamily: 'Poppins_400Regular', 
},
button : {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#99BD8F',
    width: 350,
    height: 50,
    borderRadius: 10,
    marginTop: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonDispo:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderRadius: 8,
  },
  leftText: {
    flex: 1,
    textAlign: 'center',
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    paddingVertical: 10,
    fontSize: 16,

  },
  rightText: {
    flex: 1,
    textAlign: 'center',
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    paddingVertical: 10,
  },
  rdv:{
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: 350,
    height: 400,
    backgroundColor: '#F0F0F0',
    borderRadius: 10,
    fontSize: 16,
  },
  journalContainer: {
    // marginTop: 5,
    // marginLeft: 5,
    width: 350,
    height: 400,
  },
  previousRdv:{},
  nextRdv: {
    color: 'lightgray'
  },
});
