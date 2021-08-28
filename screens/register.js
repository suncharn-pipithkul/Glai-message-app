import React from 'react';
import { Text, View, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { globalStyles } from '../styles/globalStyles';
import { Feather } from '@expo/vector-icons';


export default function RegisterScreen( { navigation } ){
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={globalStyles.background}>
                <View style={globalStyles.container}>
                    <Text style={[{flex:0.5}, globalStyles.headerText]}>Register screen</Text>
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
                        secureTextEntry 
                        placeholder='Enter your password'/>
                    <Input 
                        leftIcon={<Feather name="lock" size={24} color="black" />}
                        label='Confirm Password' 
                        secureTextEntry 
                        placeholder='Confirm password'/>
                    <Button 
                        title='REGISTER'
                        containerStyle={globalStyles.button} 
                        buttonStyle={globalStyles.button}
                        raised
                        onPress={() => console.log('register')}
                        />
                    <View style={{flex:1, justifyContent:'flex-end'}}>
                        <Text>Have an Account?
                            <Text style={{fontWeight:'bold'}} onPress={() => navigation.navigate('Login')}> Sign in </Text>
                        </Text>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}