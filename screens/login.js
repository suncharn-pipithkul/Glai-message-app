import React, { useState, useRef, useContext } from 'react';
import { Text, View, Keyboard, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { Input, Button, SocialIcon } from 'react-native-elements';
import Feather from 'react-native-vector-icons/Feather';
import { GoogleSigninButton } from '@react-native-google-signin/google-signin';

// styles
import { globalStyles } from '../styles/globalStyles';

// Context
import { AuthContext } from '../context/AuthContext';


export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { onLogin, onGoogleSignin } = useContext(AuthContext);
    const emailInput = useRef();
    const passwordInput = useRef();

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={globalStyles.background}>
                <View style={globalStyles.container}>
                    <Text style={[{flex:0.5}, globalStyles.headerText]}>Sign In</Text>

                    <Input
                        ref={emailInput}
                        leftIcon={<Feather name="mail" size={24} color="black" />}
                        label='Email'
                        placeholder='Enter your Email'
                        returnKeyType='next'
                        onSubmitEditing={() => passwordInput.current.focus()}
                        blurOnSubmit={false}  // keep the keyboard up on submit
                        onChangeText={ text => setEmail(text)}
                    />

                    <Input
                        ref={passwordInput}
                        leftIcon={<Feather name="lock" size={24} color="black" />}
                        secureTextEntry
                        label='Password'
                        placeholder='Enter your password'
                        onSubmitEditing={() => {if (email && password) onLogin(email, password)}}
                        onChangeText={ text => setPassword(text)}
                    />

                    <Button 
                        containerStyle={globalStyles.button} 
                        buttonStyle={globalStyles.button}
                        title='LOGIN'
                        raised
                        onPress={() => {
                            if (email && password) onLogin(email, password);
                        }}
                    />

                    <Text style={{marginTop:20}}>- OR -</Text>
                    {/* <Text style={{marginTop:20}}>Sign in with</Text> */}
                    {/* <View style={{marginTop: 20, flex:1, flexDirection:'row'}}>
                        <SocialIcon type='facebook' raised onPress={() => console.log('fb')}/>
                        <SocialIcon type='google' raised onPress={() => onGoogleSignin()}/>
                    </View> */}
                    <GoogleSigninButton
                        style={{borderRadius: 30}}
                        size={GoogleSigninButton.Size.Wide}
                        color={GoogleSigninButton.Color.Dark}
                        onPress={() => onGoogleSignin()}
                    />

                    <View style={{flex:1, justifyContent:'flex-end'}}>
                        <Text>Don't have an Account?
                            <Text style={{fontWeight:'bold'}} onPress={() => navigation.replace('Register')}> Sign up </Text>
                        </Text>
                    </View>

                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}



const styles = StyleSheet.create({});
