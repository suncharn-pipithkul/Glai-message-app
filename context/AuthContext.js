import React, { createContext, useState } from 'react';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    return (
        <AuthContext.Provider
            value={{
                user, 
                setUser,
                onLogin: async (email, password) => {
                    try {
                        await auth().signInWithEmailAndPassword(email, password);
                        return true; // login succesfully
                    } catch(err){
                        alert(err);
                        console.log('@onLogin', err);
                        return false; // login failed
                    }
                },
                onGoogleSignin: async () => {
                    try {
                        // Get the users ID token
                        const { idToken } = await GoogleSignin.signIn();

                        // Create a Google credential with the token
                        const googleCredential = auth.GoogleAuthProvider.credential(idToken);

                        // Sign-in the user with the credential
                        await auth().signInWithCredential(googleCredential);
                    } catch(err){
                        alert(err);
                        console.log('@onLogin', err);
                    }
                },
                onRegister: async (userName, email, password) => {
                    try {
                        const credential = await auth().createUserWithEmailAndPassword(email, password);
                        await credential.user.updateProfile({displayName:userName});
                    } catch(err) {
                        alert(err);
                        console.log('@onRegister', err);
                    }
                },
                onSignout: async () => {
                    try {
                        // check what provider the user sign in with Google/Facebook then signout accordingly
                        for (let providerData of user.providerData) {
                            if (providerData.providerId === 'google.com') {
                                await GoogleSignin.signOut();
                            }
                        }

                        // Otherwise, signout with normal auth
                        await auth().signOut();
                    } catch(err) {
                        alert(err);
                        console.log('@onSignout', err);
                    }
                },
            }}>
            {children}
        </AuthContext.Provider>
    );
}
