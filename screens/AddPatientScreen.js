import { Button, TouchableWithoutFeedback, ScrollView, Modal, Keyboard, SafeAreaView, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useFonts, Poppins_400Regular, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import { TextInput, List} from 'react-native-paper';
import { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { addPatient } from '../reducers/patients';
import { useDispatch } from 'react-redux';

export default function AddPatientScreen({navigation}) {
    const dispatch = useDispatch();
    
    //Add patient
    const [dateHeure, setDateHeure] = useState(new Date());
    const [firstnamePatient, setFirstnamePatient] = useState('');
    const [lastnamePatient, setLastnamePatient] = useState('');
    const [addressPatient, setAddressPatient] = useState('');
    const [additionalAddress, setAdditionalAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [homePhone, setHomePhone] = useState('');
    const [personToContact, setPersonToContact] = useState('');
    const [phonePersonToContact, setPhonePersonToContact] = useState('');
    const [addRdv, setAddRdv] = useState(Date());
    const [addTreatment, setAddTreatment] = useState([]);
    const [dobPatient, setdobPatient] = useState('');
    const [results, setResults] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    // Hook Add RDV
    const handleDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || dateHeure;
        setDateHeure(currentDate);
        
        const formattedDate = currentDate.toLocaleDateString('fr-FR');
        const formattedTime = currentDate.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
        setAddRdv(`${formattedDate} ${formattedTime}`);
    };
    
    // Hook Add Patient
    const fetchAddress = (query) => {
        fetch(`https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(query)}&autocomplete=1`)
          .then(response => response.json())
          .then(data => {
            setResults(data.features);
            setShowSuggestions(true);
        })
      };

    const handleRegister = () => {      
            fetch('http://192.168.1.14:3000/patients/addPatient', {
              method: 'POST',
              headers: {'Content-Type' : 'application/json'},
              body: JSON.stringify({
                name: lastnamePatient, 
                firstname: firstnamePatient, 
                yearOfBirthday: dobPatient,
                address : [{
                  road: addressPatient,
                  infos: additionalAddress,
                }],
                treatment: [{
                  date: addRdv,
                  actions: addTreatment,
                }],
                phoneNumbers: [{
                  home: phoneNumber,
                  mobile : homePhone,
                }],
                inCaseOfEmergency: [{
                  identity: personToContact,
                  phoneNumber: phonePersonToContact,
                }]
              })
            }).then(response => response.json())
              .then(data => {
                if (data.result){
                  dispatch(addPatient({name: lastnamePatient, firstname: firstnamePatient, token: data.officeToken }));
                  setFirstnamePatient('');
                  setLastnamePatient('');
                  setAddressPatient('');
                  setAdditionalAddress('');
                  setPhoneNumber('');
                  setHomePhone('');
                  setPersonToContact('');
                  setPhonePersonToContact('');
                  setAddRdv(new Date());
                  setAddTreatment('');
                  setdobPatient('');
                  setModalVisible(true);
                }
              })
      }
      
      
      // Modal RDV enregistré 
      const [modalVisible, setModalVisible] = useState(false);

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
            <Text style={styles.modalText}>Le patient a été ajouté avec succès</Text>
            <Button
              title="Retour"
              onPress={() => {
                setModalVisible(!modalVisible);
                navigation.navigate('TabNavigator');
              }}
            />
          </View>
        </View>
      </Modal>
      );

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
                        {modalContent}
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
                                value={lastnamePatient} 
                                onChangeText={text => setLastnamePatient(text)} 
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
                                value={firstnamePatient} 
                                onChangeText={text => setFirstnamePatient(text)} 
                                style={{ width: 350, marginTop: 15 }} 
                            />
                            <TextInput 
                                label='Date de naissance' 
                                mode='outlined'
                                multiline
                                theme={{ 
                                colors: { 
                                    primary: '#99BD8F', 
                                }
                                }}
                                style={{ width: 350, marginTop: 15 }} 
                                value={dobPatient} 
                                onChangeText={text => setdobPatient(text)} 
                                placeholder='JJ/MM/AAAA' 
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
                                value={addressPatient} 
                                onChangeText={(text) => {
                                    setAddressPatient(text);
                                    fetchAddress(text);
                                    setResults([]);
                                  }}

                                style={{ width: 350, marginTop: 15 }} 
                            />
                            { results && results.map((result, index) => (
                            <List.Item
                                key={index}
                                title={result.properties.label}
                                onPress={() => {
                                    setAddressPatient(result.properties.label);
                                    setShowSuggestions(false);
                                    setResults([]);
                                    
                                }
                                }                    
                            />
                            ))}

                            <TextInput 
                                label="Complément d'adresse"
                                mode='outlined'
                                multiline
                                theme={{ 
                                colors: { 
                                    primary: '#99BD8F', 
                                }
                                }}
                                value={additionalAddress} 
                                onChangeText={text => setAdditionalAddress(text)} 
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
                                value={phoneNumber} 
                                onChangeText={text => setPhoneNumber(text)} 
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
                                value={homePhone} 
                                onChangeText={text => setHomePhone(text)} 
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
                                value={personToContact} 
                                onChangeText={text => setPersonToContact(text)} 
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
                                value={phonePersonToContact} 
                                onChangeText={text => setPhonePersonToContact(text)} 
                                style={{ width: 350, marginTop: 15 }} 
                            />
                            <View style={styles.rdv}>
                                <Text style={styles.textrdv}>Prochain rendez-vous</Text>
                                <DateTimePicker
                                    style={{ marginTop: 15, backgroundColor: 'white' }}
                                    value={dateHeure}
                                    mode="datetime"
                                    display="default"
                                    onChange={handleDateChange}
                                />
                                    <TouchableWithoutFeedback onPress={() => {}}>
                                        <View>
                                        <TextInput
                                        label='Date et Heure du rendez-vous'
                                        mode='outlined'
                                        theme={{ 
                                        colors: { 
                                            primary: '#99BD8F', 
                                        }
                                        }}
                                        style={{ width: 350, marginTop: 15 }} 
                                        value={addRdv}
                                        onChangeText={text => setAddRdv(text)}
                                        editable={false} 
                                        />
                                        </View>
                                    </TouchableWithoutFeedback>
                                </View>
                            <View>
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
                                value={addTreatment}
                                onChangeText={text => setAddTreatment(text)}
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
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "#99BD8F",
    borderRadius: 20,
    padding: 35,
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
    marginBottom: 15,
    textAlign: "center"
  }
});