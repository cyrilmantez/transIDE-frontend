import {  ScrollView, Modal, KeyboardAvoidingView, SafeAreaView, Image, StyleSheet, Text, TouchableOpacity, View, Platform, Clipboard, ToastAndroid} from 'react-native';
import { useFonts, Poppins_400Regular, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import { TextInput, List, Icon} from 'react-native-paper';
import React,{ useEffect, useState } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { useDispatch, useSelector } from 'react-redux';
import { upDateOfficeByDefault } from '../reducers/users';
import { useFocusEffect } from '@react-navigation/native';



export default function ManagementScreen({navigation}) {
    const offices = useSelector((state) => state.users.value.officesTokens);
    const user = useSelector((state) => state.users.value);
    const dispatch = useDispatch();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [joinOffice, setJoinOffice] = useState(false);
    const [newOffice, setNewOffice] = useState('');
    const [allIDE, setAllIDE] = useState([]);
   

    const officesToDisplay = offices.map((office, index) => {
      let iconColor;
      if(office.isByDefault){
        iconColor = '#99BD8F';
      }else{
        iconColor = 'white';
      }
      return  <View style={styles.officeContent} key={index}>
                  <View style={styles.officeTextContent}>
                    <TouchableOpacity onLongPress={() => handleTextLongPress(office.name)}>
                       <Text style={styles.officeName}>{office.name}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onLongPress={() => handleTextLongPress(office.token)}>
                      <Text style={styles.officeCode}>{office.token}</Text>
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity onPress={() => selectByDefault(index)}>
                    <Icon source={'checkbox-blank-circle'} size={24} color={iconColor} />
                  </TouchableOpacity>
              </View>
    })
    
  
    useFocusEffect(
      React.useCallback(() => {
      const tokens = offices;
      const tokenByDefault = tokens.filter(e => e.isByDefault === true)
      console.log(tokenByDefault[0].token)
      fetch('http://192.168.0.25:3000/users/usersByOffice', {
        method: 'PUT',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({
          token:  tokenByDefault[0].token ,
        })
      }).then(response => response.json())
      .then(data => {
        console.log(data.nurses)
        if(data.result){
          setAllIDE(data.nurses)
        }else{
          console.log(data)
        }
      })
    },[])
    )



    const selectByDefault = (index) => {
      const newOfficesTokens = offices.map(element => ({
        ...element,
        isByDefault: false,
      }));
      newOfficesTokens[index].isByDefault = true;
      dispatch(upDateOfficeByDefault(newOfficesTokens));
      
      const officeByDefault = newOfficesTokens[index].token;
      fetch('http://192.168.1.162:3000/users/newOfficesToken', {
        method: 'PUT',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({
          token:  user.token ,
          officesTokens: newOfficesTokens,
          officeByDefault : officeByDefault,
        })
      }).then(response => response.json())
        .then(data => {
         
          if(data.result){
            setModalMessage('Nouveau cabinet par default');
            setAllIDE(data.allIDE)
          }else{
            setModalMessage('Error')
          }
          setIsModalVisible(true);
        })

    }
    //Close Modal
  const closeModal = () => {
    setIsModalVisible(false);
    setModalMessage('');
 }

 
 const addNewOffice = () => {
  const isAllReadyExist = offices.filter(e => e.token === newOffice);
  if(isAllReadyExist.length>0){
    setModalMessage('Tu appartiens déjà à ce cabinet !');
    setIsModalVisible(true);
  }else{
    fetch('http://192.168.1.162:3000/users/newOffice', {
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({
          officeToken:  newOffice,
          token : user.token,
        })
      }).then(response => response.json())
  .then(data => {
    if(data.result){
      setJoinOffice(false)
      setModalMessage('Cabinet ajouté');
   
      const newOfficesTokens = [...offices, data.newOffice];
   
      dispatch(upDateOfficeByDefault(newOfficesTokens));
      setNewOffice('');
      setIsModalVisible(true);
    }else{
      setModalMessage('Error: cabinet non trouvé');
      setIsModalVisible(true);
    }
  })
  
  }
 }

 const handleTextLongPress = async (text) => {
  try {
    await Clipboard.setString(text);
    ToastAndroid.show('Texte copié dans le presse-papiers', ToastAndroid.SHORT);
  } catch (error) {
    console.error('Erreur lors de la copie du texte :', error);
  }
};
console.log('allIDE :',allIDE)
const ideToDisplay = allIDE.map((nurse, index) => {
  return  <View style={styles.nurse} key={index}>
              <Text style={styles.nurseName}>{nurse.username}</Text>
        </View>
})


        return (
    <>
        <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
          <View style={{ flexGrow: 1 }}>
            <View style={styles.header}>
                  <FontAwesome name={'chevron-left'} size={24} color='#99BD8F' marginTop={20} marginLeft={15} onPress={() => navigation.navigate('TabNavigator')} />
            </View>
            <ScrollView>
            <View style={styles.content}>
                <Text style={styles.title} >Mon Cabinet</Text>
                <View style={styles.officesList}>
                   {officesToDisplay}
                </View>
                 
               {!joinOffice && <TouchableOpacity style={styles.newOfficeButton} onPress={() => setJoinOffice(true)}>
                      <Text style={styles.textButton} >Rejoindre un cabinet</Text>
                </TouchableOpacity>}
                {joinOffice &&<View style={styles.newOfficeContent}>
                        <TextInput style={styles.newOfficeInput}
                                                  label='Code du nouveau cabinet' 
                                                  mode='outlined'
                                                  theme={{ 
                                                    colors: { 
                                                      primary: '#99BD8F', 
                                                    }
                                              }}
                                                onChangeText={text => setNewOffice(text)} 
                                                value={newOffice}/>
                        <View style={styles.buttonContainer}>
                              <TouchableOpacity style={styles.joinButton} onPress={() => addNewOffice()} >
                                      <Text style={styles.modalButtonText}>Rejoindre</Text>
                              </TouchableOpacity>
                              <TouchableOpacity style={styles.skipButton} onPress={() => {setJoinOffice(false), setNewOffice('')}}>
                                      <Text style={styles.modalButtonText}>Annuler</Text>
                              </TouchableOpacity>
                        </View>            
                  </View>}
                  <Text style={styles.subTitle} >Collaborateurs</Text>
                  {ideToDisplay}
            </View>
            </ScrollView>
               
            <Modal transparent visible={isModalVisible} onRequestClose={closeModal}>
                        <View style={styles.modalContainer}>
                          <View style={styles.modalContent}>
                              <Text style={styles.modalText}>{modalMessage}</Text>
                              <TouchableOpacity style={styles.closeButton} onPress={() => closeModal()}>
                                <Text style={styles.modalButtonText}>Fermer</Text>
                              </TouchableOpacity>
                          </View>
                        </View>
                  </Modal>
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
      dropdown: {
       top: 0,
       left: 0,
       },
     header: {
       height: '10%',
       width : '100%',
       justifyContent: 'space-between',
       flexDirection: 'row',
     },
     content : {
        flexGrow: 1,
        width: '100%',
        alignItems: 'center',
     },
     title: {
       color: '#99BD8F',
       fontSize: 30,
       fontFamily: 'Poppins_600SemiBold',
      },
      officesList:{
        width: '100%',
        marginTop: 50,
        alignItems: 'center',
      },
      officeContent:{
        width:'90%',
        display: 'flex',
        flexDirection:'row',
        justifyContent: 'space-around',
        alignItems:'center',
        borderRadius: 10,
        backgroundColor: '#F0F0F0',
        marginTop: 10,
      },
      officeTextContent:{
        width:'85%',
        display: 'flex',
        justifyContent: 'center',
      },
      officeName : {
        color: 'black',
        fontSize: 14,
        fontFamily: 'Poppins_600SemiBold',
        marginLeft: 10,
        paddingTop: 5,
      },
      officeCode : {
        color: 'black',
        fontSize: 12,
        fontFamily: 'Poppins_600SemiBold',
        marginLeft: 10,
       
      },
      textButton:{
        color: 'white',
        fontSize: 15,
        fontFamily: 'Poppins_600SemiBold',
      },
      newOfficeContent:{
        marginTop: 50,
        width: '90%',
        height: 200,
        backgroundColor:'#F0F0F0',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderRadius : 10,
      },
      newOfficeInput:{
        width : 250,
        fontSize: 15,
      },
      buttonContainer:{
        diplay: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: 250,
      },
      skipButton :{
        width: 100,
        borderRadius: 10,
        borderColor: 'white',
        borderWidth: 1,
        display:'flex',
        justifyContent: 'center',
        alignContent: 'center',
        height: 40,
        backgroundColor:'#99BD8F',
      },
      joinButton:{
        width: 100,
        borderRadius: 10,
        borderColor: 'white',
        borderWidth: 1,
        display:'flex',
        justifyContent: 'center',
        alignContent: 'center',
        height: 40,
        backgroundColor:'#99BD8F',
      },
      newOfficeButton : {
        marginTop: 60,
        backgroundColor: '#99BD8F',
        width: '90%',
        height: 50,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
      },
      subTitle :{
        color: '#99BD8F',
        fontSize: 20,
        fontFamily: 'Poppins_600SemiBold',
        marginTop: 70,
      },
      nurse :{
        width:'90%',
        display: 'flex',
        alignItems:'flex-start',
        borderRadius: 10,
        backgroundColor: '#F0F0F0',
        marginTop: 10, 
      },
      nurseName:{
        color: 'black',
        fontSize: 14,
        fontFamily: 'Poppins_600SemiBold',
        marginLeft: 20,
        paddingTop: 5,
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
        height: 150,
        width: 250,
        display:'flex',
        justifyContent: 'space-between',
        alignContent: 'center',
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
        fontSize: 15,
       },
       modalText:{
        textAlign: 'center',
        marginTop: 20,
       }

     });