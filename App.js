// @refresh reset
// import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
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

const LoadingScreen = () => {
  return (
    <View>
      <ActivityIndicator size='large'/>
    </View>
  );
};

export default function App() {
  const [viewedOnboarding, setViewedOnboarding] = useState(false);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    checkOnboarding();
  }, []);

  if (loading) {
    return <LoadingScreen/>
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown:false}}>
          {!viewedOnboarding && <Stack.Screen name='Onboard' component={OnBoardScreen} />}
          <Stack.Screen name='Login' component={LoginScreen} />
          <Stack.Screen name='Register' component={RegisterScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
