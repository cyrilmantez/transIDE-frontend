import { Button, StyleSheet, Text, View, TouchableWithoutFeedback, KeyboardAvoidingView, ScrollView, Keyboard, TouchableOpacity, SafeAreaView, Modal, Image } from 'react-native';
import { TextInput, Icon } from 'react-native-paper';
import { useFonts, Poppins_400Regular, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import React, { useState, useEffect } from 'react';
import moment from 'moment'; 
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux';

export default function AddConsultationScreen({ navigation, route }) {
    const [plannedTreatments, setPlannedTreatments] = useState('');
    const [patient, setPatient] = useState({name : '', firstname: '', yearOfBirthday : '', _id:''});
    const [patientName, setPatientName] = useState('');
    const [startDay, setStartDay] = useState('');
    const [endDay, setEndDay] = useState('');
    const [hour, setHour] = useState('');
    const [frequency, setFrequency] = useState('');

    const [modalMessage, setModalMessage] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false)

    const [allPatients, setAllPatients] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const [text, setText] = useState('');
    const [idForFetch, setIdForFetch ] = useState('')
    const [patientFinded, setPatientFinded] = useState(false)


    const user = useSelector((state) => state.users.value);

    useEffect (() => {
        const tokenByDefault = user.officesTokens;
        const officeToken = tokenByDefault.filter(e => e.isByDefault)[0].token;
        fetch(`http://192.168.0.25:3000/patients/allPatients/${officeToken}`).then(
          response => response.json())
          .then(data => {
            setAllPatients(data.Patients)
          })
      }, [])


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
  
      const handlePatientChoice = (name, firstname, yearOfBirthday, _id) => {
        setText(`${name} ${firstname}`);
        setPatient({...patient, name , firstname, yearOfBirthday, _id})
        setIdForFetch(_id)
        setPatientFinded(true)
      }

      const suggestionsToDisplay = suggestions.map((item, index) => {
         return (
            <TouchableOpacity key={index} style={styles.listSuggestionText} onPress={()=>{handlePatientChoice (item.name, item.firstname, item.yearOfBirthday, item._id)}}>
                <Text style={styles.textAlign}>{`${item.name} ${item.firstname} - ${item.yearOfBirthday}`} </Text>
            </TouchableOpacity>
         )
      })


      ////////// gestion couleur de la fréquence sélectionnée:
      let frequencyColor1 = '#CADDC5';
      let frequencyColor2 = '#CADDC5';
      let frequencyColor3 = '#CADDC5';
      let frequencyColor4 = '#CADDC5';

      if(frequency === '1X/ jour'){frequencyColor1 = '#99BD8F'}
      if(frequency === '1X/2 jours'){frequencyColor2 = '#99BD8F'}
      if(frequency === '1X/3 jours'){frequencyColor3 = '#99BD8F'}
      if(frequency === '1X/7 jours'){frequencyColor4 = '#99BD8F'}



    ///////////////////// addTreatment :
    const handleSubmit = () => {
    
        //// manip dates :
        const [dayStart, monthStart, yearStart] = startDay.split('/').map(Number);
        const [dayEnd, monthEnd, yearEnd] = endDay.split('/').map(Number);
        const [hours, minutes] = hour.split('h').map(Number)
        const debut = new Date(yearStart , monthStart - 1, dayStart, hours + 1, minutes);
        const fin = new Date(yearEnd, monthEnd - 1, dayEnd, hours + 1, minutes);

        let newAllTreatments = [];
        let currentDate = new Date(debut)
        while (currentDate <= fin) {
            newAllTreatments.push({
              date: new Date(currentDate),
              isVisited : false,
              isOk: false,
              isOkWithModification: false,
              actions: [plannedTreatments],
              nurse: '',
              documentsOfTreatment: [],
              
            });
            if(frequency === '1X/ jour'){currentDate.setDate(currentDate.getDate() + 1);}
            if(frequency === '1X/2 jours'){currentDate.setDate(currentDate.getDate() + 2);}
            if(frequency === '1X/3 jours'){currentDate.setDate(currentDate.getDate() + 3);}
            if(frequency === '1X/7 jours'){currentDate.setDate(currentDate.getDate() + 7);}
          }
        // console.log(idForFetch)
        // console.log(newAllTreatments)
        fetch('http://192.168.1.5:3000/patients/addTreatment', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                 newTreatments : newAllTreatments,
                _id: idForFetch
            })
        }).then(response => response.json())
        .then(data => {
            if(data.result){
            setModalMessage('consultations ajoutées !');
            setIsModalVisible(true);
            setPatientFinded(false)
            }
        });
    }

