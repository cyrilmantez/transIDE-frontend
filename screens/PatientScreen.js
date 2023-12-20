import React, { useState, useEffect } from 'react';
import { View, Text, Modal, ScrollView, Alert, StyleSheet, SafeAreaView, Animated, TouchableOpacity, Touchable } from 'react-native';
import { useFonts, Poppins_400Regular, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import moment from 'moment';
import 'moment/locale/fr';
import { Card, Icon } from 'react-native-paper';
import 'react-native-gesture-handler';

export default function App({ navigation, route }) {
  const { _id: currentPatientId } = route.params;
  const [patient, setPatient] = useState(null);
  const [value, setValue] = useState('');
  const [visible, setVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    fetch(`http://192.168.1.5:3000/patients/patientById/${route.params._id}`).then(response => response.json())
    .then(data => {
        setPatient(data.patient)
    });
    
  }, []);

    // bouton disponible
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [disponibility, setDisponibility] = useState(patient ? patient.disponibility : false);
    const [refresh, setRefresh] = useState(false);

    const buttons = ['DISPONIBLE', 'INDISPONIBLE'];
    const buttonColors = patient && patient.disponibility ? ['#99BD8F', 'transparent'] : ['transparent', 'red'];
    

    const handleButtonPress = (index) => {
      const newDisponibility = index === 0 ? true : false; 
      Alert.alert(
        'Confirmation',
        `Confirmez-vous que ${patient.name} ${patient.firstname} sera ${buttons[index]}?`,
        [
          {
            text: 'Annuler',
            style: 'cancel',
          },
          { 
            text: 'Oui', 
            onPress: () => {
              if (patient) {
                fetch('http://192.168.1.5:3000/patients/updatePatientById', {
                  method: 'PUT',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    _id: patient._id,
                    newObject: {
                      disponibility: newDisponibility 
                    }
                  }),
                })
                .then(response => {
                  if (!response.ok) {
                    throw new Error('Server error');
                  }
                  return response.json();
                })
                .then(data => {
                  if (data.result) {
                    setDisponibility(newDisponibility); 
                    setRefresh(!refresh);
                  }
                })                
              }
            } 
          },
        ],
        { cancelable: false },
      );
    };

    useEffect(() => {
      
    }, [disponibility]);

    // Affichage des soins
    const [treatments, setTreatments] = useState([]);

    useEffect(() => {
      fetch('http://192.168.1.5:3000/patients/allPatientDay')
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          const currentPatient = data.allPatient.find(patient => patient._id === currentPatientId);

      if (currentPatient) {

        setTreatments(currentPatient.treatments);
      } else {
        console.log('Patient not found');
      }
        })
        
    }, []);
    
    
    const TreatmentList = () => {
      const now = moment();  
      return (
        <View style={styles.treatmentAffichage}>
          {treatments && treatments.sort((a, b) => new Date(b.date) - new Date(a.date)).map((treatment, index) => {
            const treatmentDate = moment(treatment.date);
            const isFuture = treatmentDate.isAfter(now);
            const isWithin90Days = now.diff(treatmentDate, 'days') <= 90;
            const isModified = treatment.isOkWithModification;
    
            if (isWithin90Days) {
              return (
                <Card key={index} style={isModified ? {backgroundColor: '#F9EAB6', width: 350, marginBottom: 10} : (isFuture ? {backgroundColor: '#CADDC5', width: 350, marginBottom: 10} : {width: 350, marginBottom: 10})}>
                  <Card.Content>
                    <View>
                      <Text style={isFuture ? { marginBottom: 5, fontFamily: 'Poppins_600SemiBold'} : {marginBottom: 5, fontFamily: 'Poppins_600SemiBold'}}>
                        {treatmentDate.format('DD/MM/YYYY - HH:mm')} :
                      </Text>
                      {treatment.actions.map((action, actionIndex) => (
                        <Text key={`${index}-${actionIndex}`} style={isFuture ? {fontFamily: 'Poppins_400Regular',} : {fontFamily: 'Poppins_400Regular',}}>
                          Action : {action}
                        </Text>
                      ))}
                    </View>
                  </Card.Content>
                </Card>
              );
            }
          })}
        </View>
      );
    };
    
    
      const handlePress = () => {
        setModalVisible(true);
      };
      
      const scrollViewContent = (
        <View style={styles.containerscroll}>
          {patient && (
        <>
          <Text style={styles.name}>{patient.firstname} {patient.name}</Text>
          <Text style={styles.dob}>{patient.yearOfBirthday}</Text>
          <View style={{flexDirection: 'row', alignItems: 'center', width: 290, marginRight: 40,}}>
            <Icon source={'home'} size={30}/>
            <View style={{flexDirection: 'column', alignItems: 'flex-start'}}>              
              <Text style={styles.address}>{patient.address} </Text>          
              <View><Text style={styles.addressplus}>{patient.infosAdress ? patient.infosAdress : "..."}</Text></View>
            </View>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center', width: 300}}>
            <Icon source={'phone'} size={27}/>
            <View style={{flexDirection: 'column', alignItems: 'flex-start'}}>
              <Text style={styles.mobile}>{patient.mobile ? patient.mobile : "Non renseigné"}</Text>
              <Text style={styles.homephone}>{patient.homePhone}</Text>
            </View>
          </View>
          <Text style={styles.pac}>Personne à contacter en cas d'urgence</Text>
          <Text style={styles.icei}>{patient.ICEIdentity ? patient.ICEIdentity : "Non renseigné"}</Text>
          <Text style={styles.icep}>{patient.ICEPhoneNumber}</Text>
          <TouchableOpacity style={styles.btnscroll} onPress={() => {
              navigation.navigate('ModificationPatientRecordScreen');
              setModalVisible(false);
            }}
            >
            <Text style={styles.btnmodify}>Modifier</Text>
          </TouchableOpacity>
        </>)}
        </View>
      );
      
      
      const ModalContent = (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centerView}>        
            <View style={styles.modalView}>
            <TouchableOpacity 
              onPress={() => {
                setModalVisible(false)
              }}
              style={styles.closemodal} 
              >
              <Icon source={'close-circle'} size={40}/>
            </TouchableOpacity>
              {scrollViewContent}
            </View>          
          </View>
        </Modal>
      );

  if (!patient) {
    return (<View />);
  } else {
    return (
      <>
          <SafeAreaView style={{ flex: 0, backgroundColor: '#99BD8F' }} />
          <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
              <View style={styles.container}>                           
                  <View style={styles.headcontent}>
                      <Text style={styles.title}>FICHE PATIENT</Text>
                  </View>
                  <Card style={styles.patientcontent}>
                    <Card.Content style={{height: 140, width: 352}}>
                      <ScrollView>
                        <TouchableOpacity onPress={handlePress}>
                          {scrollViewContent}
                        </TouchableOpacity>
                      </ScrollView>
                    </Card.Content>
                  </Card>
                  <View style={styles.content}> 
                  <View style={styles.buttoncontain}>
                  {buttons.map((button, index) => (
                      <TouchableOpacity
                        key={`${index}-${refresh}`}
                        onPress={() => {
                          handleButtonPress(index);
                          setDisponibility(patient.disponibility);
                        }}
                        style={[
                          styles.button,
                          index === selectedIndex ? styles.selected : null,
                          { backgroundColor: buttonColors[index] }
                        ]}
                      >
                        <Text style={styles.text}>{button}</Text>
                      </TouchableOpacity>
                    ))}
                    
                  </View> 
                  <View style={styles.journalContainer}>
                    <View style={{justifyContent: 'center', alignItems: 'center', marginBottom: 10,}}>
                      <Text style={styles.journalTitle}>Journal des soins</Text>
                    </View>
                    <View style={styles.journalContent}>
                      <ScrollView>
                        <View>
                        <TreatmentList />
                        </View>
                      </ScrollView>
                    </View>
                    <View>
                      <TouchableOpacity style={styles.journalBtn}>
                        <Text style={styles.textBtn}>Ajouter un consultation</Text>
                      </TouchableOpacity>
                    </View>
                  </View>                              
                  </View>
                  
              </View>{ModalContent}
          </SafeAreaView>
      </>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',

  },
  title: {
    color: '#99BD8F',
    fontFamily: 'Poppins_600SemiBold', 
    fontSize: 30,
    marginTop: 20,
    marginBottom: 20,
 },

 patientcontent: {
  marginBottom: 20,
  backgroundColor: '#99BD8F',

 },
 name: {
  fontFamily: 'Poppins_600SemiBold', 
  fontSize: 20,
  marginBottom: 5,
 },
 dob: {
  fontFamily: 'Poppins_400Regular', 
  fontSize: 15,
  marginBottom: 10,
 },

 icone: {
  alignItems: 'center',
  flexDirection: 'row',
  justifyContent: 'space-around',
  width: '100%',
},
address: {
  fontFamily: 'Poppins_400Regular', 
  fontSize: 15,
  marginTop: 10,
  width: 300,
},
addressplus: {
  fontFamily: 'Poppins_400Regular', 
  fontSize: 15,
  marginBottom: 10,
},
pac: {
  fontFamily: 'Poppins_600SemiBold', 
  fontSize: 15,
  marginBottom: 5,
},
icei: {
  fontFamily: 'Poppins_400Regular', 
  fontSize: 15,
},
icep: {
  fontFamily: 'Poppins_400Regular', 
  fontSize: 15,
},
mobile: {
  fontFamily: 'Poppins_400Regular', 
  fontSize: 15,
  marginTop: 12,
  
},
homephone: {
marginBottom: 10,
},
containerscroll: {
  width: 320,
  alignItems: 'center',
  justifyContent: 'center',
},
centerView: {
  justifyContent: "center",
  alignItems: "center",
  marginTop: 100,
},
closemodal: {
  position: 'absolute',
  top: 390,  
},

modalView: {
 
  margin: 20,
  height: 450,
  width: 350,
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
textStyle: {
  color: "white",
  fontWeight: "bold",
  textAlign: "center"
},
modalText: {
  marginBottom: 15,
  textAlign: "center"
},
buttoncontain: {
  flexDirection: 'row',
  borderRadius: 5,
  borderWidth: 1,
  borderColor: '#99BD8F',
  overflow: 'hidden',
},
button: {
  flexDirection: 'column',
  padding: 10,
  justifyContent: 'center',
  alignItems: 'center',
  width: 178,
},
selected: {
  backgroundColor: '#99BD8F',
},
btnscroll: {
  backgroundColor: '#CADDC5',
  marginTop: 20,
  width: 300,
  alignItems: 'center',
  justifyContent: 'center',
  height: 40,
  borderRadius: 10,
},
btnmodify: {
  fontFamily: 'Poppins_600SemiBold', 
  fontSize: 17,
},

text: {
  color: '#000',
  fontSize: 16,
},
journalTitle: {
  fontFamily: 'Poppins_400Regular',
  color: '#99BD8F',
  fontSize: 20,
  marginTop: 15,
},
journalContent: {
  backgroundColor: '#F0F0F0',
  height: 260,
  width: 360,
  borderRadius: 10,
},
journalBtn: {
  backgroundColor: '#99BD8F',
  width: 360,
  height: 50,
  borderRadius: 10,
  marginTop: 20,
  marginBottom: 10,
  justifyContent: 'center',
  alignItems: 'center',
},
textBtn: {
  fontFamily: 'Poppins_600SemiBold', 
  fontSize: 17,
},
treatmentAffichage: {
  marginTop: 10,
  marginLeft: 10,
  marginRight: 10,
  alignItems: 'center',
},

});
