// @refresh reset
// import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, View } from 'react-native';
import { globalStyles } from './styles/globalStyles';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import LoginScreen from './screens/login';
import RegisterScreen from './screens/register';
import MainScreen from './screens/main';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Login' component={LoginScreen} />
        <Stack.Screen name='Register' component={RegisterScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
