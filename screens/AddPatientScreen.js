import { Button, TouchableWithoutFeedback, ScrollView, Keyboard, KeyboardAvoidingView, SafeAreaView, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useFonts, Poppins_400Regular, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import { TextInput} from 'react-native-paper';
import { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
export default function AddPatientScreen() {
    const [dateHeure, setDateHeure] = useState(new Date());
      
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
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <KeyboardAwareScrollView contentContainerStyle={styles.scrollView} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                    <ScrollView contentContainerStyle={styles.scrollView}>
                        <View style={styles.container}>
                            <View>
                                <Text style={styles.title}>NOUVEAU PATIENT</Text>
                            </View>
                            <View>
                            <TextInput 
                                label='Nom (Etat-Civil)' 
                                mode='outlined'
                                theme={{ 
                                colors: { 
                                    primary: '#99BD8F', 
                                }
                                }}
                                style={{ width: 350, marginTop: 15 }} 
                            />
                            <TextInput 
                                label='Prénom' 
                                mode='outlined'
                                theme={{ 
                                colors: { 
                                    primary: '#99BD8F', 
                                }
                                }}
                                style={{ width: 350, marginTop: 15 }} 
                            />
                            <TextInput 
                                label='Adresse' 
                                mode='outlined'
                                multiline
                                theme={{ 
                                colors: { 
                                    primary: '#99BD8F', 
                                }
                                }}
                                style={{ width: 350, marginTop: 15 }} 
                            />
                            <TextInput 
                                label="Complément d'adresse"
                                mode='outlined'
                                multiline
                                theme={{ 
                                colors: { 
                                    primary: '#99BD8F', 
                                }
                                }}
                                style={{ width: 350, marginTop: 15 }} 
                            />
                            <TextInput 
                                label='Numéro de téléphone portable'
                                mode='outlined'
                                theme={{ 
                                colors: { 
                                    primary: '#99BD8F', 
                                }
                                }}
                                keyboardType='phone-pad'
                                style={{ width: 350, marginTop: 15 }} 
                            />
                            <TextInput 
                                label='Numéro de téléphone fixe'
                                mode='outlined'
                                theme={{ 
                                colors: { 
                                    primary: '#99BD8F', 
                                }
                                }}
                                keyboardType='phone-pad'
                                style={{ width: 350, marginTop: 15 }} 
                            />
                            <TextInput 
                                label="Personne à contacter en cas d'urgence"
                                mode='outlined'
                                theme={{ 
                                colors: { 
                                    primary: '#99BD8F', 
                                }
                                }}
                                style={{ width: 350, marginTop: 15 }} 
                            />
                            <TextInput 
                                label='Numéro de téléphone portable'
                                mode='outlined'
                                theme={{ 
                                colors: { 
                                    primary: '#99BD8F', 
                                }
                                }}
                                keyboardType='phone-pad'
                                style={{ width: 350, marginTop: 15 }} 
                            />
                            <View style={styles.rdv}>
                                <Text style={styles.textrdv}>Prochain rendez-vous</Text>
                                <DateTimePicker
                                    style= {{marginTop: 15}}
                                    value={dateHeure}
                                    mode="datetime"
                                    display="default"
                                    onChange={(event, selectedDate) => {
                                        const currentDate = selectedDate || dateHeure;
                                        setDateHeure(currentDate);
                                    }}
                                />
                            </View>
                            <TextInput 
                                label="Soin(s)"
                                mode='outlined'
                                multiline
                                theme={{ 
                                    colors: { 
                                        primary: '#99BD8F', 
                                    }
                                }}
                                style={{ width: 350, marginTop: 15}} 
                            />
                            <View>
                            <TouchableOpacity style={styles.button} onPress={() => handleRegister()}>
                                <Text style={styles.text} >Valider</Text>
                            </TouchableOpacity>
                            </View>
                            </View>
                        </View>
                    </ScrollView>
                </KeyboardAwareScrollView>
            </TouchableWithoutFeedback>
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
   justifyContent: 'center',
 },
 title: {
    color: '#99BD8F',
    fontFamily: 'Poppins_600SemiBold', 
    fontSize: 30,
    marginTop: 20,
 },
 button : {
    backgroundColor: '#99BD8F',
    width: 350,
    height: 50,
    borderRadius: 10,
    marginTop: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'Poppins_600SemiBold', 
    fontSize: 17,
  },
  rdv: {
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textrdv: {
    color: '#99BD8F',
    fontFamily: 'Poppins_400Regular', 
    fontSize: 25,
  }
});