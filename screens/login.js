import React, { useState } from 'react';
import { Text, View, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { Input, Button, SocialIcon } from 'react-native-elements';
import { Feather } from '@expo/vector-icons';
import { globalStyles } from '../styles/globalStyles';
import { LinearGradient } from 'expo-linear-gradient';


export default function LoginScreen( { navigation } ) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={globalStyles.background}>
                <LinearGradient
                    colors={['white', 'white' ]}
                    style={{position:'absolute', left:0, right:0, top:0, height:'100%',}}
                />
                    <View style={globalStyles.container}>
                        <Text style={[{flex:0.5}, globalStyles.headerText]}>Sign In</Text>
                            
                        {/* <View style={{flex:1, backgroundColor:'coral'}}> */}
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
                        {/* </View> */}
                        <Text style={{marginTop:20}}>- OR -</Text>
                        <Text style={{marginTop:20}}>Sign in with</Text>
                        <View style={{marginTop: 20, flex:1, flexDirection:'row'}}>
                            <SocialIcon type='facebook' raised onPress={() => console.log('fb')}/>
                            <SocialIcon type='google' raised onPress={() => console.log('google')}/>
                        </View>


                        <View style={{flex:1, justifyContent:'flex-end'}}>
                            <Text>Don't have an Account?
                                <Text style={{fontWeight:'bold'}} onPress={() => navigation.navigate('Register')}> Sign up </Text>
                            </Text>
                        </View>
                    </View>
            </View>
        </TouchableWithoutFeedback> 
    );
}
