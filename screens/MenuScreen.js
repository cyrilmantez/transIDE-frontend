import { Button, StyleSheet, Text, View, TouchableWithoutFeedback, KeyboardAvoidingView, ScrollView, Keyboard, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import { useFonts, Poppins_400Regular, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import React, { useState, useEffect } from 'react';
import moment from 'moment'; 
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useSelector } from 'react-redux';

export default function MenuScreen({ navigation, route }) {

    let [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Poppins_600SemiBold
      });
    
      if (!fontsLoaded) {
        return <View />;
      } else {

        return (
            <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
                <StatusBar barStyle="light-content"/>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                            <View>
                                <ScrollView contentContainerStyle={styles.scrollView}>
                                    <View>
                                        <View style={styles.chevron}> 
                                            <TouchableOpacity onPress={() => {navigation.navigate('TabNavigator')}}>
                                                <FontAwesome name={'chevron-left'} size={30} color='white' />
                                            </TouchableOpacity>
                                        </View>
                                        <View styles={{}}>
                                            <FontAwesome name='bars' size={32} color='white'/>
                                            <Text style={styles.titlePage}>  MENU</Text>
                                        </View>
                                        <View style={styles.menuContainer}>
                                            <View>
                                                <Text style={styles.choiceText}>Mon compte</Text>
                                            </View>
                                            <View>
                                                <Text style={styles.choiceText}>Gérer mon cabinet</Text>
                                            </View>
                                            <View>
                                                <Text style={styles.choiceText}>Rejoindre une équipe</Text>
                                            </View>
                                            <View>
                                                <Text style={styles.choiceText}>Ressources</Text>
                                            </View>
                                        </View>
                                    </View>
                                </ScrollView>
                            </View>
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
        //alignItems: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    scrollView: {
        
               
    },
    chevron: {
        alignSelf: 'flex-start',
        marginLeft: 20,
        marginBottom: 40,
     },
    titleContainer: {
        //flexDirection: 'row',
        //justifyContent: 'space-between',
        width: 300,
        height: 300,
        borderColor: 'red',
        borderWidth: 4,
        //fontFamily: 'Poppins_600SemiBold',
    },
    titlePage: {
        //flexDirection: 'row',
        width: '100%',
        marginBottom: 20,
        color: 'white',
        fontSize: 30,
        fontFamily: 'Poppins_600SemiBold',
        textAlign: 'center',
    },
    text: {

        color: 'white',
        fontSize: 20,
        fontWeight: '400',
    },
    menuContainer: {
        //flex: 2,
        width: '80%',
        alignItems: 'flex-start',
    },
    choiceText: {
        color: 'white',
        fontSize: 18,
        marginTop: 20,
    },
});