import { Platform, UIManager } from 'react-native';

if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
}

import { Button, TouchableWithoutFeedback, ScrollView, Modal, Keyboard, SafeAreaView, Image, StyleSheet, Text, TouchableOpacity, View,  } from 'react-native';
import { useFonts, Poppins_400Regular, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import { TextInput, List} from 'react-native-paper';
import { useEffect, useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { addPatient } from '../reducers/patients';
import { useDispatch, useSelector } from 'react-redux';
import { Camera, FlashMode} from 'expo-camera';
import { addPhoto } from '../reducers/users';

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
    const [addRdv, setAddRdv] = useState('');
    const [addTreatment, setAddTreatment] = useState('');
    const [dobPatient, setdobPatient] = useState('');
    const [results, setResults] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [displayDate, setDisplayDate] = useState('');
    const [mode, setMode] = useState('');

    // Hook Add RDV
    const showPicker = (currentMode) => {
      setMode(currentMode)
    };
    const handleDateChange = (event, selectedDate) => {
      
      showPicker();
  
      const currentDate = selectedDate || dateHeure;
      setDateHeure(currentDate);
  
      const formattedDate = currentDate.toLocaleDateString('fr-FR');
      const formattedTime = currentDate.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
      setAddRdv(`${formattedDate} ${formattedTime}`);
  
      // Convertir la date en UTC avant de l'appeler toISOString()
      const utcDate = new Date(Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), currentDate.getHours(), currentDate.getMinutes()));
      const utcFormat = utcDate.toISOString();
      setAddRdv(utcFormat);
  };
  
    
    const user = useSelector((state) => state.users.value)
    
    
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
        fetch('http://192.168.0.25:3000/patients/addPatient', {
          method: 'POST',
          headers: {'Content-Type' : 'application/json'},
          body: JSON.stringify({
            officeToken: user.officesTokens,
            name: lastnamePatient.toUpperCase(),
            firstname: firstnamePatient.charAt(0).toUpperCase() + firstnamePatient.slice(1).toLowerCase(),
            yearOfBirthday : dobPatient, 
            address: addressPatient,
            infosAddress : additionalAddress,
            homePhone : homePhone,
            mobile: phoneNumber, 
            treatments:[{
              isVisited : false,
              isOk: false,
              isOkWithModification: false,
              date: addRdv, 
              actions: addTreatment, 
              nurse: '',
              documentsOfTreatment: [{
                creationDate: Date,
                urls: ['']
              }],
            }],
            documents: [{
              creationDate: Date,
              url: '',
            }],    
            transmissions: [{
              date: Date,
              nurse : '',
              info : '',
              urlDocument: '',    
            }],
            disponibility: true,
            ICEIdentity: personToContact,
            ICEPhoneNumber: phonePersonToContact, 
          })
        }).then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        }).then(data => {
            if (data.result){
              dispatch(addPatient());
              setFirstnamePatient('');
              setLastnamePatient('');
              setAddressPatient('');
              setAdditionalAddress('');
              setPhoneNumber('');
              setHomePhone('');
              setPersonToContact('');
              setPhonePersonToContact('');
              setAddRdv('');
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

      // Photo
              //Permission
      // const [hasPermission, setHasPermission] = useState(false);
      // const [flashMode, setFlashMode] = useState(FlashMode.off);

      // useEffect(() => {
      //   (async () => {
      //     const {status} = await Camera.requestCameraPermissionsAsync();
      //     setHasPermission(status === 'granted')
      //   })();
      // }, []);

      // const takePicture = async () => {
      //   const photo = await cameraRef.takePictureAsync({quality: 0.4});
      //   const formData = new FormData();
      //     formData.append('photoFromAddPatientScreen', {
      //       ueri: photo.uri,
      //       type: 'image/jpeg',
      //       name: 'photo.jpg',
      //     });

      //     fetch('/upload', {
      //       method: 'POST',
      //       body: formData,
      //     }).then((response) => response.json())
      //     .then((data) =>{

      //     })
      //     dispatch(addPhoto(photo.uri))
      // }
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
              <KeyboardAwareScrollView contentContainerStyle={styles.scrollView} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} enableOnAndroid={true}>
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
                                onChangeText={text => {
                                  let cleaned = ('' + text).replace(/\D/g, '');                    
                                  if (cleaned.length > 10) {
                                    cleaned = cleaned.substring(0, 10);
                                  }                    
                                  const match = cleaned.match(/(\d{0,2})/g);
                                  const phoneNumber = match.join('.').replace(/\.$/, '');
                                  setPhoneNumber(phoneNumber)}} 
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
                                onChangeText={text =>{ 
                                  let cleaned = ('' + text).replace(/\D/g, '');                    
                                  if (cleaned.length > 10) {
                                    cleaned = cleaned.substring(0, 10);
                                  }                    
                                  const match = cleaned.match(/(\d{0,2})/g);
                                  const phoneNumber = match.join('.').replace(/\.$/, '');
                                  setHomePhone(phoneNumber)}} 
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
                                    mode={mode}
                                    display="default"
                                    locale="fr-FR"
                                    onChange={handleDateChange}
                                />
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
    marginBottom: 20,
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
    textAlign: "center",
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 17,
    color: '#F0F0F0',
  }
});