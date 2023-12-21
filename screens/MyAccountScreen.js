import { Button, SafeAreaView, Image, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View, KeyboardAvoidingView, ScrollView, StatusBar, Keyboard } from 'react-native';
import { useFonts, Poppins_400Regular, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useSelector } from 'react-redux';
import { Icon } from 'react-native-paper';

export default function MyAccountScreen(navigation) {

  const user = useSelector((state) => state.users.value);

  // Traitement des données du patient :
  const userInfo = () => {
    let username = `${user.username}`;
    return (
        <View>
          <Text style={styles.userName}>{username}</Text>
        </View>
    );
  };
    
  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
  });
  
  if (!fontsLoaded) {
    return <View />;
  } else {
    return (
        <>
    <SafeAreaView style={{flex: 0, backgroundColor: '#99BD8F'}} />
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <StatusBar barStyle="light-content"/>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
              <ScrollView contentContainerStyle={styles.scrollView}>
                <View style={styles.chevron}> 
                    <TouchableOpacity onPress={() => {navigation.navigate('TabNavigator')}}>
                        <FontAwesome name={'chevron-left'} size={30} color='#99BD8F' marginTop={20} />
                    </TouchableOpacity>
                </View>
                <View style={styles.container}>
                  <Text style={styles.titlePage}>Mon Compte</Text>
                </View>
                <View style={styles.userContainer}>
                  <Icon source={'account-box'} size={100} color={'#99BD8F'}/>
                    {userInfo()}
                </View>
                <View style={styles.infoContainer}> 
                  <View style={styles.line}>
                    <Text style={styles.userInfo} >Nom</Text>
                    <FontAwesome name={'chevron-right'} size={20} color='#99BD8F' />
                  </View>
                  <View style={styles.line}>
                    <Text style={styles.userInfo} >Mot de passe</Text>
                    <FontAwesome name={'chevron-right'} size={20} color='#99BD8F' />
                  </View>
                  <View style={styles.line}>
                    <Text style={styles.userInfo} >Adresse mail</Text>
                    <FontAwesome name={'chevron-right'} size={20} color='#99BD8F' />
                  </View>
                  <View style={styles.line}>
                    <Text style={styles.userInfo} >Numéro de téléphone</Text>
                    <FontAwesome name={'chevron-right'} size={20} color='#99BD8F' />
                  </View>
                  <View style={styles.line}>
                    <Text style={styles.userInfo} >Photo de profil</Text>
                    <FontAwesome name={'chevron-right'} size={20} color='#99BD8F' />
                  </View>
                </View>
              </ScrollView>
            </KeyboardAvoidingView>
          </TouchableWithoutFeedback>
      </SafeAreaView>
        </>
      );
    }
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 35, 
    marginBottom: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    /* borderColor: 'red',
    borderWidth: 4, */
  },
  scrollView: {
    flexGrow: 1,
    //justifyContent: 'flex-start',
    //alignItems: 'flex-start',
    //width: '100%',
    /* borderColor: 'red',
    borderWidth: 4, */
  },
  chevron: {
    //flexDirection: 'row',
    alignSelf: 'flex-start',
    marginLeft: 20,
    /* borderColor: 'red',
    borderWidth: 4, */
    width: '80%',
 },
  titlePage: {
    marginBottom: 5,
    color: '#99BD8F',
    fontSize: 30,
    fontFamily: 'Poppins_600SemiBold',
},
  userContainer: {
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  userName: {
    color: '#99BD8F',
    fontSize: 25,
    fontFamily: 'Poppins_400Regular',
    fontWeight: '400',
  },
  infoContainer: {
    backgroundColor: '#F0F0F0',
    /* borderColor: 'red',
    borderWidth: 4, */
    height: '100%',
  },
  line: {
    paddingLeft: 10,
    paddingRight: 20,
    paddingTop: 5,
    paddingBottom: 5,
    borderBottomWidth: 2,
    borderBottomColor: '#99BD8F',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  userInfo: {
    color: '#99BD8F',
    fontSize: 18,
    fontFamily: 'Poppins_400Regular',
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