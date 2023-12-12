import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useFonts, Poppins_400Regular } from '@expo-google-fonts/poppins';

export default function Dropdown({navigation}) {
  const [isVisible, setIsVisible] = useState(false);
  const [iconColor, setIconColor] = useState('#99BD8F');

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
    setIconColor(isVisible ? '#99BD8F' : '#F1FFEE');
  };

  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
  });

  if (!fontsLoaded) {
    return <View />;
  } else {
    return (
    <View style={styles.container}>
        <View style={[styles.dropdown, {backgroundColor: isVisible ? '#99BD8F' : 'transparent'}]}>
        <TouchableOpacity style={styles.bars} onPress={toggleVisibility}>
            <FontAwesome name={'bars'} size={35} color={iconColor} />
        </TouchableOpacity>

        {isVisible && (
            <ScrollView style={styles.scrollView}>
                <View>
                    <Text style={styles.text} onPress={() => navigation.navigate('MyAccountScreen')}>Mon compte</Text>
                    <Text style={styles.text} onPress={() => navigation.navigate('ManagementScreen')}>Gérer mon cabinet</Text>
                    <Text style={styles.text} onPress={() => navigation.navigate('JoinScreen')}>Rejoindre un cabinet</Text>
                    <Text style={styles.text} onPress={() => navigation.navigate('RessourcesScreen')}>Ressources</Text>
                    <Text style={styles.textDeco}>Déconnexion</Text>
                </View>
            </ScrollView>
        )}
        </View>
    </View>
  );
}
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
 
      },
    dropdown: {
        flex: 1,
        width: '70%', 
        height: '100%', 
        borderTopRightRadius: 7, 
        borderBottomRightRadius: 7, 
    },
    scrollView: { 
       
    },
    listItem: {
        padding: 10,
        marginBottom: 7,
        backgroundColor: '#F7F7F7',
        color: '#333',
        
    },
    text: {
        marginTop: 25,  
        color: '#F1FFEE', 
        marginLeft: 10,
        fontSize: 17,
        fontFamily: 'Poppins_400Regular', 
    },
    textDeco: { 
        color: '#F1FFEE',
        marginBottom: 15,
        marginLeft: 10,
        marginTop: '150%', 
        fontSize: 17, 
        fontFamily: 'Poppins_400Regular', 
    },
    bars: {
        marginTop: 10,
        marginLeft: 10,
    }
});

