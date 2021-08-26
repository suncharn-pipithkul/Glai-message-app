import React from 'react';
import { Text, View, Button, TextInput } from 'react-native';
import { Input } from 'react-native-elements';
import { globalStyles } from '../styles/globalStyles';

export default function WelcomeScreen() {
    return (
        <View style={globalStyles.container}>
            <Text>Welcome!</Text>
            <Text>Sign In</Text>
            <Input
                label='Email'
                mode='outlined'
                placeholder='Enter your Email'/>
            <Input
                secureTextEntry
                label='Password'
                placeholder='Enter your password'/>
            <Button title='LOGIN'></Button>
            <Text>Don't have an Account? <Text style={{fontWeight: 'bold'}}>Sign up</Text></Text>
        </View>
    );
}
