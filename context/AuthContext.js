import React, { createContext, useState } from 'react';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';


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
                onRegister: async (profileImgPath, userName, email, password) => {
                    try {
                        let url = null;
                        const credential = await auth().createUserWithEmailAndPassword(email, password);

                        if (profileImgPath) {
                            // upload user profile Img
                            const ref = storage().ref(`users/${credential.user.uid}/profile.jpg`); // create storage ref
                            await ref.putFile(profileImgPath); // upload file to firebase storage

                            // Update user displayName & profileImg
                            url = await storage().ref(`users/${credential.user.uid}/profile.jpg`).getDownloadURL(); // get image url from storage
                        }

                        // updated user profile info
                        await credential.user.updateProfile({displayName:userName, photoURL:url});
                        
                        // update local user
                        setUser(auth().currentUser); 

                        // update firestore Users collection
                        const usersCollection = firestore().collection('Users');
                        const userDoc = usersCollection.doc(credential.user.uid); // doc id is the user id
                        await userDoc.set({
                            uid: credential.user.uid,
                            displayName: userName,
                            email: email,
                            photoURL: url,
                            room: [],
                            friends: [],
                        });

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
