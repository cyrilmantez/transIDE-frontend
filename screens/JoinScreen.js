import { Button, SafeAreaView, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useFonts, Poppins_400Regular } from '@expo-google-fonts/poppins';

export default function JoinScreen() {
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
                <Text>Rejoindre un cabinet</Text>
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