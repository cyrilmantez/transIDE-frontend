import { Button, StyleSheet, Text, View, TouchableWithoutFeedback, KeyboardAvoidingView, ScrollView, Keyboard, TouchableOpacity, SafeAreaView, Modal, TextInput } from 'react-native';
import { useFonts, Poppins_400Regular, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import React, { useState, useEffect } from 'react';
import moment from 'moment'; 
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useSelector } from 'react-redux';

export default function MenuScreen({ navigation, route }) {

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                    <ScrollView contentContainerStyle={styles.scrollView}>
                    <View style={styles.chevron}> 
                        <TouchableOpacity onPress={() => {navigation.navigate('TabNavigator')}}>
                            <FontAwesome name={'chevron-left'} size={30} color='white' />
                        </TouchableOpacity>
                    </View>
                    <View styles={styles.titleContainer}>
                        <Text style={styles.titlePage}>MENU</Text>
                    </View>
                    <View>
                        
                    </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#99BD8F',
        //justifyContent: 'center',
        //alignItems: 'center',
    },
    scrollView: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    chevron: {
        alignSelf: 'flex-start',
        marginLeft: 20,
     },
    titleContainer: {

        fontFamily: 'Poppins_600SemiBold',
    },
    titlePage: {
        color: 'white',
        fontSize: 30,
        fontFamily: 'Poppins_600SemiBold',
        justifyContent: 'flex-start',
        textAlign: 'center',
    },
    text: {
        color: 'white',
        fontSize: 20,
        fontWeight: '400',
    },  
});