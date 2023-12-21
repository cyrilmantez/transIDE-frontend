import { Button, TouchableWithoutFeedback, ScrollView, Modal, KeyboardAvoidingView, SafeAreaView, Image, StyleSheet, Text, TouchableOpacity, View, Platform } from 'react-native';
import { useFonts, Poppins_400Regular, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import { TextInput, List} from 'react-native-paper';
import { useEffect, useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { addPatient } from '../reducers/patients';
import { useDispatch, useSelector } from 'react-redux';
import { Camera, FlashMode} from 'expo-camera';
import { addPhoto } from '../reducers/users';
//mport * as DocumentPicker from 'expo-document-picker';


export default function AddTransmissionScreen({navigation}) {
   
    const user = useSelector((state) => state.users.value);
    const [isPatient, setIsPatient] = useState(false)
    const [isGeneral, setIsGeneral] = useState(true)

    const [text, setText] = useState('');
    const [patient , setPatient] = useState({name : 'Général', firstname: '', yearOfBirthday : ''})
    const [transmission, setTransmission] = useState({info : '', UrlDocument: ''})

    const [allPatients, setAllPatients] = useState([]);
    const [suggestions, setSuggestions] = useState([])
    const [modalMessage, setModalMessage] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false)

    console.log('patient :',patient);

    useEffect (() => {
      const tokenByDefault = user.officesTokens;
      const officeToken = tokenByDefault.filter(e => e.isByDefault)[0].token;
      console.log('token:',officeToken)
      fetch(`http://192.168.0.25:3000/patients/allPatients/${officeToken}`).then(
        response => response.json())
        .then(data => setAllPatients(data.Patients))
    }, [])
    console.log('allPatients :', allPatients);

    const handleIsGeneral = () => {
      setIsGeneral(!isGeneral);
      setIsPatient(!isPatient);
      setPatient({name : 'Général', firstname: '', yearOfBirthday : ''})
      setTransmission({info : '', UrlDocument: ''})
    }
    const handleIsPatient = () => {
      setIsPatient(!isPatient);
      setIsGeneral(!isGeneral);
      setText('');
      setTransmission({info : '', UrlDocument: ''})
      handlePatientNameChange('')
    }

    const handlePatientNameChange = (text => {
      setText(text);
    const filteredSuggestions = allPatients.filter((item) =>
    item.name.toLowerCase().includes(text.toLowerCase())
  );
    filteredSuggestions.sort((a, b) => {
      //Sort by name
      const nameA = a.name.toUpperCase();
      const nameB = b.name.toUpperCase();
      if (nameA < nameB) return -1;
      if (nameA > nameB) return 1;
    
       //Sort by firstname
      const firstNameA = a.firstname.toUpperCase();
      const firstNameB = b.firstname.toUpperCase();
    
      if (firstNameA < firstNameB) return -1;
      if (firstNameA > firstNameB) return 1;
    
       //Sort by yearOfBirthday
      const dateA = new Date(a.yearOfBirthday.split('/').reverse().join('/'));
      const dateB = new Date(b.yearOfBirthday.split('/').reverse().join('/'));
    
      return dateA - dateB;
    });
    setSuggestions(filteredSuggestions);
    })

    const handlePatientChoice = (name, firstname, yearOfBirthday) => {
      setText(`${name} ${firstname}`);
      setPatient({...patient, name , firstname, yearOfBirthday})
    }
    const suggestionsToDisplay = suggestions.map((item, index) => {
       return (
          <TouchableOpacity key={index} style={styles.listSuggestionText} onPress={()=>{handlePatientChoice (item.name, item.firstname, item.yearOfBirthday)}}>
          <Text style={styles.textAlign}>{`${item.name} ${item.firstname} - ${item.yearOfBirthday}`} </Text>
        </TouchableOpacity>
       )
       
    })


    const handleRegister = () => {
      if(transmission.info.length===0){
          setModalMessage('Pas de message, pas de transmission !');
          setIsModalVisible(true);;
      }else if(!isPatient){
        const tokenByDefault = user.officesTokens;
        const officeToken = tokenByDefault.filter(e => e.isByDefault)[0].token;
        const newTransmission = {
          ...transmission,
          date : new Date(),
          nurse : user.username,
         }
         const data = {
          patient : patient,
          transmission : newTransmission,
          token : officeToken,
        }
        fetch('http://192.168.0.25:3000/transmissions/addtransmission', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
          if(data.result){
            setModalMessage('transmission générale enregistrée !');
            setIsModalVisible(true);
          }
        });
      }else{
        const isExisting = allPatients.filter((item) =>{
        return `${item.name} ${item.firstname} ${item.yearOfBirthday}`.toLowerCase() === `${patient.name} ${patient.firstname} ${patient.yearOfBirthday}`.toLowerCase()
        });
     
        if(isExisting.length === 1){
                const tokenByDefault = user.officesTokens;
                const officeToken = tokenByDefault.filter(e => e.isByDefault)[0].token;
                const newTransmission = {
                  ...transmission,
                  date : new Date(),
                  nurse : user.username,
                };
                console.log('transmission pour :', newTransmission);
                const data = {
                  patient : patient,
                  transmission : newTransmission,
                  token : officeToken,
                }
                fetch('http://192.168.0.25:3000/transmissions/addtransmission', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
                })
                .then(response => response.json())
                .then((data)=> {
                  if(data.result){
                       setModalMessage('transmission patient enregistrée !');
                       setIsModalVisible(true);
                  }
                 
                });
        }else{
          setModalMessage('Le patient n\'existe pas !');
          setIsModalVisible(true);;
        }
      }
      }

      //Close Modal
  const closeModal = () => {
     setIsModalVisible(false);
     setModalMessage('');
  }
  const handleCloseModale = (message) => {
    if(message === 'transmission patient enregistrée !' || message === 'transmission générale enregistrée !'){
        navigation.navigate('TabNavigator')
        setPatient({name : 'Général', firstname: '', yearOfBirthday : ''});
        setTransmission({info : '', UrlDocument: ''});
    }
    closeModal()
  }
  

        return (
    <>
        <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
          <View style={{ flexGrow: 1 }}>
            <View style={styles.header}>
              <TouchableOpacity>
                  <FontAwesome name={'chevron-left'} size={24} color='#99BD8F' marginTop={20} marginLeft={15} onPress={() => navigation.navigate('TabNavigator')} />
              </TouchableOpacity>
                 <Image 
              style={styles.image}
              source={require('../assets/logo.png')} />
            </View>
            <ScrollView>
            <View style={styles.content}>
                <Text style={styles.transmission} >Nouvelle transmission</Text>
                <View style={styles.buttonContainer}>
                    {!isGeneral && <TouchableOpacity style={styles.button} onPress={() => handleIsGeneral()}>
                        <Text style={styles.textButton} >Général</Text>
                    </TouchableOpacity>}
                    {isGeneral && <TouchableOpacity style={{backgroundColor: '#99BD8F',width: 90,height: 50,borderRadius: 10,justifyContent: 'center',alignItems: 'center'}} >
                        <Text style={styles.textButton} >Général</Text>
                    </TouchableOpacity>}
                  {!isPatient &&  <TouchableOpacity style={styles.button} onPress={() => handleIsPatient()}>
                        <Text style={styles.textButton} >Patient</Text>
                    </TouchableOpacity>}
                    {isPatient &&  <TouchableOpacity style={{backgroundColor: '#99BD8F',width: 90,height: 50,borderRadius: 10,justifyContent: 'center',alignItems: 'center'}}>
                        <Text style={styles.textButton} >Patient</Text>
                    </TouchableOpacity>}
                </View>
                                  {isPatient && (<>
                                      <TextInput style={styles.patientInput}
                                          label='Nom du patient' 
                                          mode='outlined'
                                          theme={{ 
                                            colors: { 
                                              primary: '#99BD8F', 
                                            }
                                      }}
                                       
                                        onChangeText={text => handlePatientNameChange(text)} 
                                        value={text}
                                        onFocus={() => setPatient({name : 'Général', firstname: '', yearOfBirthday : ''})}/>
                                        {text && patient.name==='Général' && (<View style={styles.suggestionsContainer}>
                                            <>
                                            {suggestionsToDisplay}
                                            </>
                                        </View>)}
                                        
                                   </> )}
                                <View style={styles.messageContainer}>
                                    {isPatient &&  <Text style={{color: '#99BD8F',
                                    fontSize: 20,
                                    fontFamily: 'Poppins_600SemiBold',textAlign : 'center'}} >Message</Text>}
                                    {!isPatient &&  <Text style={styles.message} >Message</Text>}
                                    <TextInput 
                                        label='Message' 
                                        mode='outlined'
                                        theme={{ 
                                          colors: { 
                                            primary: '#99BD8F', 
                                          }
                                        }}
                                        multiline={true}
                                        numberOfLines={10}
                                        style={styles.transmissionInput}
                                        onChangeText={text => setTransmission({...transmission, info:text})} 
                                        value={transmission.info}/>
                                </View>
                              
                                {isGeneral && <TouchableOpacity style={styles.buttonValidate} onPress={() => handleRegister()}>
                                      <Text style={styles.textButton} >Valider</Text>
                                </TouchableOpacity>}
                                {isPatient && <TouchableOpacity style={styles.buttonValidatePatient} onPress={() => handleRegister()}>
                                      <Text style={styles.textButton} >Valider</Text>
                                </TouchableOpacity>}
                                
                   
                  <Modal transparent visible={isModalVisible} onRequestClose={closeModal}>
                        <View style={styles.modalContainer}>
                          <View style={styles.modalContent}>
                              <Text style={styles.modalText}>{modalMessage}</Text>
                              <TouchableOpacity style={styles.closeButton} onPress={() => handleCloseModale(modalMessage)}>
                                <Text style={styles.modalButtonText}>Fermer</Text>
                              </TouchableOpacity>
                          </View>
                        </View>
                  </Modal>
            </View>
            </ScrollView>
          </View>
        </SafeAreaView>
    </>
        );
    }


    const styles = StyleSheet.create({
      scrollView: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      container: {
       flex: 1,
       alignItems: 'center',
     
      },

     header: {
       height: '10%',
       width : '100%',
       justifyContent: 'space-between',
       flexDirection: 'row',

     },
     image: {
       width: 60,
       height: 60,
     },

     content : {
        flexGrow: 1,
        width: '100%',
        alignItems: 'center',
     
     },
     transmission: {
       color: '#99BD8F',
       fontSize: 30,
       fontFamily: 'Poppins_600SemiBold',
      },
      buttonContainer:{
        width: 300,
        height:70,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
      },
      button: {
        backgroundColor: '#CADDC5',
        width: 80,
        height: 40,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
      },
      textButton:{
        color: 'white',
        fontSize: 15,
        fontFamily: 'Poppins_600SemiBold',
      },
      patientInput : {
        width: 350,
      },
      suggestionsContainer:{
        marginRight: 80,
        width: '70%',
        display:'flex',
        overflow: 'scroll',
        justifyContent: 'space-between',
        alignContent: 'center',
        marginTop: 0,
        borderColor: '#99BD8F',
        borderWidth: 0.5,
      },

      suggestionList: {
        width:'95%',
        maxHeight:'95%',
        backgroundColor: 'white',
        marginLeft:5,
      },
      listSuggestionText:{
        textAlign: 'center',
        backgroundColor: 'white',
        paddingLeft:10,
        height: 30,
        ...Platform.select({
          ios: {
            shadowColor: 'black',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.5,
            shadowRadius: 3,
          },
          android: {
            elevation: 2,
          },
        }),
      },
      textList : {
        textAlign: 'center',
      },
      
       messageContainer:{
        marginTop: 60,
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      message: {
        color: '#99BD8F',
        fontSize: 20,
        fontFamily: 'Poppins_600SemiBold',
        textAlign : 'center',

       }, 

       transmissionInput : {
        width: '95%',
      
        borderRadius: 50,

      },
      buttonValidatePatient : {
        marginTop: 120,
        backgroundColor: '#99BD8F',
        width: 350,
        height: 50,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
      },
      buttonValidate : {
        marginTop: 175,
        backgroundColor: '#99BD8F',
        width: 350,
        height: 50,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
      },


      modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
      modalContent: {
        backgroundColor: 'white',
        padding: 8,
        borderRadius: 10,
        borderColor: '#99BD8F',
        borderWidth: 5,
        elevation: 5,
        height: 300,
        width: 250,
        display:'flex',
        justifyContent: 'space-between',
        alignContent: 'center'
      },
      closeButton :{
        borderColor: 'white',
        borderWidth: 1,
        display:'flex',
        justifyContent: 'center',
        alignContent: 'center',
        marginBottom: 10,
        height: 40,
        backgroundColor:'#99BD8F',
      },
      modalButtonText:{
        textAlign: 'center',
        color: 'white',
       },
       modalText:{
        textAlign: 'center',
        marginTop: 90,
       }
     });