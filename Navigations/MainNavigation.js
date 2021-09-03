import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
// Context
import { AuthContext } from '../context/AuthContext';

// styles
import { globalStyles } from '../styles/globalStyles';

// Authentication & Storage
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

// Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// screens
import OnBoardScreen from '../screens/onBoard';
import LoginScreen from '../screens/login';
import RegisterScreen from '../screens/register';
import MainScreen from '../screens/main';


const Stack = createNativeStackNavigator(); // Stack Navigator

const LoadingScreen = () => {
  return (
    <View style={globalStyles.container}>
      <ActivityIndicator size='large'/>
    </View>
  );
};

export default function MainNavigation() {
  const [viewedOnboarding, setViewedOnboarding] = useState(false);
  const [loading, setLoading] = useState(true);
  const {user, setUser} = useContext(AuthContext);

  // function to check if user has seen the onboarding screen or not
  const checkOnboarding = async () => {
    try {
      const value = await AsyncStorage.getItem('@viewedOnboarding');

      // some data in local storage = viewed onboarding screen before
      if (value !== null) {  
        setViewedOnboarding(true);
      }
    } catch(err) {
      console.log('Error @checkOnboarding: ', err);
    } finally {
      setLoading(false);
    }
  };

  // function to handle user state change
  const onAuthStateChanged = (user) => {
    setUser(user);
  }

  // Stack Screen
  const AuthStack = () => {
    return (
      <Stack.Navigator screenOptions={{headerShown:false}}>
          {!viewedOnboarding && <Stack.Screen name='Onboard' component={OnBoardScreen} />}
          <Stack.Screen name='Login' component={LoginScreen} />
          <Stack.Screen name='Register' component={RegisterScreen} />
      </Stack.Navigator>
    );
  };

  const AppStack = () => {
    return (
      <Stack.Navigator screenOptions={{headerShown:false}}>
          <Stack.Screen name='Main' component={MainScreen} />
      </Stack.Navigator>
    );
  };

  // Attach Auth state change listener
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  // Check if user viewed onboarding before or not
  useEffect(() => {
    checkOnboarding();
  }, []);

  // Config Google Sign in
  useEffect(() => {
    GoogleSignin.configure({
        webClientId: '745900964307-88lbc0f8ao1ur13rgg4ejr86675o8298.apps.googleusercontent.com',
    });
  }, [])

  if (loading) {
    return <LoadingScreen/>
  } else {
    return (
        <NavigationContainer>
            {user ? <AppStack/> : <AuthStack/>}
        </NavigationContainer>
    );
  }
}


const styles = StyleSheet.create({});
