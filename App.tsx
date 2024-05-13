/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';


import 'react-native-gesture-handler';      
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStackNavigator } from '@react-navigation/stack'
import LoginScreen from './Screens/LoginScreen';
import ResetPassScreen from './Screens/ResetPassScreen';
import RegisterScreen from './Screens/RegisterScreen';
import HomeScreen from './Screens/HomeScreen';
import WelcomeScreen from './Screens/WelcomeScreen';
import AddTripScreen from './Screens/AddTripScreen';
import { UserProvider } from './Contexts/UserContext'; 

const Stack = createStackNavigator();
function App(): React.JSX.Element {
  return (
    <UserProvider>
      <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen name='WelcomeScreen' component={WelcomeScreen} />          
              <Stack.Screen name='LoginScreen' component={LoginScreen} />   
              <Stack.Screen name='HomeScreen' component={HomeScreen} />
              <Stack.Screen name='ResetPassScreen' component={ResetPassScreen} />
              <Stack.Screen name='RegisterScreen' component={RegisterScreen} />
              <Stack.Screen name='AddTripScreen' component={AddTripScreen} />
          </Stack.Navigator>
        </NavigationContainer>
    </UserProvider>
  );
}

const styles = StyleSheet.create({

});

export default App;
