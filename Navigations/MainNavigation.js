import React, { useState, useEffect, useRef, useContext, createContext, createRef } from 'react';
import 
{ StyleSheet, 
  Text, 
  View,
  Button, 
  Image,
  TouchableWithoutFeedback,
  TouchableHighlight,
  ActivityIndicator} from 'react-native';
import { Avatar } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Context
import { AuthContext } from '../context/AuthContext';
import { FriendStackContext } from '../context/FriendStackContext';

// styles
import { globalStyles } from '../styles/globalStyles';

// Authentication & Storage
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

// Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

// screens
import OnBoardScreen from '../screens/onBoard';
import LoginScreen from '../screens/login';
import RegisterScreen from '../screens/register';
import MainScreen from '../screens/main';
import ChatScreen from '../screens/chat';
import ProfileScreen from '../screens/profile';
import FriendsScreen from '../screens/friends';
import AddFriendsScreen from '../screens/addFriend';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { HeaderBackButton } from '@react-navigation/elements';


// const Stack = createNativeStackNavigator(); // Native Stack Navigator
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
// const Tab = createMaterialTopTabNavigator();

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
  const [bottomTabColor, setBottomTabColor] = useState('#2089dc');

  const {user, setUser} = useContext(AuthContext);
  const {isAddFriend} = useContext(FriendStackContext);

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

  const FriendsStack = createStackNavigator();

  const FriendStackScreen = () => {
    return (
      <FriendsStack.Navigator screenOptions={{headerShown:false}}>
          <FriendsStack.Screen name='Friends' component={FriendsScreen} />
          <FriendsStack.Screen name='Add Friend' component={AddFriendsScreen} 
            options={{
              cardStyleInterpolator: CardStyleInterpolators.forNoAnimation,
          }}/>
      </FriendsStack.Navigator>
    );
  };

  const MainTab = () => {
    return (
      <Tab.Navigator
        screenOptions={ ({ navigation, route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Chats') {
              iconName = focused ? 'md-chatbubble-sharp' : 'md-chatbubble-outline';
            } else if (route.name === 'FriendsStack') {
              iconName = focused ? 'md-people-sharp' : 'md-people-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />
          },
          tabBarActiveTintColor: 'white',
          tabBarInactiveTintColor: 'white',
          tabBarLabelPosition: 'beside-icon',
          tabBarStyle: {
            borderTopWidth:0, 
            shadowOpacity: 0, // This is for ios
            backgroundColor: bottomTabColor,
          },
          tabBarPosition: true,
          headerShown: false,
        })}
        
      >
        <Tab.Screen 
          name='Chats' 
          component={MainScreen} 
          listeners={ ({ navigation }) => ({
            tabPress: e => {
                // if (isAddFriend)
                //   navigation.popToTop();
                
                console.log('it happened!!');
            },
          })}/>
        <Tab.Screen name='FriendsStack' options={{tabBarLabel:'Friends'}} component={FriendStackScreen} />
      </Tab.Navigator>
    );
  };

  const UserAvatar = ( photoURL ) => {
    return (
        <TouchableHighlight style={{height:40, width:40, borderRadius:40,}} onPress={() => navigation.navigate('Profile')}>
            <Image 
                style={{height:40, width:40, borderRadius:30}} 
                source={photoURL ? {uri:photoURL} : require('../assets/profileImg/blank-profile-picture.png')}/>
        </TouchableHighlight>
    );
}

  const AppStack = () => {
    return (
      <Stack.Navigator screenOptions={{headerShown:false}}>
          <Stack.Screen name='Main' component={MainTab} />
          <Stack.Screen 
            name='Chat' 
            component={ChatScreen}
            // options={({ route }) => ({title:route.params.userName})}/>
            options={({ route }) => ({
              title: route.params.roomName ? route.params.roomName : 'Chat',
              headerShown:true,
              headerStyle: {
                backgroundColor: '#2089dc',
              },
              headerTintColor: 'white',
              headerTitleStyle: {
                fontWeight: 'bold',
                color: 'white',
                fontSize:24,
              },
              headerLeft: (props) => (
                <View style={{flexDirection:'row', alignItems:'center'}}>
                  {props.canGoBack && <HeaderBackButton {...props} />}
                  <TouchableWithoutFeedback>
                    {UserAvatar(route.params.roomPhotoUrl)}
                    {/* <Ionicons name='ios-thumbs-up-sharp' size={24} color='white'/> */}
                  </TouchableWithoutFeedback>
                </View>
              ),
              headerBackVisible:true,
              cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
            })}/>
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
