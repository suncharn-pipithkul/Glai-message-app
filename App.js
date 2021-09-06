import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar, StyleSheet} from 'react-native';
// Context
import { AuthProvider } from './context/AuthContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Navigation
import MainNavigation from './Navigations/MainNavigation';


export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        {/* <StatusBar barStyle = 'dark-content'/> */}
        <MainNavigation/>
      </AuthProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({});
