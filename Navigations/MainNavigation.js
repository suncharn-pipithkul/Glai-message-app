import React, { useState, useEffect, useContext } from 'react';
import 
{ StyleSheet, 
  Text, 
  View,
  Button, 
  Image,
  TouchableHighlight,
  ActivityIndicator} from 'react-native';
import { Avatar } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';

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
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// screens
import OnBoardScreen from '../screens/onBoard';
import LoginScreen from '../screens/login';
import RegisterScreen from '../screens/register';
import MainScreen from '../screens/main';
import ChatScreen from '../screens/chat';
import ProfileScreen from '../screens/profile';
import FriendsScreen from '../screens/friends';


// const Stack = createNativeStackNavigator(); // Native Stack Navigator
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

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

  const MainTab = () => {
    return (
      <Tab.Navigator 
        screenOptions={ ({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Chats') {
              // iconName = focused ? 'chatbubble-sharp' : 'chatbubble-outline';
              // iconName = focused ? 'ios-chatbubble-sharp' : 'ios-chatbubble-outline';
              iconName = focused ? 'md-chatbubble-sharp' : 'md-chatbubble-outline';
              // iconName = 'md-chatbubble-sharp';


            } else if (route.name === 'Friends') {
              // iconName = focused ? 'ios-people-sharp' : 'ios-people-outline';
              // iconName = focused ? 'people-sharp' : 'people-outline';
              iconName = focused ? 'md-people-sharp' : 'md-people-outline';
              // iconName = 'md-people-sharp'
            }

            return <Ionicons name={iconName} size={size} color={color} />
          },
          // tabBarActiveTintColor: '#2089dc',
          // tabBarInactiveTintColor: 'gray',
          tabBarActiveTintColor: 'white',
          tabBarInactiveTintColor: 'white',
          tabBarLabelPosition: 'beside-icon',
          tabBarStyle: {
            borderTopWidth:0, 
            shadowOpacity: 0, // This is for ios
            backgroundColor: '#2089dc',
          },

          headerShown: false,
        })}
        
      >
        <Tab.Screen name='Chats' component={MainScreen} />
        <Tab.Screen name='Friends' component={FriendsScreen} />
      </Tab.Navigator>
    );
  };

  const AppStack = () => {
    return (
      <Stack.Navigator screenOptions={{headerShown:false}}>
          <Stack.Screen name='Main' component={MainTab} />
          <Stack.Screen 
            name='Chat' 
            component={ChatScreen}
            options={({ route }) => ({title:route.params.userName})}/>
          <Stack.Screen name='Profile' component={ProfileScreen}/>
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
  });

  // Config Google Sign in
  useEffect(() => {
    GoogleSignin.configure({
        webClientId: '745900964307-88lbc0f8ao1ur13rgg4ejr86675o8298.apps.googleusercontent.com',
    });
  }, []);

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
