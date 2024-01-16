import { Button, Alert, Linking, SafeAreaView, Image, StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import { useFonts, Poppins_400Regular, Poppins_600SemiBold  } from '@expo-google-fonts/poppins';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Card } from 'react-native-paper';

export default function RessourcesScreen({navigation}) {
  const openURL = () => {
    Alert.alert(
      "Quitter l'application",
      "Tu vas quitter l'application. Souhaites-tu continuer ?",
      [
        {
          text: "Annuler",
          onPress: () => console.log("Annuler"),
          style: "cancel"
        },
        { text: "OK", onPress: () => Linking.openURL('https://www.ameli.fr/') }
      ],
      { cancelable: false }
    );
  };

  const openURLAnnuaire = () => {
    Alert.alert(
      "Quitter l'application",
      "Tu vas quitter l'application. Souhaites-tu continuer ?",
      [
        {
          text: "Annuler",
          onPress: () => console.log("Annuler"),
          style: "cancel"
        },
        { text: "OK", onPress: () => Linking.openURL('https://annuairesante.ameli.fr/') }
      ],
      { cancelable: false }
    );
  };

  const openURLArs = () => {
    Alert.alert(
      "Quitter l'application",
      "Tu vas quitter l'application. Souhaites-tu continuer ?",
      [
        {
          text: "Annuler",
          onPress: () => console.log("Annuler"),
          style: "cancel"
        },
        { text: "OK", onPress: () => Linking.openURL('https://www.ars.sante.fr/') }
      ],
      { cancelable: false }
    );
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
            <SafeAreaView style={{flex: 0, backgroundColor: '#99BD8F'}} />
            <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
            <View style={styles.container}>
            <View style={{ position: 'absolute', top: 35, left: 15 }} > 
              <TouchableOpacity onPress={() => navigation.navigate('TabNavigator')} >
                <FontAwesome name={'chevron-left'} size={30} color='#99BD8F'/>
              </TouchableOpacity>        
            </View>              
            <View>
                <Text style={styles.title}>RESSOURCES</Text>
            </View> 
              <View style={styles.content}>
                <ScrollView style={{height: 400}}>
                  <TouchableOpacity onPress={openURL}>
                    <Card style={styles.contentcard}>
                      <Card.Content style={styles.card}>
                        <Text style={{fontFamily: 'Poppins_600SemiBold'}}>Ameli</Text>
                      </Card.Content>
                    </Card>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={openURLAnnuaire}>
                    <Card style={styles.contentcard}>
                      <Card.Content style={styles.card}>
                        <Text style={{fontFamily: 'Poppins_600SemiBold'}}>Annuaire des professionnels de santé</Text>
                      </Card.Content>
                    </Card>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={openURLArs}>
                    <Card style={styles.contentcard}>
                      <Card.Content style={styles.card}>
                        <Text style={{fontFamily: 'Poppins_600SemiBold'}}>Agence Régionale de Santé</Text>
                      </Card.Content>
                    </Card>
                  </TouchableOpacity>
                </ScrollView>
              </View>
            </View>
            </SafeAreaView>
          </>
        );
      }
    }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  title: {
    color: '#99BD8F',
    fontFamily: 'Poppins_600SemiBold', 
    fontSize: 30,
    marginTop: 30,
    marginBottom: 20,
 },
 content: {
  alignContent: 'flex-start'
 },
 contentcard: {
  marginTop: 10,
  width: 300,
  marginRight: 10,
  marginLeft: 10,

 }
});