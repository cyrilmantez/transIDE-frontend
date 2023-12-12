import { Button, StyleSheet, Text, View, SafeAreaView  } from 'react-native';
import { useFonts, Poppins_400Regular, Poppins_600SemiBold } from '@expo-google-fonts/poppins';

export default function PatientScreen() {
    const [isDisponible, setIsDisponible] = useState(true)

    const changeDispo = () =>{
        setIsDisponible(!isDisponible)
    }

 return (
   <SafeAreaView  style={styles.container}>
        <View styles={styles.titleContainer}>
            <Text style={styles.titlePage}>Fiche Patient</Text>
        </View>
        <View>
            <Text style={styles.name}></Text>
            <View>
                <View style={styles.name}></View>
                <View> style={styles.name}</View>
            </View>
            <View></View>
        </View>
        <View>
        <Text style={styles.titleHistorique}>Historique des soins</Text>
        </View>
        <View>
        <TouchableOpacity  style={styles.button} onPress={()=>changeDispo()}>  
            <Text style={styles.text}>AJOUTER UNE CONSULTATION</Text>            
            </TouchableOpacity>
        </View>
        <View>
            <Text>Prochains RDV:</Text>
            <Text></Text>
        </View>
        <View>
            <TouchableOpacity  style={styles.button} onPress={}>  
            <Text style={styles.text}>AJOUTER UNE CONSULTATION</Text>            
            </TouchableOpacity>
        </View>
   </SafeAreaView >
 );
}

const styles = StyleSheet.create({
 container: {
   flex: 1,
   backgroundColor: '#fff',
   alignItems: 'center',
   justifyContent: 'center',
 },
titlePage: {
    color: '#99BD8F',
    fontSize: 30,
    marginBottom: 50,
    fontFamily: 'Poppins_600SemiBold',
},
titleHistorique: {
    color: '#99BD8F',
    fontSize: 30,
    marginBottom: 50,
    fontFamily: 'Poppins_400Regular',
},
text:{
    fontSize: 17,
    fontFamily: 'Poppins_400Regular', 
},
button : {
    backgroundColor: '#99BD8F',
    width: 350,
    height: 50,
    borderRadius: 10,
    marginTop: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
});