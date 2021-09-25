import React from 'react';

// Navigation import(s)
import { createStackNavigator } from '@react-navigation/stack';

// Screens import(s)
import OnBoardScreen from '../screens/onBoard';
import LoginScreen from '../screens/login';
import RegisterScreen from '../screens/register';


const Stack = createStackNavigator();

export function AuthStack({ viewedOnboarding }) {
    
    return (
        <Stack.Navigator screenOptions={{headerShown:false}}>
            {!viewedOnboarding && <Stack.Screen name='Onboard' component={OnBoardScreen} />}
            <Stack.Screen name='Login' component={LoginScreen} />
            <Stack.Screen name='Register' component={RegisterScreen} />
        </Stack.Navigator>
    );
}

export default React.memo(AuthStack);
