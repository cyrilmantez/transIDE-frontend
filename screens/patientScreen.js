import { Button, StyleSheet, Text, View, SafeAreaView, TouchableOpacity  } from 'react-native';
import { useFonts, Poppins_400Regular, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function PatientScreen() {
    let [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Poppins_600SemiBold,
      });


    const [isDisponible, setIsDisponible] = useState(true)

    

    const changeDispo = () =>{
        setIsDisponible(!isDisponible)

    }

 return (
   <SafeAreaView  style={styles.container}>
        <View styles={styles.titleContainer}>
            <Text style={styles.titlePage}>Fiche Patient</Text>
        </View>
        <View>
            <Text style={styles.name}></Text>
            <View>
                <View style={styles.name}></View>
                <View></View>
            </View>
            <View></View>
        </View>
        <View>
        <Text style={styles.titleHistorique}>Historique des soins</Text>
        </View>
        <TouchableOpacity  style={styles.button} onPress={()=>changeDispo()}>  
            <View style={styles.buttonDispo}>
                <Text style={styles.text}>Disponible</Text> 
                <Text style={styles.text}>Indisponible</Text>    
            </View>
        </TouchableOpacity>
        
        <View style={styles.rdv}>
            <Text>Prochains RDV:</Text>
            <View style={styles.rdvContainer}></View>
        </View>
        <View>
            <TouchableOpacity  style={styles.button}>  
            <Text style={styles.text}>AJOUTER UNE CONSULTATION</Text>            
            </TouchableOpacity>
        </View>
   </SafeAreaView >
 );
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
titleHistorique: {
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
    height: 200,
    backgroundColor: '#F0F0F0',
    borderRadius: 10,
  },
  rdvContainer: {
    marginTop: 5,
    marginLeft: 5,
  }
});