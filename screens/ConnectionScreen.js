import { Button, SafeAreaView, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useFonts, Poppins_400Regular } from '@expo-google-fonts/poppins';

export default function ConnectionScreen({ navigation }) {
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
            <View style={styles.container}>
              <View>
                  <Image
                      style={styles.image}
                      source={require('../assets/logo.png')}
                  />
              </View>
              <View style={styles.contentButton}>
                  <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SignUpScreen')}>
                      <Text style={styles.text}>Créer un compte</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SignInScreen')}>
                      <Text style={styles.text}>Se connecter</Text>
                  </TouchableOpacity>
              </View>
              <Button
                title="Lien temporaire"
                onPress={() => navigation.navigate('TabNavigator')}
              />

              <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('PatientScreen')}>
                      <Text style={styles.text}>Lien temporaire vers la fiche patient</Text>
              </TouchableOpacity>
              {/* <Button
                title="Lien temporaire vers la fiche patient"
                onPress={() => navigation.navigate('PatientScreen')}
              /> */}
              <Button
                title="Lien temporaire vers la fiche consultation"
                onPress={() => navigation.navigate('ConsultationScreen')}
              />
            </View>
            </SafeAreaView>
          </>
        );
      }
    }

const styles = StyleSheet.create({
 container: {
   flex: 1,
   backgroundColor: '#fff',
   alignItems: 'center',
   justifyContent: 'center',
 },
 image : {
    width: 450, 
    height: 450,
    marginRight: 20,
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
 }
});