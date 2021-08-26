import React from 'react';
import { Text, View, Button, TextInput } from 'react-native';
import { Input } from 'react-native-elements';
import { Feather } from '@expo/vector-icons';
import { globalStyles } from '../styles/globalStyles';


export default function WelcomeScreen() {
    return (
        <View style={globalStyles.container}>
            <Text>Welcome!</Text>
            <Text>Sign In</Text>
            
            <Input
                leftIcon={<Feather name="mail" size={24} color="black" />}
                label='Email'
                mode='outlined'
                placeholder='Enter your Email'/>
            <Input
                leftIcon={<Feather name="lock" size={24} color="black" />}
                secureTextEntry
                label='Password'
                placeholder='Enter your password'/>
                
            <Button title='LOGIN'></Button>
            <Text>Don't have an Account? <Text style={{fontWeight: 'bold'}}>Sign up</Text></Text>
        </View>
    );
}
