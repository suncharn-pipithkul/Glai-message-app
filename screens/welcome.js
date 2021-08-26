import React, { useState, useEffect } from 'react';
import { Text, View, Button, TextInput } from 'react-native';
import { Input } from 'react-native-elements';
import { Feather } from '@expo/vector-icons';
import { globalStyles } from '../styles/globalStyles';


export default function WelcomeScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        console.log('email: ' + email);
        console.log('password: ' + password);
    }, [email, password])

    return (
        <View style={globalStyles.container}>
            <Text>Welcome!</Text>
            <Text>Sign In</Text>
            
            <Input
                leftIcon={<Feather name="mail" size={24} color="black" />}
                label='Email'
                placeholder='Enter your Email'
                value={email}
                onChangeText={ val => {
                    setEmail(val);
                    console.log(email);
                }}
                />
            <Input
                leftIcon={<Feather name="lock" size={24} color="black" />}
                secureTextEntry
                label='Password'
                placeholder='Enter your password'
                value={password}
                onChangeText={ val => {
                    setPassword(val);
                    console.log(password);
                }}
                />

            <Button title='LOGIN'></Button>
            <Text>Don't have an Account? <Text style={{fontWeight: 'bold'}}>Sign up</Text></Text>
        </View>
    );
}
