import { Button, StyleSheet, Text, View, TouchableWithoutFeedback, KeyboardAvoidingView, ScrollView, Keyboard, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import { useFonts, Poppins_400Regular, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import React, { useState, useEffect } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useSelector } from 'react-redux';

export default function MenuScreen({ navigation, route }) {

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

    let [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Poppins_600SemiBold,
      });
  
 
      if (!fontsLoaded) {
        return <View />;
      } else {

        return (
            <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
                <StatusBar barStyle="light-content"/>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                            <ScrollView >
                                <View style={styles.chevron}> 
                                    <TouchableOpacity onPress={() => {navigation.navigate('TabNavigator')}}>
                                        <FontAwesome name={'chevron-left'} size={30} color='white' />
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.titleContainer}>
                                    <FontAwesome name='bars' size={32} color='white'/>
                                    <Text style={styles.titlePage}>  MENU</Text>
                                </View>
                                <View style={styles.menuContainer}>
                                    <View>
                                        <TouchableOpacity onPress={() => toMyAccount()}>
                                            <Text style={styles.choiceText} >Mon compte</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View>
                                        <TouchableOpacity onPress={() => toMyFirm()}>
                                            <Text style={styles.choiceText}>Gérer mon cabinet</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View>
                                        <TouchableOpacity /* onPress={() => toJoinATeam()} */>
                                            <Text style={styles.choiceText}>Rejoindre une équipe</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View>
                                        <TouchableOpacity onPress={() => toResources()}>
                                            <Text style={styles.choiceText}>Ressources</Text>
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
    chevron: {
        alignContent: 'flex-start',
        marginTop: 40,
        marginBottom: 40,
        paddingLeft: 20,
        /* borderColor: 'red',
        borderWidth: 4, */
     },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'baseline',
        //borderColor: 'red',
        //borderWidth: 4,
        //padding: 15,
    },
    titlePage: {
        marginBottom: 20,
        color: 'white',
        fontSize: 30,
        fontFamily: 'Poppins_600SemiBold',
    },
   /*  text: {
        color: 'white',
        fontSize: 20,
        fontWeight: '400',
    }, */
    menuContainer: {
        /* borderColor: 'red',
        borderWidth: 4, */
        paddingLeft: 40,
    },
    choiceText: {
        /* borderColor: 'red',
        borderWidth: 4, */
        color: 'white',
        fontSize: 20,
        marginTop: 20,
        marginBottom: 20,
    },
});