import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase/firebase';

import { Text, View, FlatList } from 'react-native';
import { SearchBar } from 'react-native-elements'
import { globalStyles } from '../styles/globalStyles';


export default function MainScreen() {
    const [searchText, setSearchText] = useState('');
    const [data, setData] = useState([]);

    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        const user = auth.currentUser;
        if (user){
            setUserName(user.displayName);
            setEmail(user.email);
        }
    }, []);

    return (
        <View style={globalStyles.container}>
            <Text>Main screen</Text>
            <Text>{userName}</Text>
            <Text>{email}</Text>
        </View>
    );
}