import React from 'react';
import { Text, View, TextInput, Button } from 'react-native';
import { globalStyles } from '../styles/globalStyles';

export default function WelcomeScreen() {
    return (
        <View style={globalStyles.container}>
            <Text>Welcome!</Text>
            <Text>Sign In</Text>
            <TextInput placeholder='Enter your Email'/>
            <TextInput placeholder='Enter your password'/>
            <Button title='LOGIN'></Button>
        </View>
    );
}
