import React, { useState, useEffect, useLayoutEffect,  useRef, useCallback, useContext } from 'react';
import { Text, View, Keyboard, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { Input, Button, CheckBox, SocialIcon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';
import { GoogleSigninButton } from '@react-native-google-signin/google-signin';

// Authentication & Storage
import AsyncStorage from '@react-native-async-storage/async-storage';

// styles
import { globalStyles } from '../styles/globalStyles';

// Context
import { AuthContext } from '../context/AuthContext';


export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState('');
    const { onLogin, onGoogleSignin } = useContext(AuthContext);
    const emailInput = useRef();
    const passwordInput = useRef();

    const onSubmit = useCallback(async () => {
            if (email && password) {
                const loginStatus = await onLogin(email, password)

                if (loginStatus && rememberMe) {
                    try {
                        console.log('storing');
                        await AsyncStorage.setItem('@rememberMe', JSON.stringify(rememberMe));
                        await AsyncStorage.setItem('@email', JSON.stringify(email));
                        await AsyncStorage.setItem('@password', JSON.stringify(password));
                    } catch(err) {
                        alert(err);
                        console.log('Error @onSubmit: ', err);
                    }
                }
            }

            if (!rememberMe) {
                clearStoredUser();
            }
        },
        [rememberMe, email, password] // onSubmit rerender only if email/password or rememberMe input changed
    );
    
    const getCheck = async () => {
        try {
            const value = await AsyncStorage.getItem('@rememberMe');
            return value === null ? null : value === 'true';
        } catch(err) {
            alert(err);
            console.log('Error @getCheck: ', err);
            return false;
        }
    };

    const getStoredData = async (storageKey) => {
        try {
            const value = await AsyncStorage.getItem(storageKey);
            return value === null ? null : value;
        } catch(err) {
            alert(err);
            console.log('Error @getStoredData: ', err);
            return '';
        }
    };

    const clearStoredUser = async () => {
        try {
            await AsyncStorage.removeItem('@rememberMe');
            await AsyncStorage.removeItem('@email');
            await AsyncStorage.removeItem('@password');
        } catch(err) {
            alert(err);
            console.log('Error @clearStoredUser: ', err);
        }
    }

    useEffect(() => {
        const asyncWrap = async () => {
            const check = await getCheck();
            if (check !== null) {
                setRememberMe(check);
            }

            if (check) {
                const storedEmail = await getStoredData('@email');
                const storedPassword = await getStoredData('@password');
                setEmail(JSON.parse(storedEmail));
                setPassword(JSON.parse(storedPassword));
            }
        };
        asyncWrap();
        console.log(`check: ${rememberMe}`);
    }, []);

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
                        defaultValue={email}
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
                        defaultValue={password}
                        onSubmitEditing={() => onSubmit()}
                        onChangeText={ text => setPassword(text)}
                    />

                    <CheckBox
                        title='Remember me'
                        containerStyle={{width:'100%', backgroundColor:'white', borderWidth:0, margin:0, paddingTop:0, paddingBottom:0}}
                        Component={View}
                        checked={rememberMe}
                        onIconPress={() => {
                            setRememberMe(prev => !prev);
                            clearStoredUser();
                        }}
                    />

                    <Button 
                        containerStyle={[globalStyles.button, {marginTop:16}]} 
                        buttonStyle={globalStyles.button}
                        title='LOGIN'
                        raised
                        onPress={() => onSubmit()}
                    />

                    {/* <Text style={{marginTop:20}}>- OR -</Text> */}
                    {/* <Text style={{marginTop:20}}>Sign in with</Text> */}
                    {/* <View style={{marginTop: 20, flex:1, flexDirection:'row'}}>
                        <SocialIcon type='facebook' raised onPress={() => console.log('fb')}/>
                        <SocialIcon type='google' raised onPress={() => onGoogleSignin()}/>
                    </View> */}
                    <GoogleSigninButton
                        style={{marginTop: 16}}
                        size={GoogleSigninButton.Size.Wide}
                        color={GoogleSigninButton.Color.Dark}
                        onPress={() => onGoogleSignin()}
                    />

                    <View style={{flex:1, justifyContent:'flex-end'}}>
                        <View style={{flexDirection:'row'}}>
                            <Text>Don't have an Account?</Text>
                            <TouchableOpacity>
                                <Text style={{fontWeight:'bold'}} onPress={() => navigation.replace('Register')}> Sign up </Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}



const styles = StyleSheet.create({});
