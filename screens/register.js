import React from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import { Input } from 'react-native-elements';
import { globalStyles } from '../styles/globalStyles';
import { Feather } from '@expo/vector-icons';


export default function RegisterScreen(){
    return (
        <View style={globalStyles.container}>
            <Text>Register screen</Text>
            <Input 
                leftIcon={<Feather name="user" size={24} color="black" />}
                label='Username' 
                placeholder='Enter username'/>
            <Input 
                leftIcon={<Feather name="mail" size={24} color="black" />}
                label='Email Address' 
                placeholder='Enter email address'/>
            <Input 
                leftIcon={<Feather name="lock" size={24} color="black" />}
                label='Password' 
                secureTextEntry='true' 
                placeholder='password'/>
            <Button title='REGISTER'></Button>
        </View>
    );
}