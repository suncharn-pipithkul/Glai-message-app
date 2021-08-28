// @refresh reset
// import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, View } from 'react-native';
import { globalStyles } from './styles/globalStyles';
import WelcomeScreen from './screens/welcome';
import RegisterScreen from './screens/register';
import MainScreen from './screens/main';


export default function App() {
  return (
    // <WelcomeScreen />
    <RegisterScreen />
    // <MainScreen/>
  );
}
