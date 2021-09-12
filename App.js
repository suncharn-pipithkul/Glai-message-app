import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar, StyleSheet} from 'react-native';
// Context
import { AuthProvider } from './context/AuthContext';
import { FriendStackContextProvider } from './context/FriendStackContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Navigation
import MainNavigation from './Navigations/MainNavigation';


export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <FriendStackContextProvider>
        {/* <StatusBar barStyle = 'dark-content'/> */}
          <MainNavigation/>
        </FriendStackContextProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({});
