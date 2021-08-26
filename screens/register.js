import React from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import { Input } from 'react-native-elements';
import { globalStyles } from '../styles/globalStyles';


export default function RegisterScreen(){
    return (
        <View style={globalStyles.container}>
            <Text>Register screen</Text>
            <Input label='Username' placeholder='Enter username'/>
            <Input label='Email Address' placeholder='Enter email address'/>
            <Input label='Password' secureTextEntry='true' placeholder='password'/>
            <Button title='REGISTER'></Button>
        </View>
    );
}