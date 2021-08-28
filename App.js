// @refresh reset
// import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import { globalStyles } from './styles/globalStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import OnBoardScreen from './screens/onBoard';
import LoginScreen from './screens/login';
import RegisterScreen from './screens/register';
import MainScreen from './screens/main';


const Stack = createNativeStackNavigator();

export default function App() {
  const [isFirstLaunch, setIsFirstLaunch] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem('@isFirstLaunch')
      .then(val => {
        if (val) {
          AsyncStorage.setItem('@isFirstLaunch', 'true');
        } else {
          AsyncStorage.setItem('@isFirstLaunch', 'false');
          setIsFirstLaunch(false);
        }
      });
  }, []);

  if (isFirstLaunch) {
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown:false}}>
          {isFirstLaunch && <Stack.Screen name='Onboard' component={OnBoardScreen} />}
          <Stack.Screen name='Login' component={LoginScreen} />
          <Stack.Screen name='Register' component={RegisterScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
  else {
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown:false}}>
          <Stack.Screen name='Login' component={LoginScreen} />
          <Stack.Screen name='Register' component={RegisterScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
  
}