//////////////Close Modal :
const closeModal = () => {
    setIsModalVisible(false);
    setModalMessage('');
 };

 const handleCloseModale = (message) => {
   if(message === 'consultations ajoutées !'){
       navigation.navigate('TabNavigator')
       setPatient({name : '', firstname: '', yearOfBirthday : '', _id: ''});
       setStartDay('')
       setEndDay('')
       setFrequency('')
       setPlannedTreatments('')
   }
   closeModal()
 };

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                        <View style={styles.header}>
                            <View style={styles.headerTop}>
                                <TouchableOpacity style={styles.chevronIcon}>
                                <FontAwesome name={'chevron-left'} size={24} color='#99BD8F'  onPress={() => navigation.navigate('TabNavigator')} />
                                </TouchableOpacity>
                                <Image 
                                style={styles.image}
                                source={require('../assets/logo.png')} />
                            </View>
                            <View styles={styles.titleContainer}>
                                <Text style={styles.titlePage}>Nouvelle consultation</Text>
                            </View>
                        </View>
                        <ScrollView style={{flex: 0.8}}>
                        <View style={styles.inputContainer}>    
                                <TextInput  
                                    label='Nom du patient'
                                    mode='outlined'
                                    multiline={true}
                                    textAlignVertical= 'top'
                                    theme={{ 
                                        colors: { 
                                        primary: '#99BD8F', 
                                        }
                                    }}
                                    style={{ width: 350, marginTop: 15 }}
                                    value={text}
                                    // onChangeText={text => setPatientName(text)}
                                    onChangeText={text => handlePatientNameChange(text)} 
                                    onFocus={() => setPatient({name : '', firstname: '', yearOfBirthday : '', _id:''})}/>
                                        {text && !patientFinded &&(<View style={styles.suggestionsContainer}>
                                            <>
                                            {suggestionsToDisplay}
                                            </>
                                        </View>)}
                            <View>
                            <TextInput 
                                label='soins prévus'
                                mode='outlined'
                                theme={{ 
                                    colors: { 
                                    primary: '#99BD8F', 
                                    }
                                }}
                                style={{ width: 350, marginTop: 15 }}
                                onChangeText={text => setPlannedTreatments(text)} 
                                value={plannedTreatments}/>
                            <TextInput 
                                label='date de début (jj/mm/aaa)'
                                mode='outlined'
                                theme={{ 
                                    colors: { 
                                    primary: '#99BD8F', 
                                    }
                                }}
                                style={{ width: 350, marginTop: 15 }}
                                onChangeText={text => setStartDay(text)} 
                                value={startDay}/>
                            <TextInput 
                                label='date de fin (jj/mm/aaaa)'
                                mode='outlined'
                                theme={{ 
                                    colors: { 
                                    primary: '#99BD8F', 
                                    }
                                }}
                                style={{ width: 350, marginTop: 15 }}
                                onChangeText={text => setEndDay(text)} 
                                value={endDay}/>
                            <TextInput 
                                label='heure de passage (heures h minutes)'
                                mode='outlined'
                                theme={{ 
                                    
                                    colors: { 
                                    primary: '#99BD8F', 
                                    }
                                
                                }}
                                style={{ width: 350, marginTop: 15 }}
                                onChangeText={text => setHour(text)} 
                                value={hour}/>
                            </View>
                            <View style={styles.frequency}>
                            <TouchableOpacity onPress={() => setFrequency('1X/ jour')} style={{ justifyContent: 'space-between', alignItems: 'center'}}>
                                <Text style={{marginTop : 12, fontFamily: 'Poppins_400Regular', fontSize: 10,}}>1X/ jour</Text>
                                <Icon source={'checkbox-blank-circle'} size={42} color={frequencyColor1} activeOpacity={0.8}/>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setFrequency('1X/2 jours')} style={{ justifyContent: 'space-between', alignItems: 'center'}}>
                                <Text style={{marginTop : 12, fontFamily: 'Poppins_400Regular', fontSize: 10,}}>1X/2 jours</Text>
                                <Icon source={'checkbox-blank-circle'} size={42} color={frequencyColor2} activeOpacity={0.8}/>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=> setFrequency('1X/3 jours')}style={{ justifyContent: 'space-between', alignItems: 'center'}}>
                                <Text style={{marginTop : 12, fontFamily: 'Poppins_400Regular', fontSize: 10,}}>1X/3 jours</Text>
                                <Icon source={'checkbox-blank-circle'} size={42} color={frequencyColor3} activeOpacity={0.8}/>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setFrequency('1X/7 jours')} style={{ justifyContent: 'space-between', alignItems: 'center'}}>
                                <Text style={{marginTop : 12, fontFamily: 'Poppins_400Regular', fontSize: 10,}}>1X/7 jours</Text>
                                <Icon source={'checkbox-blank-circle'} size={42} color={frequencyColor4} activeOpacity={0.8}/>
                            </TouchableOpacity>
                            </View>
                        </View>
                        <View>
                            <TouchableOpacity onPress={() => handleSubmit()} style={styles.buttonValidate} activeOpacity={0.8}>  
                                <Text style={styles.textButton}>Valider</Text>            
                            </TouchableOpacity>
                        </View>
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
                  </ScrollView>
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        // flex: 1,
        // backgroundColor: '#fff',
    },
    header:{
        height: '20%',
        width : '100%',
        justifyContent: 'space-around',
        alignItems : 'center',
    },
    headerTop: {
        height: '50%',
        width : '100%',
        justifyContent: 'space-between',
        flexDirection: 'row',
        // marginTop: 20,
      },
    chevronIcon: {
        marginTop: 10,
        marginLeft: 5
    },
    image: {
        width: 60,
        height: 60,
        marginTop: -5
      },
    titleContainer: {
        height: '3%',
        width : '100%',
    },
    frequency: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 15,
    },
    titlePage: {
        color: '#99BD8F',
        // marginTop: -60,
        fontSize: 30,
        fontFamily: 'Poppins_600SemiBold',
    },
    inputContainer: {
        justifyContent: 'space-between',
    },
    buttonValidate : {
        marginBottom: 35,
        marginTop: 50,
        backgroundColor: '#99BD8F',
        width: 350,
        height: 50,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textButton:{
        color: 'white',
        fontSize: 15,
        fontFamily: 'Poppins_600SemiBold',
    },
    listSuggestionText:{
        textAlign: 'center',
        backgroundColor: 'white',
        marginTop: 10,
        height: 30,
        ...Platform.select({
          ios: {
            shadowColor: 'black',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.5,
            shadowRadius: 3,
          },
          android: {
            elevation: 5,
          },
        }),
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