import React, { useState } from 'react';
import { Text, View, FlatList } from 'react-native';
import { SearchBar } from 'react-native-elements'
import { globalStyles } from '../styles/globalStyles';


export default function MainScreen() {
    const [searchText, setSearchText] = useState('');
    const [data, setData] = useState([]);

    return (
        <View style={globalStyles.container}>
            <Text>Main screen</Text>
            <FlatList
                data={data}

            />
        </View>
    );
}