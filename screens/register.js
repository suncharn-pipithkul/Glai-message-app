import React, { useState } from 'react';
import { db, auth } from '../firebase/firebase';

import { Text, View, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { globalStyles } from '../styles/globalStyles';
import { Feather } from '@expo/vector-icons';


export default function RegisterScreen( { navigation } ){
    const [userName, setUserName] = useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const onRegister = async () => {
        try {
            // create user in firebase auth
            const authentication = await auth.createUserWithEmailAndPassword(email, password);  

            // store user profile in firestore
            const { user } = authentication;
            const { uid } = user;
            console.log(`authentication = ${authentication}`);
            console.log(`uid = ${uid}`);
            // const userAdditionalData = {
            //     userName: userName,
            //     user_id: uid,
            // };
            // await db.collection('users').doc(uid).set(userAdditionalData);

            // Add username to user profile
            const newUser = await auth.currentUser.updateProfile({displayName:userName});
            console.log(newUser);

            navigation.navigate('Main');
        } catch(err) {
            alert(err);
            console.log('@onRegister: ', err);
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={globalStyles.background}>
                <View style={globalStyles.container}>
                    <Text style={[{flex:0.5}, globalStyles.headerText]}>Register screen</Text>
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
                            onRegister();
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