import React from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import { globalStyles } from '../styles/globalStyles';


export default function RegisterScreen(){
    return (
        <View style={globalStyles.container}>
            <Text>Register screen</Text>
            <Text>Username</Text>
            <TextInput placeholder='Enter username'/>
            <Text>Email</Text>
            <TextInput placeholder='Enter email address'/>
            <Text>password</Text>
            <TextInput secureTextEntry='true' placeholder='password'/>
            <Button title='REGISTER'></Button>
        </View>
    );
}