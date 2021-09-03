import React, { useState, useContext } from 'react';

import { Text, View, Keyboard, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { globalStyles } from '../styles/globalStyles';
import Feather from 'react-native-vector-icons/Feather';

// Context
import { AuthContext } from '../context/AuthContext';


export default function RegisterScreen({ navigation }) {
    const [userName, setUserName] = useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const { onRegister } = useContext(AuthContext);


    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={globalStyles.background}>
                <View style={globalStyles.container}>
                    <Text style={[{flex:0.5}, globalStyles.headerText]}>Register</Text>

                    <Input 
                        leftIcon={<Feather name="user" size={24} color="black" />}
                        label='Username' 
                        placeholder='Enter username'
                        onChangeText={ text => setUserName(text)}
                    />
                    <Input 
                        leftIcon={<Feather name="mail" size={24} color="black" />}
                        label='Email Address' 
                        placeholder='Enter email address'
                        onChangeText={ text => setEmail(text)}
                    />
                    <Input 
                        leftIcon={<Feather name="lock" size={24} color="black" />}
                        label='Password' 
                        secureTextEntry 
                        placeholder='Enter your password'
                        onChangeText={ text => setPassword(text)}
                    />
                    <Input 
                        leftIcon={<Feather name="lock" size={24} color="black" />}
                        label='Confirm Password' 
                        secureTextEntry 
                        placeholder='Confirm password'
                        onChangeText={ text => setConfirmPassword(text)}
                    />
                    <Button 
                        title='REGISTER'
                        containerStyle={globalStyles.button} 
                        buttonStyle={globalStyles.button}
                        raised
                        onPress={() => {
                            if (userName && email && password) onRegister(userName, email, password);
                        }}
                    />
                    <View style={{flex:1, justifyContent:'flex-end'}}>
                        <Text>Have an Account?
                            <Text style={{fontWeight:'bold'}} onPress={() => navigation.replace('Login')}> Sign in </Text>
                        </Text>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}



const styles = StyleSheet.create({});
