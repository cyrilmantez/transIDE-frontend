import { Button, StyleSheet, Text, View, SafeAreaView, TouchableOpacity, ScrollView  } from 'react-native';
import { useFonts, Poppins_400Regular, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import React, { useState } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux';


export default function PatientScreen(props) {

    let [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Poppins_600SemiBold,
      });

    const [isDisponible, setIsDisponible] = useState(true)
    const [patient, setPatient]= useState(null)

    //const dispatch = useDispatch();


  // const patient = useSelector((state) => state.onePatient.value);

fetch(`http://192.168.1.5:3000/patients/${props._id}`).then(response => response.json())
.then(data => {
    setPatient(data.patient)
})

    

///////////// création date du jour en MS :    
    const today = new Date();
    const timestamp = today.getTime()

////////////// 10 prochain jours à afficher dans les prochains rdv :
    const rdv = patient.treatment.map((data) => {
        const tenDaysLaterInMS = timestamp + (10 * 24 * 60 * 60 * 1000);
        if (data.date <= tenDaysLaterInMS)
        return (
            <Text>`${data.date}: ${data.actions}`</Text>

        )
    })

 ///////////////////// 90 jours passés à afficher dans l'historique : 
    const oldRdv = patient.treatment.map((data) => {
        const ninetyDaysBeforeInMS = timestamp - (90 * 24 * 60 * 60 * 1000);
        if (data.date >= ninetyDaysBeforeInMS)
        return (
            <Text>`${data.date}: ${data.actions}`</Text>

        )
    })

    const changeDispo = () =>{
        setIsDisponible(!isDisponible)

    }



 if (!patient){
    return(
        <Text>Data not found</Text>
    )
    }  else {

    return (
    <SafeAreaView  style={styles.container}>
            <View styles={styles.titleContainer}>
                <Text style={styles.titlePage}>Fiche Patient</Text>
            </View>

            <View style={styles.infos}>
                <Text>`${patient.firstname} ${patient.name.toUppercase()}`</Text>
                <View style={styles.address}>
                    <View style={styles.infosLeft}>
                        <FontAwesome name={'map-pin'} size={24} color='black' />
                        <Text>`${patient.address.road}`</Text>
                        <Text>`${patient.address.postalCode} - ${patient.address.city}`</Text>
                    </View>
                    <View style={styles.infosRight}>
                        <FontAwesome name={'phone'} size={24} color='black' />
                        <Text>`portable : ${patient.phoneNumbers.mobile}`</Text>
                        <Text>`fixe : ${patient.phoneNumbers.home}`</Text>
                    </View>
                </View>
                <Text>`${patient.inCaseOfEmergency.identity}: ${patient.inCaseOfEmergency.phoneNumber}`</Text>
                <View>

                </View>
            </View>

            <TouchableOpacity  style={styles.button} onPress={()=>changeDispo()}>  
                <View style={styles.buttonDispo}>
                    <Text style={styles.text}>Disponible</Text> 
                    <Text style={styles.text}>Indisponible</Text>    
                </View>
            </TouchableOpacity>
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

const styles = StyleSheet.create({
 container: {
   marginTop: 35, 
   marginBottom: 10,
   flex: 1,
   backgroundColor: '#fff',
   alignItems: 'center',
   justifyContent: 'space-between',
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
  },
  rdv:{
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: 350,
    height: 400,
    backgroundColor: '#F0F0F0',
    borderRadius: 10,

  },
  journalContainer: {
    // marginTop: 5,
    // marginLeft: 5,
    width: 350,
    height: 400,
  },
  previousRdv:{},
  nextRdv: {},
});
