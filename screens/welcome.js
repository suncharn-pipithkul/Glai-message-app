import React, { useState } from 'react';
import { Text, View, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { Feather } from '@expo/vector-icons';
import { globalStyles } from '../styles/globalStyles';


export default function WelcomeScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={globalStyles.container}>
                <Text style={globalStyles.headerText}>Sign In</Text>
                
                <Input
                    leftIcon={<Feather name="mail" size={24} color="black" />}
                    label='Email'
                    placeholder='Enter your Email'
                    onChangeText={ text => setEmail(text)}
                    />
                <Input
                    leftIcon={<Feather name="lock" size={24} color="black" />}
                    secureTextEntry
                    label='Password'
                    placeholder='Enter your password'
                    onChangeText={ text => setPassword(text)}
                    />

                <Button 
                    containerStyle={globalStyles.button} 
                    buttonStyle={globalStyles.button}
                    title='LOGIN'
                    raised
                    onPress={() => console.log(`email=${email} | pass=${password}`)}
                    />
                    
                <View style={{flex:1, justifyContent:'flex-end'}}>
                    <Text>Don't have an Account?
                        <Text style={{fontWeight:'bold'}} onPress={() => console.log('sign up')}> Sign up </Text>
                    </Text>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}
