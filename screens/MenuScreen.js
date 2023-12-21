import { Button, StyleSheet, Text, View, TouchableWithoutFeedback, KeyboardAvoidingView, ScrollView, Keyboard, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import { useFonts, Poppins_400Regular, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import React, { useState, useEffect } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useSelector } from 'react-redux';
import { Icon } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { logout } from '../reducers/users';

export default function MenuScreen({ navigation, route }) {
    const dispatch = useDispatch();

    const user = useSelector((state) => state.users.value);
    const officeToken = useSelector((state) => state.users.value.officesTokens[0].token);

    // Accès à MyAccountScreen (vérifier si les paramètres envoyés sont suffisants et bien récupérés) :
    const toMyAccount = () => {
        navigation.navigate('Mon compte', {
            username : user.username,
            officeToken: user.officesTokens[0].token,
            officeName: user.officesTokens[0].name,
            isByDefault: user.officesTokens[0].isByDefault
        })
    };

    const toMyFirm = () => {
        navigation.navigate('ManagementScreen', {
            username : user.username,
            officeToken: user.officesTokens[0].token,
            officeName: user.officesTokens[0].name,
            isByDefault: user.officesTokens[0].isByDefault
        })
    };
    
    /* const toJoinATeam = () => {
        navigation.navigate('XXX', {
            username : user.username,
            officeToken: user.officesTokens[0].token,
            officeName: user.officesTokens[0].name,
            isByDefault: user.officesTokens[0].isByDefault
        })
    }; */

    const toResources = () => {
        navigation.navigate('RessourcesScreen', {
            username : user.username,
            officeToken: user.officesTokens[0].token,
            officeName: user.officesTokens[0].name,
            isByDefault: user.officesTokens[0].isByDefault
        })
    };
    // Déconnexion
    const handlelogout = () => {
        dispatch(logout());
        navigation.navigate('SignInScreen');
    }
    let [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Poppins_600SemiBold,
      });
  
 
      if (!fontsLoaded) {
        return <View />;
      } else {

        return (
            <SafeAreaView style={{flex: 1, backgroundColor: '#99BD8F'}}>
                <StatusBar barStyle="light-content"/>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                            <ScrollView >
                                <View style={styles.bars}> 
                                    <TouchableOpacity onPress={() => {navigation.navigate('TabNavigator')}}>
                                        <FontAwesome name='bars' size={32} color='white'/>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.titleContainer}>                                    
                                    <Text style={styles.titlePage}>  MENU</Text>
                                </View>
                                <View style={styles.menuContainer}>
                                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                        <Icon source={'account'} size={30} color={'white'}/>
                                        <TouchableOpacity onPress={() => toMyAccount()}>                                            
                                            <Text style={styles.choiceText} > Mon compte</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                        <Icon source={'account-group'} size={30} color={'white'}/>
                                        <TouchableOpacity onPress={() => toMyFirm()}>
                                            
                                            <Text style={styles.choiceText}> Gérer mon cabinet</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                        <Icon source={'account-multiple-plus'} size={30} color={'white'}/>      
                                        <TouchableOpacity onPress={() => navigation.navigate('MyPatientsScreen') } >                                            
                                            <Text style={styles.choiceText}> Mes patients</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                        <Icon source={'book-open-variant'} size={30} color={'white'}/>
                                        <TouchableOpacity onPress={() => toResources()}>
                                            <Text style={styles.choiceText}> Ressources</Text>
                                        </TouchableOpacity>
                                    </View>
                                        <View style={{flexDirection: 'row', alignItems: 'center', top: 320}}>
                                            <Icon source={'logout'} size={30} color={'white'}/>  
                                            <TouchableOpacity onPress={() => {handlelogout()}}>
                                                <Text style={styles.choiceText}> Deconnexion</Text>
                                            </TouchableOpacity>
                                        </View>
                                </View>
                            </ScrollView>
                        </KeyboardAvoidingView>
                    </TouchableWithoutFeedback>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#99BD8F',
        justifyContent: 'center',
        //alignItems: 'center',
    },
    bars: {
        alignContent: 'flex-start',
        marginTop: 10,
        marginLeft: 10,
     },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'baseline',
        marginRight: 10
    },
    titlePage: {
        marginBottom: 20,
        color: 'white',
        fontSize: 30,
        fontFamily: 'Poppins_600SemiBold',
    },
    menuContainer: {
        marginLeft: 10,
        height: 650,
    },
    choiceText: {
        color: 'white',
        fontSize: 20,
        marginTop: 20,
        marginBottom: 20,
    },
});