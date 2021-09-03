import React from 'react';
import { StyleSheet} from 'react-native';
// Context
import { AuthProvider } from './context/AuthContext';

// Navigation
import MainNavigation from './Navigations/MainNavigation';


export default function App() {
  return (
    <AuthProvider>
      <MainNavigation/>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({});
