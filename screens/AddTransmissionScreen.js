import { Button, TouchableWithoutFeedback, ScrollView, Modal, KeyboardAvoidingView, SafeAreaView, Image, StyleSheet, Text, TouchableOpacity, View, Platform, Keyboard} from 'react-native';
import { useFonts, Poppins_400Regular, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import { TextInput, List} from 'react-native-paper';
import { useEffect, useState } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux';
import * as DocumentPicker from 'expo-document-picker'; 


export default function AddTransmissionScreen({navigation}) {
    //const dispatch = useDispatch();
    const officeToken = useSelector((state) => state.users.value.officesTokens[0].token)
    const [isPatient, setIsPatient] = useState(false)
    const [isGeneral, setIsGeneral] = useState(true)
    const [patientName, setPatientName] = useState('');
    const [message, setMessage] = useState('');
    const [document, setDocument] = useState(null);
    const [allPatients, setAllPatients] = useState([]);
    const [suggestions, setSuggestions] = useState([]);

    useEffect (() => {
      fetch(`http://192.168.1.162:3000/patients/allPatients/${officeToken}`).then(
        response => response.json())
        .then(data => setAllPatients(data.Patients))
    }, [])
    console.log('allPatients :', allPatients);
    console.log('suggestions :',suggestions)

    const handleIsGeneral = (state) => {
      setIsGeneral(state);
      setIsPatient(false);
    }
    const handleIsPatient = (state) => {
      setIsPatient(state);
      setIsGeneral(false);
    }

    const handlePatientNameChange = (text => {
      setPatientName(text);
    const filteredSuggestions = allPatients.filter((item) =>
    `${item.name} ${item.firstname}`.toLowerCase().includes(text.toLowerCase())
  );
    setSuggestions(filteredSuggestions);
    })

    const suggestionsToDisplay = suggestions.map((item, index) => {
       return (
       
          <TouchableOpacity key={index} onPress={()=>setPatientName(`${item.name} ${item.firstname}`)}>
          <Text >{`${item.name} ${item.firstname}`} </Text>
        </TouchableOpacity>
       
        
       )
       
    })

    /*const handleDocumentPick = async () => {
      try {
        const result = await DocumentPicker.pick({
          type: [DocumentPicker.types.allFiles],
        });
  
        // Traitez le document sélectionné ici, par exemple, stockez-le dans l'état
        setDocument(result);
  
        console.log(result);
      } catch (error) {
        if (DocumentPicker.isCancel(error)) {
          // L'utilisateur a annulé le choix du document
        } else {
          console.error('Erreur lors du choix du document', error);
        }
      }
    };
  */

        return (
    <>
      <SafeAreaView style={{flex: 0, backgroundColor: '#99BD8F'}} />
        <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <KeyboardAvoidingView  behavior={Platform.OS === 'ios' ? 'padding' :'height'} style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollView}>
              <View>
                <View style={styles.header}>
                      <TouchableOpacity>
                          <FontAwesome name={'chevron-left'} size={24} color='#99BD8F' marginTop={20} marginLeft={15} onPress={() => navigation.navigate('TabNavigator')} />
                      </TouchableOpacity>
                        <Image 
                      style={styles.image}
                      source={require('../assets/logo.png')} />
                  </View>
              <View style={styles.content}>
                  <Text style={styles.transmission} >Nouvelle transmission</Text>
                  <View style={styles.buttonContainer}>
                      {!isGeneral && <TouchableOpacity style={styles.button} onPress={() => handleIsGeneral(true)}>
                          <Text style={styles.textButton} >Général</Text>
                      </TouchableOpacity>}
                      {isGeneral && <TouchableOpacity style={{backgroundColor: '#99BD8F',width: 90,height: 50,borderRadius: 10,justifyContent: 'center',alignItems: 'center'}} >
                          <Text style={styles.textButton} >Général</Text>
                      </TouchableOpacity>}
                    {!isPatient &&  <TouchableOpacity style={styles.button} onPress={() => handleIsPatient(true)}>
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
                          value={patientName}/>
                          {/**/}
                      {suggestions.length >0 && <ScrollView style={styles.suggestionsContainer}>
                            <View style={styles.suggestionList}> 
                              {suggestionsToDisplay}
                            </View>
                      </ScrollView>}
                     
                    </> )}
                  
                  
                  
                      {isPatient &&  <Text style={{color: '#99BD8F',
              fontSize: 20,
              fontFamily: 'Poppins_600SemiBold',borderColor: 'green',
              borderWidth: 5,textAlign : 'center',height:'20%'}} >Message</Text>}
                  {!isPatient &&  <Text style={styles.message} >Message</Text>}
                      <TextInput 
                          label='Message' 
                          mode='outlined'
                          theme={{ 
                            colors: { 
                              primary: '#99BD8F', 
                            }
                          }}
                          style={styles.transmissionInput}
                          onChangeText={text => setMessage(text)} 
                          value={message}/>
                  <View>
                      <Text >Documents associés</Text>
                      <TouchableOpacity >
                          <Text>Ajouter un document</Text>
                      </TouchableOpacity>
                  </View>
                  
                  <TouchableOpacity style={styles.buttonValidate} onPress={() => 'handleConnexion()'}>
                        <Text style={styles.textButton}>Valider</Text>
                        
                  </TouchableOpacity>
              </View>
              </View>
              </ScrollView>
            </KeyboardAvoidingView>
          </TouchableWithoutFeedback>
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
       justifyContent: 'center',
      },
     header: {
        height: '10%',
       justifyContent: 'space-between',
       flexDirection: 'row',
       borderColor: 'green',
       borderWidth: 1

     },
     image: {
       width: 60,
       height: 60,
     },

     content : {
       flex:1,
        borderColor: 'purple',
        borderWidth: 2,
        justifyContent: 'space-around',
        alignItems: 'center',
     },


     transmission: {
       color: '#99BD8F',
       fontSize: 30,
       fontFamily: 'Poppins_600SemiBold',
       borderColor: 'blue',
       borderWidth: 1
      },
      buttonContainer:{
        width: 250,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderColor: 'blue',
        borderWidth: 1
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
        flex:1,
        borderColor: 'red',
        borderWidth: 5,
      },
      suggestionList: {
        justifyContent: 'center',
        alignItems: 'center',
      },
      message: {
        color: '#99BD8F',
        fontSize: 20,
        fontFamily: 'Poppins_600SemiBold',
        borderColor: 'red',
        borderWidth: 5,
        textAlign : 'center',

       }, 

       transmissionInput : {
        borderRadius: 50,
        width: 350,
        textAlign: 'left', 
        textAlignVertical: 'top',
     
      },
      documentsInput : {
        marginBottom: 20,
        width: 350,
      },

      buttonValidate : {
        backgroundColor: '#99BD8F',
        width: 350,
        height: 50,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'blue',
        borderWidth: 1
      },
 
     });