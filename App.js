import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import TourScreen from './screens/TourScreen';
import TransmissionScreen from './screens/TransmissionScreen';
import ConnectionScreen from './screens/ConnectionScreen';
import SignUpScreen from './screens/SignUpScreen';
import SignInScreen from './screens/SignInScreen';
import MyAccountScreen from './screens/MyAccountScreen';
import {combineReducers} from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import {configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import users from './reducers/users';
import patients from './reducers/patients';
import transmissions from './reducers/transmissions';
import ManagementScreen from './screens/ManagementScreen';
import JoinScreen from './screens/JoinScreen';
import RessourcesScreen from './screens/RessourcesScreen';
import PatientScreen from './screens/PatientScreen';
import ConsultationScreen from './screens/ConsultationScreen';
import AddPatientScreen from './screens/AddPatientScreen';
import AddTransmissionScreen from './screens/AddTransmissionScreen';
import ModificationPatientRecordScreen from './screens/ModificationPatientRecordScreen';
import AddConsultationScreen from './screens/AddConsultationScreen';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';

const reducers = combineReducers({users, patients, transmissions});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['users'],
}

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
 });

export const persistor = persistStore(store);

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Fermer le tiroir"
        onPress={() => props.navigation.closeDrawer()}
      />
    </DrawerContentScrollView>
  );
}

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator 
      initialRouteName="Tournée"
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerIcon: ({focused, size}) => (
          <FontAwesome  name={'map-pin'} size={24} color='#99BD8F' />
        ),
      }}
    > 
      <Drawer.Screen name="Tournée" component={TourScreen} />
      <Drawer.Screen name="Transmissions" component={TransmissionScreen} />
      <Drawer.Screen name="Mon compte" component={MyAccountScreen} />
      <Drawer.Screen name="ManagementScreen" component={ManagementScreen}/>            
      <Drawer.Screen name="Rejoindre un cabinet" component={JoinScreen} />
      <Drawer.Screen name="RessourcesScreen" component={RessourcesScreen}/>
    </Drawer.Navigator>
  );
}

const TabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName = '';

        if (route.name === 'Tournée') {
          iconName = 'briefcase';
        } else if (route.name === 'Transmissions') {
          iconName = 'newspaper-o';
        }

      return <FontAwesome name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: 'black',
      tabBarInactiveTintColor: '#CADDC5',
      headerShown: false,
      tabBarStyle: { backgroundColor: '#99BD8F'},
      tabBarLabelStyle: { fontSize: 12 },
    })}>
    <Tab.Screen name="Tournée" component={TourScreen} />

    <Tab.Screen name="Transmissions" component={TransmissionScreen} />
    </Tab.Navigator>
    );
}

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="ConnectionScreen" component={ConnectionScreen}/>
            <Stack.Screen name="TabNavigator" component={TabNavigator}/>
            <Stack.Screen name="SignUpScreen" component={SignUpScreen}/>
            <Stack.Screen name="SignInScreen" component={SignInScreen}/>            
            <Stack.Screen name="PatientScreen" component={PatientScreen}/>
            <Stack.Screen name="ConsultationScreen" component={ConsultationScreen}/>
            <Stack.Screen name="AddPatientScreen" component={AddPatientScreen}/>
            <Stack.Screen name="AddTransmissionScreen" component={AddTransmissionScreen}/>
            <Stack.Screen name="ModificationPatientRecordScreen" component={ModificationPatientRecordScreen}/>
            <Stack.Screen name='AddConsultationScreen' component={AddConsultationScreen}/>
            <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

