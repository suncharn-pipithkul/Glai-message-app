import React from 'react';
import { StatusBar, StyleSheet} from 'react-native';
// Context
import { AuthProvider } from './context/AuthContext';

// Navigation
import MainNavigation from './Navigations/MainNavigation';


export default function App() {
  return (
    <AuthProvider>
      {/* <StatusBar barStyle = 'dark-content'/> */}
      <MainNavigation/>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({});
