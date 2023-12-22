import { Button, AppRegistry, SafeAreaView, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useFonts, Poppins_400Regular } from '@expo-google-fonts/poppins';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import LottieView from 'lottie-react-native';
import React, { useRef, useEffect } from 'react';

AppRegistry.registerComponent('X', () => App);

export default function ConnectionScreen({ navigation }) {
  const animationRef = useRef(null);

  useEffect(() => {
    
    animationRef.current?.play();
  }, []);

    let [fontsLoaded] = useFonts({
        Poppins_400Regular,
      });
    
      if (!fontsLoaded) {
        return <View />;
      } else {
        return (
          <>
      <SafeAreaView style={{flex: 0, backgroundColor: '#99BD8F'}} />
        <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
            <KeyboardAwareScrollView contentContainerStyle={styles.scrollView} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} enableOnAndroid={true}>
                <View style={styles.container}>
                  <View style={styles.anime}>
                      <Image
                          style={styles.image}
                          source={require('../assets/logo.png')}
                      />
                  </View>
                  <View style={styles.car}>
                  <LottieView ref={animationRef} style={{width: 100, flex: 1 }} source={require('../assets/car.json')} autoPlay loop />
                  </View>
                  <View style={styles.contentButton}>
                      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SignUpScreen')}>
                          <Text style={styles.text}>Créer un compte</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SignInScreen')}>
                          <Text style={styles.text}>Se connecter</Text>
                      </TouchableOpacity>
                  </View>                 
                </View>
              </KeyboardAwareScrollView>
            </SafeAreaView>
          </>
        );
      }
    }

const styles = StyleSheet.create({
 container: {
   flex: 1,
   backgroundColor: '#fff',
   justifyContent: 'space-between',
   alignItems: 'center',
 },
 image : {
    width: 450, 
    height: 450,
    marginRight: 20,
 },
 contentButton: {
  marginTop: 20,
  marginBottom: 20,
 },
 anime: {
  marginTop: 0,
 },
 button : {
    backgroundColor: '#99BD8F',
    width: 300,
    height: 50,
    borderRadius: 10,
    marginTop: 25,
    justifyContent: 'center',
    alignItems: 'center',
 },
 text: {
    fontSize: 17,
    fontFamily: 'Poppins_400Regular', 
 },
car: {
  width: 100, 
  height: 100,
}
});