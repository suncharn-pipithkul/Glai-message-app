import React, { useState } from 'react';
import { db, auth } from '../firebase/firebase';
// import firebase from 'firebase';
// import { GoogleAuthProvider } from 'firebase/auth';

import { Text, View, Keyboard, TouchableWithoutFeedback, StyleSheet, TextInput } from 'react-native';
import { Input, Button, SocialIcon } from 'react-native-elements';
import { Feather } from '@expo/vector-icons';
import { globalStyles } from '../styles/globalStyles';
import { LinearGradient } from 'expo-linear-gradient';

// const googleProvider = new firebase.auth.GoogleAuthProvider();


export default function LoginScreen( { navigation } ) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onLogin = async () => {
        try {
            await auth.signInWithEmailAndPassword(email, password);
            navigation.navigate('Main');
        } catch(err) {
            alert(err);
            console.log('@onRegister: ', err);
        }
    };

    const onGoogle = async () => {
        try {
            console.log('hi');
            // const credential = auth.getRedirectResult();
            // if (credential) {
            //     let token = credential;
            // }
            // // const credential = await auth.signInWithPopup(googleProvider);
            // // const user = credential.user;
            // console.log(user.displayName);
            // console.log(user.email);
        } catch(err) {
            alert(err);
            console.log('@onGoogle: ', err);
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={globalStyles.background}>
                <LinearGradient
                    colors={['white', 'white' ]}
                    style={{position:'absolute', left:0, right:0, top:0, height:'100%',}}
                />
                    <View style={globalStyles.container}>
                        <Text style={[{flex:0.5}, globalStyles.headerText]}>Sign In</Text>
                            
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
                            onPress={onLogin}
                        />

                        <Text style={{marginTop:20}}>- OR -</Text>
                        <Text style={{marginTop:20}}>Sign in with</Text>
                        <View style={{marginTop: 20, flex:1, flexDirection:'row'}}>
                            <SocialIcon type='facebook' raised onPress={() => console.log('fb')}/>
                            <SocialIcon type='google' raised onPress={onGoogle}/>
                        </View>

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
